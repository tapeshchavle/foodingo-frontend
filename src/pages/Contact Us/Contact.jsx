import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section className="container py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-heading mb-4">Get in Touch</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Have questions about our menu or services? We're here to help! Send us a message and we'll get back to you as soon as possible.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:col-span-5 lg:col-span-4 space-y-6"
                >
                    <div className="bg-primary/5 dark:bg-gray-800/50 p-8 rounded-3xl border border-primary/10 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Phone</p>
                                    <p className="text-gray-600 dark:text-gray-300">+91 123 456 7890</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Email</p>
                                    <p className="text-gray-600 dark:text-gray-300">support@foodingo.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary shadow-sm shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Location</p>
                                    <p className="text-gray-600 dark:text-gray-300">123 Food Street, Bangalore, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-7 lg:col-span-8 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Your message here..."></textarea>
                        </div>
                        <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact