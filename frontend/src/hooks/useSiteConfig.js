// fe/frontend/src/hooks/useSiteConfig.js
import { useState, useEffect } from 'react';
import api from '../api';

export function useSiteConfig() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/site-config')
            .then((res) => {
                setConfig(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Lỗi tải site config:', err);
                setLoading(false);
            });
    }, []);

    return { config, loading };
}