import React, { useEffect, useState } from "react";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const emptyConfig = {
    heroTitle: "",
    heroSubtitle: "",
    heroButtonText: "",
    heroButtonUrl: "",

    aboutTitle: "",
    aboutSubtitle: "",
    aboutDescription: "",
    aboutHighlights: [],

    processTitle: "",
    processSteps: [],

    homeQuoteTitle: "",
    homeQuoteNamePlaceholder: "",
    homeQuoteAddressPlaceholder: "",
    homeQuoteEmailPlaceholder: "",
    homeQuotePhonePlaceholder: "",
    homeQuoteMessagePlaceholder: "",
    homeQuoteSubmitText: "",
    mapUrl: "",

    hotline: "",
    hotlineSecondary: "",
    email: "",
    zaloNumber: "",
    zaloUrl: "",
};

const getCurrentSection = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);

    return parts[parts.length - 1] || "banner";
};

export default function HomeAdmin() {
    const location = useLocation();
    const navigate = useNavigate();

    const section = getCurrentSection(
        location.pathname
    );

    const [config, setConfig] =
        useState(emptyConfig);

    const [banners, setBanners] = useState([]);
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const token =
        localStorage.getItem("admin_token") || "";

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const loadConfig = async () => {
        try {
            const { data } = await api.get(
                "/admin/site-config"
            );

            setConfig({
                ...emptyConfig,
                ...data,
            });
        } catch (error) {
            console.error(error);
            alert(
                "Không thể tải cấu hình Trang chủ."
            );
        }
    };

    const loadBanners = async () => {
        try {
            const { data } = await api.get(
                "/admin/banners",
                {
                    params: {
                        page: "home",
                        _t: Date.now(),
                    },
                    headers,
                }
            );

            setBanners(
                Array.isArray(data)
                    ? data
                    : data?.items || []
            );
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Không thể tải banner Trang chủ."
            );
        }
    };

    const loadProjects = async () => {
        try {
            const { data } = await api.get(
                "/admin/projects",
                { headers }
            );

            setProjects(data || []);
        } catch (error) {
            console.error(error);
            alert(
                "Không thể tải danh sách dự án."
            );
        }
    };

    useEffect(() => {
        Promise.all([
            loadConfig(),
            loadBanners(),
            loadProjects(),
        ]).finally(() => {
            setLoading(false);
        });
    }, []);

    const saveConfig = async (payload = {}) => {
        try {
            setSaving(true);

            await api.put(
                "/admin/site-config",
                {
                    ...config,
                    ...payload,
                    yearsExperience:
                        Number(
                            config.yearsExperience
                        ) || 0,
                    completedProjectsCount:
                        Number(
                            config.completedProjectsCount
                        ) || 0,
                },
                { headers }
            );

            await loadConfig();

            alert("Đã lưu thành công.");
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Lưu thất bại."
            );
        } finally {
            setSaving(false);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();

        formData.append("image", file);

        const { data } = await api.post(
            "/admin/upload/image",
            formData,
            {
                headers: {
                    ...headers,
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

        return data.url;
    };

    const createBanner = async () => {
        try {
            const title = prompt(
                "Tên banner:"
            );

            if (title === null) return;

            const imageUrl = prompt(
                "URL hình ảnh:"
            );

            if (
                imageUrl === null ||
                !imageUrl.trim()
            ) {
                alert(
                    "Vui lòng nhập URL hình ảnh."
                );
                return;
            }

            const { data } = await api.post(
                "/admin/banners",
                {
                    page: "home",

                    title: title.trim(),

                    subtitle: "",

                    cover:
                        imageUrl.trim(),

                    buttonText:
                        "Xem Ngay",

                    link:
                        "/contact",

                    order:
                        banners.length,

                    isActive:
                        true,
                },
                { headers }
            );

            setBanners((prev) => [
                ...prev,
                data,
            ]);

            alert(
                "Đã thêm banner."
            );
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Thêm banner thất bại."
            );
        }
    };

    const deleteBanner = async (id) => {
        if (!window.confirm(
            "Xóa banner này?"
        )) {
            return;
        }

        try {
            await api.delete(
                `/admin/banners/${id}`,
                { headers }
            );

            await loadBanners();
        } catch (error) {
            console.error(error);
            alert("Xóa banner thất bại.");
        }
    };

    const updateBanner = async (
        id,
        payload
    ) => {
        try {
            const { data } = await api.put(
                `/admin/banners/${id}`,
                payload,
                { headers }
            );

            setBanners((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? data
                        : item
                )
            );

            alert(
                "Đã lưu banner."
            );
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Cập nhật banner thất bại."
            );
        }
    };

    const updateProjectFeatured = async (
        project,
        featuredHome,
        homeOrder
    ) => {
        try {
            await api.put(
                `/admin/projects/${project._id}`,
                {
                    title: project.title,
                    excerpt: project.excerpt,
                    cover: project.cover,
                    category:
                        project.category?._id ||
                        project.category ||
                        undefined,
                    featuredHome,
                    homeOrder,
                },
                { headers }
            );

            await loadProjects();
        } catch (error) {
            console.error(error);
            alert(
                "Cập nhật dự án tiêu biểu thất bại."
            );
        }
    };

    const updateHighlight = (
        index,
        value
    ) => {
        const newHighlights = [
            ...(config.aboutHighlights || []),
        ];

        newHighlights[index] = value;

        setConfig((prev) => ({
            ...prev,
            aboutHighlights:
                newHighlights,
        }));
    };

    const addHighlight = () => {
        setConfig((prev) => ({
            ...prev,
            aboutHighlights: [
                ...(prev.aboutHighlights || []),
                "",
            ],
        }));
    };

    const removeHighlight = (index) => {
        const newHighlights = [
            ...(config.aboutHighlights || []),
        ];

        newHighlights.splice(index, 1);

        setConfig((prev) => ({
            ...prev,
            aboutHighlights:
                newHighlights,
        }));
    };

    const updateProcessStep = (
        index,
        value
    ) => {
        const newSteps = [
            ...(config.processSteps || []),
        ];

        newSteps[index] = value;

        setConfig((prev) => ({
            ...prev,
            processSteps: newSteps,
        }));
    };

    const addProcessStep = () => {
        setConfig((prev) => ({
            ...prev,
            processSteps: [
                ...(prev.processSteps || []),
                "",
            ],
        }));
    };

    const removeProcessStep = (index) => {
        const newSteps = [
            ...(config.processSteps || []),
        ];

        newSteps.splice(index, 1);

        setConfig((prev) => ({
            ...prev,
            processSteps: newSteps,
        }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6">
                    Đang tải...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">

                {/* =================================
                    BANNER
                ================================== */}

                {section === "banner" && (
                    <section className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-2">
                            Banner trang chủ
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Quản lý hình ảnh, nội dung và
                            nút của Banner trang chủ.
                        </p>

                        <div className="space-y-4">

                            {banners.map((banner) => (

                                <div
                                    key={banner._id}
                                    className="border rounded-xl p-4 space-y-4"
                                >

                                    <img
                                        src={banner.coverImage}
                                        alt={banner.title}
                                        className="
                                            w-full
                                            h-56
                                            object-cover
                                            rounded-lg
                                        "
                                    />

                                    <Field
                                        label="Tiêu đề"
                                        value={banner.title}
                                        onChange={(value) => {
                                            setBanners((prev) =>
                                                prev.map((item) =>
                                                    item._id === banner._id
                                                        ? {
                                                            ...item,
                                                            title: value,
                                                        }
                                                        : item
                                                )
                                            );
                                        }}
                                    />

                                    <TextArea
                                        label="Mô tả"
                                        value={banner.subtitle}
                                        onChange={(value) => {
                                            setBanners((prev) =>
                                                prev.map((item) =>
                                                    item._id === banner._id
                                                        ? {
                                                            ...item,
                                                            subtitle: value,
                                                        }
                                                        : item
                                                )
                                            );
                                        }}
                                    />

                                    <Field
                                        label="Hình ảnh URL"
                                        value={banner.cover}
                                        onChange={(value) => {
                                            setBanners((prev) =>
                                                prev.map((item) =>
                                                    item._id === banner._id
                                                        ? {
                                                            ...item,
                                                            cover: value,
                                                        }
                                                        : item
                                                )
                                            );
                                        }}
                                    />

                                    <div className="grid md:grid-cols-3 gap-4">

                                        <Field
                                            label="Tên nút"
                                            value={banner.buttonText}
                                            onChange={(value) => {
                                                setBanners((prev) =>
                                                    prev.map((item) =>
                                                        item._id === banner._id
                                                            ? {
                                                                ...item,
                                                                buttonText: value,
                                                            }
                                                            : item
                                                    )
                                                );
                                            }}
                                        />

                                        <Field
                                            label="Link nút"
                                            value={banner.link}
                                            onChange={(value) => {
                                                setBanners((prev) =>
                                                    prev.map((item) =>
                                                        item._id === banner._id
                                                            ? {
                                                                ...item,
                                                                link: value,
                                                            }
                                                            : item
                                                    )
                                                );
                                            }}
                                        />

                                        <Field
                                            label="Thứ tự"
                                            type="number"
                                            value={banner.order ?? 0}
                                            onChange={(value) => {
                                                setBanners((prev) =>
                                                    prev.map((item) =>
                                                        item._id === banner._id
                                                            ? {
                                                                ...item,
                                                                order: Number(value) || 0,
                                                            }
                                                            : item
                                                    )
                                                );
                                            }}
                                        />

                                    </div>

                                    <label className="flex items-center gap-2">

                                        <input
                                            type="checkbox"
                                            checked={Boolean(banner.isActive)}
                                            onChange={(e) => {
                                                const value = e.target.checked;

                                                setBanners((prev) =>
                                                    prev.map((item) =>
                                                        item._id === banner._id
                                                            ? {
                                                                ...item,
                                                                isActive: value,
                                                            }
                                                            : item
                                                    )
                                                );
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateBanner(
                                                    banner._id,
                                                    {
                                                        page: "home",

                                                        title:
                                                            banner.title || "",

                                                        subtitle:
                                                            banner.subtitle || "",

                                                        cover:
                                                            banner.cover || "",

                                                        buttonText:
                                                            banner.buttonText || "",

                                                        link:
                                                            banner.link || "",

                                                        order:
                                                            Number(
                                                                banner.order
                                                            ) || 0,

                                                        isActive:
                                                            Boolean(
                                                                banner.isActive
                                                            ),
                                                    }
                                                )
                                            }
                                            className="
                                            px-5 py-2
                                            rounded-lg
                                            bg-blue-600 
                                            text-white
                                            hover:bg-blue-700
    "
                                        >
                                            Lưu banner
                                        </button>
                                        <span>
                                            Hiển thị banner
                                        </span>

                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteBanner(
                                                banner._id
                                            )
                                        }
                                        className="
                                            px-4 py-2
                                            rounded-lg
                                            bg-red-100
                                            text-red-600
                                        "
                                    >
                                        Xóa banner
                                    </button>

                                </div>

                            ))}

                            <button
                                type="button"
                                onClick={createBanner}
                                className="
                                    px-5 py-3
                                    rounded-lg
                                    bg-blue-600
                                    text-white
                                "
                            >
                                + Thêm banner
                            </button>

                        </div>
                    </section>
                )}

                {/* =================================
                    PROCESS
                ================================== */}

                {section === "process" && (
                    <section className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Quy trình thực hiện
                        </h2>

                        <Field
                            label="Tiêu đề quy trình"
                            value={config.processTitle}
                            onChange={(value) =>
                                setConfig((prev) => ({
                                    ...prev,
                                    processTitle:
                                        value,
                                }))
                            }
                        />

                        <div className="mt-5 space-y-3">

                            {(
                                config.processSteps ||
                                []
                            ).map(
                                (step, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2"
                                    >

                                        <span className="
                                            w-8
                                            flex
                                            items-center
                                            justify-center
                                            font-semibold
                                        ">
                                            {index + 1}
                                        </span>

                                        <input
                                            value={step}
                                            onChange={(e) =>
                                                updateProcessStep(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                flex-1
                                                border
                                                rounded-lg
                                                p-3
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeProcessStep(
                                                    index
                                                )
                                            }
                                            className="
                                                px-3
                                                rounded-lg
                                                bg-red-100
                                                text-red-600
                                            "
                                        >
                                            Xóa
                                        </button>

                                    </div>
                                )
                            )}

                        </div>

                        <button
                            type="button"
                            onClick={addProcessStep}
                            className="
                                mt-4
                                px-4 py-2
                                rounded-lg
                                bg-gray-100
                            "
                        >
                            + Thêm bước
                        </button>

                        <SaveButton
                            saving={saving}
                            onClick={() =>
                                saveConfig()
                            }
                        />

                    </section>
                )}

                {/* =================================
                    FEATURED PROJECTS
                ================================== */}

                {section === "featured-projects" && (
                    <section className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Dự án tiêu biểu
                        </h2>

                        <div className="space-y-4">

                            {projects.map(
                                (project) => (
                                    <div
                                        key={project._id}
                                        className="
                                            border
                                            rounded-xl
                                            p-4
                                            flex
                                            gap-4
                                            items-center
                                        "
                                    >

                                        <img
                                            src={
                                                project.cover
                                            }
                                            alt={
                                                project.title
                                            }
                                            className="
                                                w-28
                                                h-20
                                                object-cover
                                                rounded-lg
                                            "
                                        />

                                        <div className="flex-1">

                                            <h3 className="font-semibold">
                                                {
                                                    project.title
                                                }
                                            </h3>

                                            <label className="
                                                flex
                                                items-center
                                                gap-2
                                                mt-2
                                            ">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        Boolean(
                                                            project.featuredHome
                                                        )
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateProjectFeatured(
                                                            project,
                                                            e.target.checked,
                                                            project.homeOrder ??
                                                            0
                                                        )
                                                    }
                                                />

                                                <span>
                                                    Hiển thị
                                                    trên
                                                    Trang chủ
                                                </span>
                                            </label>

                                        </div>

                                        {project.featuredHome && (
                                            <input
                                                type="number"
                                                min="0"
                                                className="
                                                    w-24
                                                    border
                                                    rounded-lg
                                                    p-2
                                                "
                                                value={
                                                    project.homeOrder ??
                                                    0
                                                }
                                                onChange={(e) =>
                                                    updateProjectFeatured(
                                                        project,
                                                        true,
                                                        Number(
                                                            e.target
                                                                .value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        )}

                                    </div>
                                )
                            )}

                        </div>

                    </section>
                )}

                {/* =================================
                    ABOUT HOME
                ================================== */}

                {section === "about" && (
                    <section className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Giới thiệu trên trang chủ
                        </h2>

                        <div className="space-y-4">

                            <Field
                                label="Tiêu đề"
                                value={
                                    config.aboutTitle
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        aboutTitle:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Tiêu đề phụ"
                                value={
                                    config.aboutSubtitle
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        aboutSubtitle:
                                            value,
                                    }))
                                }
                            />

                            <TextArea
                                label="Nội dung"
                                value={
                                    config.aboutDescription
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        aboutDescription:
                                            value,
                                    }))
                                }
                            />
                            <Field
                                label="Link Google Maps"
                                value={config.mapUrl}
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        mapUrl: value,
                                    }))
                                }
                            />
                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Các điểm nổi bật
                                </label>

                                <div className="space-y-3">

                                    {(
                                        config.aboutHighlights ||
                                        []
                                    ).map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="flex gap-2"
                                            >

                                                <span className="
                                                    w-8
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-500
                                                    font-semibold
                                                ">
                                                    {
                                                        index +
                                                        1
                                                    }
                                                </span>

                                                <input
                                                    value={
                                                        item
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateHighlight(
                                                            index,
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="
                                                        flex-1
                                                        border
                                                        rounded-lg
                                                        p-3
                                                    "
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeHighlight(
                                                            index
                                                        )
                                                    }
                                                    className="
                                                        px-3
                                                        rounded-lg
                                                        bg-red-100
                                                        text-red-600
                                                    "
                                                >
                                                    Xóa
                                                </button>

                                            </div>
                                        )
                                    )}

                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        addHighlight
                                    }
                                    className="
                                        mt-4
                                        px-4 py-2
                                        rounded-lg
                                        bg-gray-100
                                    "
                                >
                                    + Thêm điểm nổi bật
                                </button>

                            </div>

                            <SaveButton
                                saving={saving}
                                onClick={() =>
                                    saveConfig()
                                }
                            />

                        </div>

                    </section>
                )}

                {/* =================================
                    QUOTE
                ================================== */}

                {section === "quote" && (
                    <section className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Form báo giá
                        </h2>

                        <div className="space-y-4">

                            <Field
                                label="Tiêu đề form"
                                value={
                                    config.homeQuoteTitle
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuoteTitle:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Placeholder tên"
                                value={
                                    config.homeQuoteNamePlaceholder
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuoteNamePlaceholder:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Placeholder địa chỉ"
                                value={
                                    config.homeQuoteAddressPlaceholder
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuoteAddressPlaceholder:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Placeholder email"
                                value={
                                    config.homeQuoteEmailPlaceholder
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuoteEmailPlaceholder:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Placeholder điện thoại"
                                value={
                                    config.homeQuotePhonePlaceholder
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuotePhonePlaceholder:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Placeholder yêu cầu"
                                value={
                                    config.homeQuoteMessagePlaceholder
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuoteMessagePlaceholder:
                                            value,
                                    }))
                                }
                            />

                            <Field
                                label="Nút gửi"
                                value={
                                    config.homeQuoteSubmitText
                                }
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        homeQuoteSubmitText:
                                            value,
                                    }))
                                }
                            />

                            <SaveButton
                                saving={saving}
                                onClick={() =>
                                    saveConfig()
                                }
                            />

                        </div>

                    </section>
                )}

                {section === "quick-contact" && (
                    <section className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-2">
                            Liên hệ nhanh
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Quản lý thông tin liên hệ hiển thị
                            trên phần đầu trang chủ.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">

                            <Field
                                label="Hotline"
                                value={config.hotline}
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        hotline: value,
                                    }))
                                }
                            />

                            <Field
                                label="Hotline phụ"
                                value={config.hotlineSecondary}
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        hotlineSecondary: value,
                                    }))
                                }
                            />

                            <Field
                                label="Email"
                                value={config.email}
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        email: value,
                                    }))
                                }
                            />

                            <Field
                                label="Số Zalo"
                                value={config.zaloNumber}
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        zaloNumber: value,
                                    }))
                                }
                            />

                            <Field
                                label="Link Zalo"
                                value={config.zaloUrl}
                                onChange={(value) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        zaloUrl: value,
                                    }))
                                }
                            />

                        </div>

                        <SaveButton
                            saving={saving}
                            onClick={() => saveConfig()}
                        />

                    </section>
                )}


            </div>
        </AdminLayout>
    );
}

function Field({
    label,
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
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

        </div>
    );
}

function TextArea({
    label,
    value,
    onChange,
}) {
    return (
        <div>

            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <textarea
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                rows={4}
                className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

        </div>
    );
}

function SaveButton({
    saving,
    onClick,
}) {
    return (
        <div className="flex justify-end pt-4">

            <button
                type="button"
                onClick={onClick}
                disabled={saving}
                className="
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:opacity-50
                    text-white
                    px-6 py-3
                    rounded-lg
                    font-medium
                "
            >
                {saving
                    ? "Đang lưu..."
                    : "Lưu thay đổi"}
            </button>

        </div>
    );
}