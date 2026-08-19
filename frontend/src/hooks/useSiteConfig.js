import { useEffect, useState } from "react";
import api from "../api";

export function useSiteConfig() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadConfig = async () => {
        try {
            setLoading(true);

            const response = await api.get("/site-config");

            setConfig(response.data);
        } catch (error) {
            console.error("Lỗi tải Site Config:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadConfig();
    }, []);

    return {
        config,
        loading,
        error,
        reload: loadConfig,
    };
}