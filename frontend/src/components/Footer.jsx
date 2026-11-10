import React from 'react';
import { Wind, Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-orange-100 pt-16 pb-8">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1">
                    <Link to="/" className="flex items-center gap-2 logo mb-6">
                        <Wind className="text-primary-saffron" size={28} />
                        <span className="text-2xl">Grihastu</span>
                    </Link>
                    <p className="text-gray-600 mb-6">
                        Empowering the modern generation with timeless Vedic wisdom and traditions.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-orange-50 rounded-full text-primary-saffron hover:bg-primary-saffron hover:text-white transition-colors">
                            <Globe size={20} />
                        </a>
                        <a href="#" className="p-2 bg-orange-50 rounded-full text-primary-saffron hover:bg-primary-saffron hover:text-white transition-colors">
                            <MessageCircle size={20} />
                        </a>
                        <a href="#" className="p-2 bg-orange-50 rounded-full text-primary-saffron hover:bg-primary-saffron hover:text-white transition-colors">
                            <Share2 size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Explore</h4>
                    <ul className="flex flex-col gap-3 list-none">
                        <li><Link to="/stories" className="text-gray-600 hover:text-primary-saffron">Epic Stories</Link></li>
                        <li><Link to="/stotras" className="text-gray-600 hover:text-primary-saffron">Stotras Library</Link></li>
                        <li><Link to="/festivals" className="text-gray-600 hover:text-primary-saffron">Festivals</Link></li>
                        <li><Link to="/lifestyle" className="text-gray-600 hover:text-primary-saffron">Vedic Lifestyle</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Support</h4>
                    <ul className="flex flex-col gap-3 list-none">
                        <li><a href="#" className="text-gray-600 hover:text-primary-saffron">FAQ</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-primary-saffron">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-primary-saffron">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-primary-saffron">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                    <p className="text-gray-600 mb-4">Get weekly spiritual insights in your inbox.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email" className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-primary-saffron" />
                        <button className="bg-primary-saffron text-white p-2 rounded-lg hover:bg-deep-maroon transition-colors">
                            <Mail size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container border-t pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2026 Grihastu Foundation. All rights reserved. Designed for the Digital Age.</p>
            </div>
        </footer>
    );
};

export default Footer;
