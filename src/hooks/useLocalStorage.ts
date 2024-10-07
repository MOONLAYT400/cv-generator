import { useEffect, useState } from "react";

export const useLocalStorage = (storageKey: string): [any, (storageValue: any) => void, () => void] => {
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem(storageKey);
            if (item) setValue(JSON.parse(item));
        }
    }, [typeof window !== "undefined"]);

    const handleSetLocalStorage = (storageValue: any) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, JSON.stringify(storageValue));
            setValue(storageValue);
        }
    };

    const handleRemoveItem = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(storageKey);
            setValue(null);
        }
    };

    return [value, handleSetLocalStorage, handleRemoveItem];
};
