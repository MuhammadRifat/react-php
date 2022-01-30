import React, { useEffect, useState } from 'react';

const useFetch = (promise) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        promise()
            .then(response => {
                setIsLoading(false);
                setData(response);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })
            .finally(() => {
                // setIsLoading(false);
            })

    }, [promise]);

    return (
        {
            data,
            isLoading,
            error
        }
    );
};

export default useFetch;