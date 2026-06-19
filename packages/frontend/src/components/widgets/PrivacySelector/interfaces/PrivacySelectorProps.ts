export interface PrivacyOption {
    key: string;
    label: string;
}

export interface PrivacySelectorProps {
    options?: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string;
    privacyOptions?: readonly PrivacyOption[];
}
