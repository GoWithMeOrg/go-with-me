import classes from './PrivacySelector.module.css';

interface PrivacySelectorProps {
    options?: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string;
}

const PRIVACY_OPTIONS = [
    { key: 'Public', label: 'Public' },
    { key: 'Private', label: 'Private' },
] as const;

export const PrivacySelector = ({ options, onChange, selected }: PrivacySelectorProps) => {
    return (
        <div className={classes.confidentiality}>
            <span className={classes.confidentialityTitle}>Privacy</span>

            <div className={classes.confidentialityWrapper}>
                {PRIVACY_OPTIONS.map(({ key, label }) => {
                    const value = options?.[key];
                    const isChecked = selected === value;

                    return (
                        <div key={value} className={classes.confidentialityRadio}>
                            <input
                                type="radio"
                                name="privacy"
                                id={value}
                                value={value}
                                onChange={onChange}
                                checked={isChecked}
                                className={classes.confidentialityInput}
                            />
                            <label className={classes.confidentialityLabel} htmlFor={value}>
                                {label}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
