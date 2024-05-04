import {useCallback, useEffect, useState} from "react";
import {APIKEY, BASEURL} from "../constansApi";

export interface FetchOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
    error: Error | null;
}

export const useCustomFetch = <T>(path: string,queryParams = {}, options?: FetchOptions): [T | null, boolean, Error | null] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {

        const url = new URL(`${BASEURL}${path}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value) {
                url.searchParams.append(key, String(value));
            }
            url.searchParams.append('key', APIKEY);
        });

        try {
            const response = await fetch(url,options);
            const responseData: T = await response.json();
            setData(responseData);
        } catch (error) {
           if (error instanceof Error) {
               setError(error);
           }
            setError(null);
        } finally {
            setLoading(false);
        }
    }, [options, path, queryParams]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [data, loading, error];
};
