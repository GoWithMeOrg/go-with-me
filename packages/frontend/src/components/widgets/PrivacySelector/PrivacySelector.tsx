import { FC } from 'react';

import { PrivacySelectorProps } from './interfaces/PrivacySelectorProps';

import classes from './PrivacySelector.module.css';

const DEFAULT_OPTIONS = [
    { key: 'Public', label: 'Public' },
    { key: 'Private', label: 'Private' },
] as const;

export const PrivacySelector: FC<PrivacySelectorProps> = ({ options, onChange, selected, privacyOptions }) => {
    const items = privacyOptions ?? DEFAULT_OPTIONS;

    return (
        <div className={classes.confidentiality}>
            <div className={classes.confidentialityWrapper}>
                {items.map(({ key, label }) => {
                    const value = options?.[key] ?? key;
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
