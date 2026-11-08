import { expect, test } from '@playwright/test';

const MOCK_USER_ID = '507f1f77bcf86cd799439011';

const MOCK_SESSION = {
    data: {
        session: {
            _id: MOCK_USER_ID,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
        },
    },
};

const MOCK_USER_PROFILE = {
    data: {
        userProfile: {
            user: {
                _id: MOCK_USER_ID,
                description: '',
                email: 'test@example.com',
                firstName: 'Test',
                image: '',
                lastName: 'User',
            },
            location: null,
            interest: null,
            category: null,
            tag: null,
        },
    },
};

const MOCK_PRIVACY_SETTING = {
    data: {
        myPrivacySetting: {
            _id: '661f1f77bcf86cd799439022',
            whoCanSeeEvents: 'EVERYONE',
            whoCanInviteToEvents: 'COMPANIONS',
            markedForWhoCanSeeEvents: [],
            markedForWhoCanInviteToEvents: [],
        },
    },
};

const MOCK_COMPANIONS = {
    data: {
        companionsByOwnerId: {
            companions: [
                {
                    _id: '507f1f77bcf86cd799439012',
                    firstName: 'Alice',
                    lastName: 'Smith',
                    image: '',
                },
                { _id: '507f1f77bcf86cd799439013', firstName: 'Bob', lastName: 'Jones', image: '' },
                {
                    _id: '507f1f77bcf86cd799439014',
                    firstName: 'Charlie',
                    lastName: 'Brown',
                    image: '',
                },
            ],
            totalCompanions: 3,
        },
    },
};

const MOCK_EMPTY_LIST = { data: { getCompanionRequests: [], getInvitation: [] } };

/** Ответы на запросы по имени операции: порядок проверок важен. */
const RESPONSES: [string, unknown][] = [
    ['UpdatePrivacySetting', { data: { updatePrivacySetting: {} } }],
    ['MyPrivacySetting', MOCK_PRIVACY_SETTING],
    ['CompanionsByOwnerId', MOCK_COMPANIONS],
    ['GetSession', MOCK_SESSION],
    ['UserProfile', MOCK_USER_PROFILE],
    ['GetCompanionRequests', MOCK_EMPTY_LIST],
    ['GetInvitation', MOCK_EMPTY_LIST],
];

// Radio-инпуты вынесены за экран (left: -9999px) и кликаются только через label.
const label = (page: import('@playwright/test').Page, name: string, value: string) =>
    page.locator(`label[for="${name}-${value}"]`);

test.describe('Confidentiality settings', () => {
    let mutations: string[];

    test.beforeEach(async ({ page }) => {
        mutations = [];

        await page.route('**/graphql', async (route) => {
            const body = JSON.parse(route.request().postData() || '{}');
            const query: string = body.query ?? '';

            if (query.startsWith('mutation')) {
                mutations.push(body.operationName ?? '');
            }

            const match = RESPONSES.find(([name]) => query.includes(name));

            return route.fulfill({ json: match ? match[1] : { data: {} } });
        });

        await page.goto(`/profile/${MOCK_USER_ID}/private`);
        // networkidle здесь не наступает никогда: страница держит открытым
        // WebSocket подписки на уведомления.
        await page.locator('[data-profile="profile-confidentiality"]').waitFor();
    });

    test('renders confidentiality tab with correct options', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');

        await expect(
            page.getByText('Who can see the list of events I am going to attend?')
        ).toBeVisible();
        await expect(page.getByText('Who can invite me to events?')).toBeVisible();

        await expect(page.locator('#whoCanSeeEvents-EVERYONE')).toBeChecked();
        await expect(page.locator('#whoCanInviteToEvents-COMPANIONS')).toBeChecked();

        for (const name of ['whoCanSeeEvents', 'whoCanInviteToEvents']) {
            for (const value of ['EVERYONE', 'COMPANIONS', 'MARKED_COMPANIONS']) {
                await expect(label(page, name, value)).toBeVisible();
            }
        }
    });

    test('shows companion dropdown only when Marked companions is selected', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');

        await expect(page.getByText('No list selected')).not.toBeVisible();

        await label(page, 'whoCanSeeEvents', 'MARKED_COMPANIONS').click();
        await expect(page.getByText('No list selected')).toBeVisible();

        await label(page, 'whoCanSeeEvents', 'EVERYONE').click();
        await expect(page.getByText('No list selected')).not.toBeVisible();
    });

    test('shows Save changes button when settings are changed', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');

        await expect(page.getByText('Save changes')).not.toBeVisible();

        await label(page, 'whoCanSeeEvents', 'MARKED_COMPANIONS').click();
        await expect(page.getByText('Save changes')).toBeVisible();

        await label(page, 'whoCanSeeEvents', 'EVERYONE').click();
        await expect(page.getByText('Save changes')).not.toBeVisible();
    });

    test('submits mutation on Save changes click', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');
        await expect(page.locator('#whoCanSeeEvents-EVERYONE')).toBeChecked();

        await label(page, 'whoCanSeeEvents', 'MARKED_COMPANIONS').click();
        await page.getByText('Save changes').click();

        await expect.poll(() => mutations).toContain('UpdatePrivacySetting');
    });
});
