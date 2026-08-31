import React from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminModulePlaceholder({
    title,
    description = "",
}) {
    const location = useLocation();

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">

                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-2xl font-bold mb-3">
                        {title}
                    </h2>

                    {description && (
                        <p className="text-gray-500 mb-4">
                            {description}
                        </p>
                    )}

                    <div className="text-sm text-gray-400">
                        Route hiện tại:
                        <span className="ml-2 font-mono">
                            {location.pathname}
                        </span>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}