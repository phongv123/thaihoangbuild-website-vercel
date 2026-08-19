import React, { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const emptyForm = {
    companyName: "",
    slogan: "",
    logoUrl: "",

    hotline: "",
    hotlineSecondary: "",
    zaloNumber: "",
    zaloUrl: "",

    email: "",
    address: "",
    workingHours: "",

    facebookUrl: "",
    youtubeUrl: "",
    mapUrl: "",
    copyright: "",

    heroTitle: "",
    heroSubtitle: "",
    heroButtonText: "",
    heroButtonUrl: "",

    aboutTitle: "",
    aboutSubtitle: "",
    aboutDescription: "",
    aboutImage1: "",
    aboutImage2: "",

    yearsExperience: 0,
    completedProjectsCount: 0,

    processTitle: "",
    processSteps: [],
};

export default function SiteConfigAdmin() {
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadConfig = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/admin/site-config");

            setForm({
                ...emptyForm,
                ...data,
            });
        } catch (error) {
            console.error(error);
            alert("Không thể tải cấu hình website.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadConfig();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const save = async () => {
        try {
            setSaving(true);

            await api.put("/admin/site-config", {
                ...form,
                yearsExperience: Number(form.yearsExperience) || 0,
                completedProjectsCount:
                    Number(form.completedProjectsCount) || 0,
            });

            alert("Đã lưu cấu hình website.");

            await loadConfig();
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Lưu cấu hình thất bại."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6">
                    Đang tải cấu hình website...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-6">

                <div>
                    <h2 className="text-2xl font-bold">
                        Thông tin Website
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Quản lý thông tin chung hiển thị trên website.
                    </p>
                </div>

                {/* =========================
            THÔNG TIN CÔNG TY
        ========================== */}

                <section className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-lg font-semibold mb-5">
                        Thông tin công ty
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">

                        <Field
                            label="Tên công ty"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                        />

                        <Field
                            label="Slogan"
                            name="slogan"
                            value={form.slogan}
                            onChange={handleChange}
                        />

                        <Field
                            label="Logo URL"
                            name="logoUrl"
                            value={form.logoUrl}
                            onChange={handleChange}
                        />

                        <Field
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <Field
                            label="Hotline"
                            name="hotline"
                            value={form.hotline}
                            onChange={handleChange}
                        />

                        <Field
                            label="Hotline phụ"
                            name="hotlineSecondary"
                            value={form.hotlineSecondary}
                            onChange={handleChange}
                        />

                        <Field
                            label="Zalo"
                            name="zaloNumber"
                            value={form.zaloNumber}
                            onChange={handleChange}
                        />

                        <Field
                            label="Zalo URL"
                            name="zaloUrl"
                            value={form.zaloUrl}
                            onChange={handleChange}
                        />

                        <Field
                            label="Facebook"
                            name="facebookUrl"
                            value={form.facebookUrl}
                            onChange={handleChange}
                        />

                        <Field
                            label="YouTube"
                            name="youtubeUrl"
                            value={form.youtubeUrl}
                            onChange={handleChange}
                        />

                        <Field
                            label="Google Maps"
                            name="mapUrl"
                            value={form.mapUrl}
                            onChange={handleChange}
                        />

                        <Field
                            label="Giờ làm việc"
                            name="workingHours"
                            value={form.workingHours}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mt-4">

                        <label className="block text-sm font-medium mb-2">
                            Địa chỉ
                        </label>

                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div className="mt-4">

                        <label className="block text-sm font-medium mb-2">
                            Copyright
                        </label>

                        <input
                            name="copyright"
                            value={form.copyright}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            placeholder="© 2026 Thai Hoang Build"
                        />

                    </div>

                </section>

                {/* =========================
            HERO
        ========================== */}

                <section className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-lg font-semibold mb-5">
                        Hero
                    </h3>

                    <div className="space-y-4">

                        <Field
                            label="Tiêu đề Hero"
                            name="heroTitle"
                            value={form.heroTitle}
                            onChange={handleChange}
                        />

                        <TextArea
                            label="Mô tả Hero"
                            name="heroSubtitle"
                            value={form.heroSubtitle}
                            onChange={handleChange}
                        />

                        <div className="grid md:grid-cols-2 gap-4">

                            <Field
                                label="Tên nút"
                                name="heroButtonText"
                                value={form.heroButtonText}
                                onChange={handleChange}
                            />

                            <Field
                                label="Link nút"
                                name="heroButtonUrl"
                                value={form.heroButtonUrl}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </section>

                {/* =========================
            ABOUT
        ========================== */}

                <section className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-lg font-semibold mb-5">
                        Giới thiệu
                    </h3>

                    <div className="space-y-4">

                        <Field
                            label="Tiêu đề"
                            name="aboutTitle"
                            value={form.aboutTitle}
                            onChange={handleChange}
                        />

                        <Field
                            label="Tiêu đề phụ"
                            name="aboutSubtitle"
                            value={form.aboutSubtitle}
                            onChange={handleChange}
                        />

                        <TextArea
                            label="Nội dung"
                            name="aboutDescription"
                            value={form.aboutDescription}
                            onChange={handleChange}
                        />

                        <div className="grid md:grid-cols-2 gap-4">

                            <Field
                                label="Ảnh giới thiệu 1"
                                name="aboutImage1"
                                value={form.aboutImage1}
                                onChange={handleChange}
                            />

                            <Field
                                label="Ảnh giới thiệu 2"
                                name="aboutImage2"
                                value={form.aboutImage2}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <Field
                                label="Số năm kinh nghiệm"
                                name="yearsExperience"
                                type="number"
                                value={form.yearsExperience}
                                onChange={handleChange}
                            />

                            <Field
                                label="Số dự án hoàn thành"
                                name="completedProjectsCount"
                                type="number"
                                value={form.completedProjectsCount}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </section>

                {/* =========================
                    PROCESS
                ========================== */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-5">
                        Quy trình thực hiện
                    </h3>

                    <div className="space-y-4">
                        <Field
                            label="Tiêu đề quy trình"
                            name="processTitle"
                            value={form.processTitle}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Các bước thực hiện
                            </label>

                            <div className="space-y-3">
                                {(form.processSteps || []).map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 items-center"
                                    >
                                        <span className="w-8 text-center font-semibold text-gray-500">
                                            {index + 1}
                                        </span>

                                        <input
                                            type="text"
                                            value={step}
                                            onChange={(e) => {
                                                const newSteps = [
                                                    ...(form.processSteps || []),
                                                ];

                                                newSteps[index] = e.target.value;

                                                setForm((prev) => ({
                                                    ...prev,
                                                    processSteps: newSteps,
                                                }));
                                            }}
                                            className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={`Bước ${index + 1}`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSteps = [
                                                    ...(form.processSteps || []),
                                                ];

                                                newSteps.splice(index, 1);

                                                setForm((prev) => ({
                                                    ...prev,
                                                    processSteps: newSteps,
                                                }));
                                            }}
                                            className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm((prev) => ({
                                        ...prev,
                                        processSteps: [
                                            ...(prev.processSteps || []),
                                            "",
                                        ],
                                    }));
                                }}
                                className="mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                            >
                                + Thêm bước
                            </button>
                        </div>
                    </div>
                </section>

                {/* SAVE */}
                <div className="flex justify-end pb-10">

                    <button
                        type="button"
                        onClick={save}
                        disabled={saving}
                        className="
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              text-white
              px-6
              py-3
              rounded-lg
              font-medium
            "
                    >
                        {saving
                            ? "Đang lưu..."
                            : "Lưu cấu hình"}
                    </button>

                </div>

            </div>
        </AdminLayout>
    );
}

function Field({
    label,
    name,
    value,
    onChange,
    type = "text",
}) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function TextArea({
    label,
    name,
    value,
    onChange,
}) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <textarea
                name={name}
                value={value ?? ""}
                onChange={onChange}
                rows={4}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}