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
