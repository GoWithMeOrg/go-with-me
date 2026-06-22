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

const MOCK_PRIVACY_SETTING = {
    data: {
        myPrivacySetting: {
            _id: '661f1f77bcf86cd799439022',
            whoCanSeeEvents: 'EVERYONE',
            whoCanInviteToEvents: 'COMPANIONS',
        },
    },
};

const MOCK_COMPANIONS = {
    data: {
        companionsByOwnerId: {
            companions: [
                { _id: '507f1f77bcf86cd799439012', firstName: 'Alice', lastName: 'Smith', image: '' },
                { _id: '507f1f77bcf86cd799439013', firstName: 'Bob', lastName: 'Jones', image: '' },
                { _id: '507f1f77bcf86cd799439014', firstName: 'Charlie', lastName: 'Brown', image: '' },
            ],
            totalCompanions: 3,
        },
    },
};

test.describe('Confidentiality settings', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/graphql', async (route) => {
            const body = JSON.parse(route.request().postData() || '{}');
            const query = body.query || '';

            if (query.includes('GetSession')) {
                return route.fulfill({ json: MOCK_SESSION });
            }
            if (query.includes('MyPrivacySetting')) {
                return route.fulfill({ json: MOCK_PRIVACY_SETTING });
            }
            if (query.includes('CompanionsByOwnerId')) {
                return route.fulfill({ json: MOCK_COMPANIONS });
            }
            if (query.includes('UpdatePrivacySetting')) {
                return route.fulfill({ json: { data: { updatePrivacySetting: {} } } });
            }

            return route.fulfill({ json: { data: {} } });
        });

        await page.goto(`/profile/${MOCK_USER_ID}/private`);
        await page.waitForLoadState('networkidle');
    });

    test('renders confidentiality tab with correct options', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');
        await page.waitForTimeout(500);

        await expect(page.getByText('Who can see the list of events I am going to attend?')).toBeVisible();
        await expect(page.getByText('Who can invite me to events?')).toBeVisible();

        const seeRadio = page.locator('#whoCanSeeEvents-EVERYONE');
        await expect(seeRadio).toBeChecked();

        const inviteRadio = page.locator('#whoCanInviteToEvents-COMPANIONS');
        await expect(inviteRadio).toBeChecked();

        await expect(page.getByText('All users')).toBeVisible();
        await expect(page.getByText('My companions')).toBeVisible();
        await expect(page.getByText('Marked companions')).toBeVisible();
    });

    test('shows companion dropdown only when Marked companions is selected', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');
        await page.waitForTimeout(500);

        await expect(page.getByText('No list selected')).not.toBeVisible();

        await page.locator('#whoCanSeeEvents-MARKED_COMPANIONS').click();
        await page.waitForTimeout(300);

        await expect(page.getByText('No list selected')).toBeVisible();

        await page.locator('#whoCanSeeEvents-EVERYONE').click();
        await page.waitForTimeout(300);

        await expect(page.getByText('No list selected')).not.toBeVisible();
    });

    test('shows Save changes button when settings are changed', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');
        await page.waitForTimeout(500);

        await expect(page.getByText('Save changes')).not.toBeVisible();

        await page.locator('#whoCanSeeEvents-MARKED_COMPANIONS').click();
        await page.waitForTimeout(300);

        await expect(page.getByText('Save changes')).toBeVisible();

        await page.locator('#whoCanSeeEvents-EVERYONE').click();
        await page.waitForTimeout(300);

        await expect(page.getByText('Save changes')).not.toBeVisible();
    });

    test('submits mutation on Save changes click', async ({ page }) => {
        await page.click('[data-profile="profile-confidentiality"]');
        await page.waitForTimeout(500);

        let mutationCalled = false;
        await page.route('**/graphql', async (route, request) => {
            const body = JSON.parse(request.postData() || '{}');
            if (body.query?.includes('UpdatePrivacySetting')) {
                mutationCalled = true;
            }
            return route.fallback();
        }, { times: 1 });

        await page.locator('#whoCanSeeEvents-MARKED_COMPANIONS').click();
        await page.waitForTimeout(300);

        await page.getByText('Save changes').click();
        await page.waitForTimeout(500);

        expect(mutationCalled).toBeTruthy();
    });
});
