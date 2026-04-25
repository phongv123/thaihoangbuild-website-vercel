import React, { useState } from "react";
import BlogComponent from "../components/BlogComponent";

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");

    const categories = ["Tất cả", "Chăm sóc nhà", "Vật liệu", "Phong thủy", "Thi công"];

    const posts = [
        {
            id: 1,
            title: "Cách chọn vật liệu xây dựng chất lượng",
            desc: "Lựa chọn vật liệu phù hợp giúp công trình bền vững và tiết kiệm chi phí.",
            category: "Vật liệu",
            date: "20/10/2025",
            cover: "/blog/hinh1.jpg",
        },
        {
            id: 2,
            title: "5 mẹo chống thấm hiệu quả cho nhà ở",
            desc: "Những phương pháp chống thấm phổ biến và hiệu quả nhất hiện nay.",
            category: "Chăm sóc nhà",
            date: "12/10/2025",
            cover: "/blog/hinh2.jpg",
        },
        {
            id: 3,
            title: "Phong thủy phòng khách cho gia chủ mệnh Mộc",
            desc: "Bố trí không gian phòng khách hợp phong thủy để thu hút tài lộc.",
            category: "Phong thủy",
            date: "10/10/2025",
            cover: "/blog/hinh3.jpeg",
        },
        {
            id: 4,
            title: "Quy trình thi công nền móng vững chắc",
            desc: "Các bước thi công nền móng đúng kỹ thuật để tránh sụt lún.",
            category: "Thi công",
            date: "05/10/2025",
            cover: "/images/blog4.jpg",
        },
    ];

    const filteredPosts = posts.filter(
        (post) =>
            (selectedCategory === "Tất cả" || post.category === selectedCategory) &&
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="w-full min-h-screen bg-gray-50">
            <BlogComponent
                posts={posts}
                filteredPosts={filteredPosts}
                categories={categories}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
        </main>
    );
}