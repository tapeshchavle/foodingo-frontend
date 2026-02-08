import React from 'react';
import Menubar from '../menubar/Menubar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Menubar />
            <main className="flex-grow pt-24 pb-8 container mx-auto px-4 md:px-8">
                {children}
            </main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-12 mt-auto text-gray-500 dark:text-gray-400">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-6 text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Foodingo. All rights reserved.</p>
                    <div className="flex justify-center gap-8 text-sm font-medium">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
