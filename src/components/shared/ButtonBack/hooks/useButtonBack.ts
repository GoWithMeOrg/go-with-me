import { useRouter } from "next/navigation";

export const useButtonBack = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return { handleBack };
};

export default useButtonBack;
