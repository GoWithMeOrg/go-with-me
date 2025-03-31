import { useRouter } from "next/navigation";

export const useButtonBack = () => {
    const router = useRouter();

    const handleBack = () => {
        router.push("/events");
    };

    return { handleBack };
};

export default useButtonBack;
