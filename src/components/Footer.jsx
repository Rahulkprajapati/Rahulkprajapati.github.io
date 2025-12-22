import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Rahul Prajapati. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
