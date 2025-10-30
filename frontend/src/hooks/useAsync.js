import { useState, useCallback } from 'react';

export function useAsync(asyncFunction) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const execute = useCallback(
        async (...params) => {
            try {
                setLoading(true);
                setError(null);
                const response = await asyncFunction(...params);
                setData(response);
                return response;
            } catch (error) {
                setError(error);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [asyncFunction]
    );

    return { data, error, loading, execute };
}

export function usePagination(initialPage = 1, initialLimit = 10) {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [total, setTotal] = useState(0);

    const nextPage = () => {
        if (page * limit < total) {
            setPage((p) => p + 1);
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setPage((p) => p - 1);
        }
    };

    const goToPage = (pageNumber) => {
        const totalPages = Math.ceil(total / limit);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
        }
    };

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    const changeLimit = (newLimit) => {
        setLimit(newLimit);
        setPage(1); // Reset to first page when changing limit
    };

    return {
        page,
        limit,
        total,
        nextPage,
        previousPage,
        goToPage,
        updateTotal,
        changeLimit,
    };
}

export function useForm(initialValues = {}, validationSchema = null) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const validate = useCallback(
        async (data = values) => {
            if (!validationSchema) return {};

            try {
                await validationSchema.validate(data, { abortEarly: false });
                return {};
            } catch (err) {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                return validationErrors;
            }
        },
        [values, validationSchema]
    );

    const handleSubmit = async (onSubmit) => {
        const validationErrors = await validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            return onSubmit(values);
        }
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setValues,
    };
}