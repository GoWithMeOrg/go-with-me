export interface UseProfileFormProps {
    submitFileRef: React.MutableRefObject<(() => Promise<void>) | null>;
    deleteFileRef: React.MutableRefObject<((url: string) => Promise<void>) | null>;
}
