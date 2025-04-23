import { useState, useEffect } from 'react';
import { Heart,Mail, ExternalLink } from 'lucide-react';
import { Github, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  
  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check initial position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-8 shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        {/* Top section with logo and links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="bg-white text-blue-600 p-1 rounded mr-2">EM</span>
              EduManager
            </h2>
            <p className="text-blue-200 mt-2">Hệ thống Quản lý Sinh viên tiên tiến</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="hover:bg-white hover:text-blue-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              {/* <Linkedin size={20} /> */}
            </a>
            <a 
              href="#" 
              className="hover:bg-white hover:text-blue-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              {/* <Linkedin size={20} /> */}
            </a>
            <a 
              href="#" 
              className="hover:bg-white hover:text-blue-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Middle section with quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-t border-b border-blue-500">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 relative inline-block">
              Tính năng
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-2">
              <li className="group">
                <a href="#" className="text-blue-200 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Quản lý sinh viên
                </a>
              </li>
              <li className="group">
                <a href="#" className="text-blue-200 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Thống kê lớp học
                </a>
              </li>
              <li className="group">
                <a href="#" className="text-blue-200 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Báo cáo
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li className="group">
                <a href="#" className="text-blue-200 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li className="group">
                <a href="#" className="text-blue-200 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  FAQ
                </a>
              </li>
              <li className="group">
                <a href="#" className="text-blue-200 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <div className="text-blue-200">
              <p className="mb-2 hover:text-white transition-colors">info@edumanager.com</p>
              <p className="mb-2 hover:text-white transition-colors">+84 123 456 789</p>
              <p className="hover:text-white transition-colors">Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright section */}
        <div className="mt-8 text-center">
          <p className="flex items-center justify-center">
            © {currentYear} EduManager - Made with 
            <Heart 
              className="mx-2 text-red-400 hover:text-red-500 animate-pulse" 
              size={16} 
              fill="currentColor"
            />
            by 
            <a 
              href="#" 
              className="ml-2 relative group inline-flex items-center"
            >
              <span className="underline decoration-2 decoration-blue-400 underline-offset-4 font-medium hover:text-blue-300 transition-colors">
                Your Name
              </span>
              <ExternalLink 
                size={14} 
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" 
              />
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          </p>
          
          <div className="text-xs text-blue-300 mt-4">
            <p>Tất cả thông tin được bảo mật theo chính sách bảo mật.</p>
          </div>
        </div>
      </div>
      
      {/* Wave effect */}
      <div className="relative h-16 mt-8 overflow-hidden">
        <div className="absolute w-full bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
            <path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </footer>
  );
}