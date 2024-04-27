import {useCallback, useEffect, useState} from "react";

export interface FetchOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
    error: Error | null;
}

export const useCustomFetch = <T>(url: string, options: FetchOptions): [T | null, boolean, Error | null] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url, options);
            const responseData: T = await response.json();
            setData(responseData);
        } catch (error) {
            // @ts-ignore
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [data, loading, error];
};
