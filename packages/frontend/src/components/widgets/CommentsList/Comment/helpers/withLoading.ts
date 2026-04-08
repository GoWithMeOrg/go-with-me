export const withLoading =
    <T extends unknown[], R>(setLoading: (v: boolean) => void, fn: (...args: T) => Promise<R>) =>
    async (...args: T): Promise<R> => {
        setLoading(true);
        try {
            return await fn(...args);
        } finally {
            setLoading(false);
        }
    };
