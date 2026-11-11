import { useGeneratorEvents } from './useGeneratorEvents';
import { useGeneratorLocation } from './useGeneratorLocation';
import { useGeneratorUser } from './useGeneratorUser';

export const useGenerator = () => {
    const { setSelectedLocation } = useGeneratorLocation();
    const { handleGenerateUsers, changeNumberItems, generatedUsers } = useGeneratorUser();
    const { handleGenerateEvents, changeNumberEvents, generatedEvents, numberEvents } =
        useGeneratorEvents();

    return {
        changeNumberItems,
        changeNumberEvents,
        setSelectedLocation,
        handleGenerateEvents,
        generatedEvents,
        handleGenerateUsers,
        generatedUsers,
        numberEvents,
    };
};
