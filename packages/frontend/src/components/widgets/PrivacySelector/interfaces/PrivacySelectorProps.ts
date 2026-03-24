export interface PrivacySelectorProps {
    options?: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string;
}
