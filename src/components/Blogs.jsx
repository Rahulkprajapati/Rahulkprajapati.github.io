import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaMedium } from 'react-icons/fa';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rahulkprajapati');
                const data = await response.json();
                if (data.status === 'ok' && data.items.length > 0) {
                    setBlogs(data.items);
                } else {
                    // Fallback if feed is empty or fails
                    setBlogs([
                        {
                            title: 'Understanding Kubernetes Architecture',
                            link: 'https://medium.com/@rahulkprajapati',
                            pubDate: new Date().toISOString(),
                            thumbnail: 'https://miro.medium.com/max/1400/1*s9l9z9z9z9z9z9z9z9z9z9.png' // Generic or null
                        },
                        {
                            title: 'Terraform Best Practices for Scalable Infra',
                            link: 'https://medium.com/@rahulprajapati',
                            pubDate: new Date().toISOString(),
                        },
                        {
                            title: 'CI/CD Pipelines with Google Cloud Build',
                            link: 'https://medium.com/@rahulprajapati',
                            pubDate: new Date().toISOString(),
                        }
                    ]);
                    setError('No blogs found in feed. Showing samples.');
                }
            } catch {
                // Fallback on error
                setBlogs([
                    {
                        title: 'Understanding Kubernetes Architecture',
                        link: 'https://medium.com/@rahulprajapati',
                        pubDate: new Date().toISOString(),
                    },
                    {
                        title: 'Terraform Best Practices for Scalable Infra',
                        link: 'https://medium.com/@rahulprajapati',
                        pubDate: new Date().toISOString(),
                    },
                    {
                        title: 'CI/CD Pipelines with Google Cloud Build',
                        link: 'https://medium.com/@rahulprajapati',
                        pubDate: new Date().toISOString(),
                    }
                ]);
                setError('Unable to fetch blogs. Showing samples.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Helper to extract image from HTML content
    const extractImage = (content) => {
        if (!content) return null;
        const div = document.createElement('div');
        div.innerHTML = content;
        const img = div.querySelector('img');
        return img ? img.src : null;
    };

    return (
        <section className="section section-divider min-h-screen pt-28">
            <div className="shell">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="eyebrow">Writing</p>
                    <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl" style={{ color: 'var(--text)' }}>My Blogs</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] sm:text-lg" style={{ color: 'var(--text-muted)' }}>Thoughts and tutorials on Cloud, DevOps, and Tech.</p>
                </Motion.div>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="h-10 w-10 animate-spin rounded-full" style={{ border: '2px solid var(--border)', borderTopColor: 'var(--accent)' }}></div>
                    </div>
                )}

                {error && (
                    <div className="text-center mb-8">
                        <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{error}</p>
                        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            Check my <a href="https://medium.com/@rahulkprajapati" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: 'var(--tech)' }}>Medium Profile</a> for all articles.
                        </p>
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => {
                            // Use thumbnail from API, or extract from content, or use a default/fallback
                            const displayImage = blog.thumbnail || extractImage(blog.description) || extractImage(blog.content) || 'https://miro.medium.com/max/1400/1*s9l9z9z9z9z9z9z9z9z9z9.png';

                            return (
                                <Motion.a
                                    key={index}
                                    href={blog.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="surface lift group flex h-full flex-col overflow-hidden"
                                >
                                    <div className="h-48 overflow-hidden" style={{ background: 'var(--surface-inset)' }}>
                                        <img
                                            src={displayImage}
                                            alt={blog.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => { e.target.src = 'https://miro.medium.com/max/1400/1*s9l9z9z9z9z9z9z9z9z9z9.png'; }} // Fallback on load error
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-3 flex items-center justify-between text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>
                                            <span>{new Date(blog.pubDate).toLocaleDateString()}</span>
                                            <FaMedium style={{ color: 'var(--text-subtle)' }} />
                                        </div>
                                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors" style={{ color: 'var(--text)' }}>
                                            {blog.title}
                                        </h3>
                                        <div className="mt-auto pt-4">
                                            <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Read on Medium &rarr;</span>
                                        </div>
                                    </div>
                                </Motion.a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blogs;
