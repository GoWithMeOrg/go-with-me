import { Input } from '@/components/shared/Input';

import { useAutocomplete } from './hooks/useAutocomplete';
import { AutocompleteProps } from './interfaces/Autocomplete.interface';

import classes from '@/components/widgets/Autocomlete/Autocomlete.module.css';

export const Autocomplete = ({ onPlaceSelect }: AutocompleteProps) => {
    const { inputValue, suggestions, handleInput, handleSuggestionClick } = useAutocomplete({
        onPlaceSelect,
    });

    return (
        <div className={classes['autocomplete-container']}>
            <Input
                value={inputValue}
                placeholder="Search for a place"
                onChange={(event) => handleInput(event)}
            />

            {suggestions.length > 0 && (
                <ul className={classes.autocompleteList}>
                    {suggestions.map((suggestion, index) => {
                        return (
                            <li
                                key={index}
                                className={classes.autocompleteItem}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.placePrediction?.text.text}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
