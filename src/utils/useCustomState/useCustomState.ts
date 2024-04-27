import {useState} from "react";

export const useCustomState = <T>(initialValue: T): [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(initialValue);

    const updateValue = (newValue: T) => {
        setValue(newValue);
    };

    return [value, updateValue];
};
