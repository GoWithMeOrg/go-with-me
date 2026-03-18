import { gql } from '@apollo/client';

export const CREATE_EVENT_MUTATION = gql`
    mutation CreateEvent(
        $createEventInput: CreateEventInput!
        $createCategoryInput: CreateCategoryInput
        $createInterestInput: CreateInterestInput
        $createLocationInput: CreateLocationInput
        $createTagInput: CreateTagInput
    ) {
        createEvent(
            createEventInput: $createEventInput
            createCategoryInput: $createCategoryInput
            createInterestInput: $createInterestInput
            createLocationInput: $createLocationInput
            createTagInput: $createTagInput
        ) {
            _id
        }
    }
`;

export const UPDATE_EVENT_MUTATION = gql`
    mutation UpdateEvent(
        $updateEventId: ID!
        $updateEventInput: UpdateEventInput!
        $createCategoryInput: CreateCategoryInput
        $createInterestInput: CreateInterestInput
        $createLocationInput: CreateLocationInput
        $createTagInput: CreateTagInput
    ) {
        updateEvent(
            event_id: $updateEventId
            updateEventInput: $updateEventInput
            createCategoryInput: $createCategoryInput
            createInterestInput: $createInterestInput
            createLocationInput: $createLocationInput
            createTagInput: $createTagInput
        ) {
            _id
        }
    }
`;
