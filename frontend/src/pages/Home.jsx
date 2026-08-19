import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Hero from '../components/Hero'
import ProjectsSlider from '../components/ProjectsSlider'
import MainServices from '../components/MainServices'
import GridCards from '../components/GridCards'
import ContactForm from '../components/ContactForm'
import Process from '../components/Process'
import AboutSection from '../components/AboutSection'

import api from '../api'
import { useSiteConfig } from '../hooks/useSiteConfig'

export default function Home() {
    const [projects, setProjects] = useState([])
    const [posts, setPosts] = useState([])
    const { config } = useSiteConfig()

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    projectsResponse,
                    postsResponse,
                ] = await Promise.all([
                    api.get('/projects?limit=8'),
                    api.get('/posts?limit=4'),
                ])

                setProjects(
                    projectsResponse.data?.items || []
                )

                setPosts(
                    postsResponse.data?.items || []
                )
            } catch (error) {
                console.error(
                    'Không thể tải dữ liệu trang chủ:',
                    error
                )
            }
        }

        loadData()
    }, [])

    return (
        <>
            <Hero />

            <ProjectsSlider
                title="Dự án thiết kế"
                items={projects}
                action={
                    <Link
                        to="/projects"
                        className="btn"
                    >
                        Xem thêm
                    </Link>
                }
            />

            <Process />

            <MainServices />

            <GridCards
                title="Cẩm nang · Tư vấn"
                items={posts}
                action={
                    <Link
                        to="/blog"
                        className="btn"
                    >
                        Xem tất cả
                    </Link>
                }
            />

            <AboutSection />

            <section className="container my-16 grid md:grid-cols-2 gap-8">

                <ContactForm />

                <div className="card p-6">

                    <h3 className="text-lg font-semibold mb-4">
                        LIÊN HỆ NHANH
                    </h3>

                    {config?.hotline && (
                        <p>
                            Gọi Hotline:{' '}
                            <a
                                href={`tel:${config.hotline}`}
                                className="underline"
                            >
                                {config.hotline}
                            </a>
                        </p>
                    )}

                    {config?.hotlineSecondary && (
                        <p className="mt-2">
                            Hotline phụ:{' '}
                            <a
                                href={`tel:${config.hotlineSecondary}`}
                                className="underline"
                            >
                                {config.hotlineSecondary}
                            </a>
                        </p>
                    )}

                    {config?.zaloUrl && (
                        <p className="mt-2">
                            Zalo:{' '}
                            <a
                                href={config.zaloUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                Liên hệ Zalo
                            </a>
                        </p>
                    )}

                    {config?.facebookUrl && (
                        <p className="mt-2">
                            Facebook:{' '}
                            <a
                                href={config.facebookUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                Trang Facebook
                            </a>
                        </p>
                    )}

                    {config?.address && (
                        <p className="mt-2">
                            Địa chỉ:{' '}
                            {config.address}
                        </p>
                    )}

                </div>
            </section>
        </>
    )
}