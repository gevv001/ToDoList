import { useState, useEffect } from "react";

export default function useSearch(search, delay = 300) {
    const [debounced, setDebounced] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounced(search)
        }, delay)
        return () => clearTimeout(handler);
    }, [search, delay])

    return debounced;
}