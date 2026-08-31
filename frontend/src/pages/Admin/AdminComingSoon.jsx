import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminComingSoon({
    title,
    description,
}) {
    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-2xl font-bold mb-3">
                        {title}
                    </h2>

                    <p className="text-gray-500">
                        {description ||
                            "Khu vực quản trị này sẽ được triển khai tiếp theo."}
                    </p>

                </div>

            </div>
        </AdminLayout>
    );
}