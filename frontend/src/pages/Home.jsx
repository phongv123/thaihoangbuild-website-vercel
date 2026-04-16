// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectsSlider from '../components/ProjectsSlider';

import MainServices from '../components/MainServices';


import GridCards from '../components/GridCards';
import ContactForm from '../components/ContactForm';
import Process from '../components/Process';
import AboutSection from '../components/AboutSection';
import { api } from '../api';

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [posts, setPosts] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        api.get('/api/projects?limit=8').then(r => setProjects(r.data.items || []));
        api.get('/api/posts?limit=4').then(r => setPosts(r.data.items || []));
        api.get('/api/categories?type=material').then(r => setMaterials(r.data.items || []));
    }, []);

    return (
        <>
            <Hero />
            {/* slider fade cho Dự án thiết kế */}
            <ProjectsSlider
                title="Dự án thiết kế"
                items={projects}
                action={<Link to="/projects" className="btn">Xem thêm</Link>}
            />
            <Process />
            <MainServices />
            <GridCards title="Cẩm nang · Tư vấn" items={posts} action={<Link to="/blog" className="btn">Xem tất cả</Link>} />
            <AboutSection />

            <section className="container my-16 grid md:grid-cols-2 gap-8">
                <ContactForm />
                <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-2">LIÊN HỆ NHANH</h3>
                    <p>Gọi Hotline: <a href="tel:0903208113" className="underline">0969.13.17.18 & 0902.491.219 (Mr.Huy)</a></p>
                    <p className="mt-2 text-sm text-gray-600">Thêm ghi chú, yêu cầu hoặc đặt lịch tư vấn miễn phí.</p>
                </div>
            </section>
        </>
    );
}
