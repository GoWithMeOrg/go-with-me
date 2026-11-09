import { Input } from '@/components/shared/Input';
import { GoogleMapsBoundary } from '@/components/widgets/GoogleMap/GoogleMapsBoundary';
import { useAutocomplete } from './hooks/useAutocomplete';
import { AutocompleteProps } from './interfaces/Autocomplete.interface';

import classes from '@/components/widgets/MapComponents/Autocomplete/Autocomlete.module.css';

const AutocompleteInner = ({ value, onPlaceSelect }: AutocompleteProps) => {
    const { inputValue, suggestions, handleInput, handleSuggestionClick } = useAutocomplete({
        value,
        onPlaceSelect,
    });

    return (
        <div>
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

// Autocomplete нужен и в формах без карты (профиль, фильтры), поэтому
// провайдер ставится здесь: внутри LocationPicker/GoogleMap он уже есть и
// обёртка просто пропускает детей дальше.
export const Autocomplete = (props: AutocompleteProps) => (
    <GoogleMapsBoundary>
        <AutocompleteInner {...props} />
    </GoogleMapsBoundary>
);
