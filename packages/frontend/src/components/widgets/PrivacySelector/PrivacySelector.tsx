import { FC } from 'react';

import { PrivacySelectorProps } from './interfaces/PrivacySelectorProps';

import classes from './PrivacySelector.module.css';

const PRIVACY_OPTIONS = [
    { key: 'Public', label: 'Public' },
    { key: 'Private', label: 'Private' },
] as const;

export const PrivacySelector: FC<PrivacySelectorProps> = ({ options, onChange, selected }) => {
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
