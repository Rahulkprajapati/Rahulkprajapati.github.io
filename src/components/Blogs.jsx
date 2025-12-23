import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            } catch (err) {
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
        <section className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Blogs</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Thoughts and tutorials on Cloud, DevOps, and Tech.</p>
                </motion.div>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center mb-8">
                        <p className="text-yellow-600 dark:text-yellow-400">{error}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Check my <a href="https://medium.com/@rahulkprajapati" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-500">Medium Profile</a> for all articles.
                        </p>
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => {
                            // Use thumbnail from API, or extract from content, or use a default/fallback
                            const displayImage = blog.thumbnail || extractImage(blog.description) || extractImage(blog.content) || 'https://miro.medium.com/max/1400/1*s9l9z9z9z9z9z9z9z9z9z9.png';

                            return (
                                <motion.a
                                    key={index}
                                    href={blog.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                                >
                                    <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                                        <img
                                            src={displayImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            onError={(e) => { e.target.src = 'https://miro.medium.com/max/1400/1*s9l9z9z9z9z9z9z9z9z9z9.png'; }} // Fallback on load error
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                            <span>{new Date(blog.pubDate).toLocaleDateString()}</span>
                                            <FaMedium className="text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <div className="mt-auto pt-4">
                                            <span className="text-cyan-500 dark:text-cyan-400 font-medium hover:underline">Read on Medium &rarr;</span>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blogs;
