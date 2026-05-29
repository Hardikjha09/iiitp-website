import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [hits, setHits] = useState(0);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Simulated base counts
    const baseHits = 9514;
    const baseVisitors = 4289;
    
    // Process Hits (Increments on every page load)
    let localHits = parseInt(localStorage.getItem('site_hits') || '0', 10);
    localHits += 1;
    localStorage.setItem('site_hits', localHits.toString());
    setHits(baseHits + localHits);

    // Process Visitors (Increments once per session)
    let localVisitors = parseInt(localStorage.getItem('site_visitors') || '0', 10);
    if (!sessionStorage.getItem('visited_this_session')) {
      localVisitors += 1;
      localStorage.setItem('site_visitors', localVisitors.toString());
      sessionStorage.setItem('visited_this_session', 'true');
    }
    setVisitors(baseVisitors + localVisitors);
  }, []);

  // Format numbers into arrays of digits
  const formatCount = (count) => count.toString().padStart(4, '0').split('');

  return (
    <footer className="bg-footer text-gray-300 border-t border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> About Us</Link></li>
                <li><Link to="/academics" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Academics</Link></li>
                <li><Link to="/research" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Research</Link></li>
                <li><Link to="/placement" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Placement</Link></li>
                <li><Link to="/careers" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Careers</Link></li>
              </ul>
              <ul className="space-y-3">
                <li><Link to="/notice" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Notice Board</Link></li>
                <li><Link to="/e-tender" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> E-Tender</Link></li>
                <li><Link to="/library" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Library</Link></li>
                <li><Link to="/fees" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Fees Structure</Link></li>
                <li><Link to="/contact" className="hover:text-brand-red transition-colors flex items-center group"><ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Contact Us</Link></li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center text-sm">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-semibold mr-2">GST No:</span>
              <span className="text-gray-200 font-mono font-medium bg-gray-800 px-2 py-0.5 rounded shadow-sm">27AAAGI1149H1ZK</span>
            </div>
          </div>

          {/* Address Column */}
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Locate Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-red mr-3 mt-1 shrink-0" />
                <p className="leading-relaxed text-sm">
                  Indian Institute of Information Technology (IIIT) Pune<br />
                  Gate No - 5 & 6,<br />
                  Vill - Nanoli-Tarf Chakan,<br />
                  PO - Talegaon,<br />
                  Tah - Maval, Dist-Pune,<br />
                  Maharashtra-410507
                </p>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-5 h-5 text-brand-red mr-3 shrink-0" />
                <p>02114-224510</p>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-5 h-5 text-brand-red mr-3 shrink-0" />
                <p>enquiry@iiitp.ac.in</p>
              </div>
                    <div className="pt-4 flex items-center space-x-5">
                <a href="https://www.linkedin.com/school/indian-institute-of-information-technology-pune/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="LinkedIn">
                  <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6 object-contain" />
                </a>
                <a href="https://twitter.com/IIITPune" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="X (Twitter)">
                  <img src="/x.png" alt="X (Twitter)" className="w-6 h-6 object-contain" />
                </a>
                <a href="https://www.facebook.com/Indian-Institute-of-Information-Technology-Pune-101140938435131/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Facebook">
                  <img src="/facebook.png" alt="Facebook" className="w-6 h-6 object-contain" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Map Location</h3>
            <a 
              href="https://www.google.com/maps/place/Indian+Institute+of+Information+Technology+Pune/@18.7531606,73.6877379,14z/data=!4m6!3m5!1s0x3bc2b405ac494d45:0xc302bc70566bb0f8!8m2!3d18.7651235!4d73.6970609!16s%2Fg%2F11c1qzfh2p?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank" 
              rel="noopener noreferrer"
              className="block h-40 w-full rounded-lg overflow-hidden border border-gray-800 relative group shadow-sm cursor-pointer"
            >
              <iframe 
                title="IIIT Pune Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.043690623351!2d73.6953457750284!3d18.763784782200388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b70007204f19%3A0x6700c253b3425039!2sIIIT%20Pune!5e0!3m2!1sen!2sin!4v1716744000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              ></iframe>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300 pointer-events-none"></div>
              <div 
                className="absolute bottom-2 right-2 z-10 bg-black/70 group-hover:bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded transition-all duration-200"
              >
                View Large Map
              </div>
            </a>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <div className="text-gray-400 flex flex-col space-y-1 text-center md:text-left">
            <div>&copy; {new Date().getFullYear()} IIIT Pune. All rights reserved.</div>
            <div className="text-xs text-gray-500">
              Designed & Developed by{' '}
              <a href="https://www.linkedin.com/in/hardik-jha-a1985b160" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">Hardik Jha</a>,{' '}
              <a href="https://www.linkedin.com/in/abhay-gugale-40875632b/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">Abhay Gugale</a> and{' '}
              <a href="https://www.linkedin.com/in/aanoush-surana-73964a335/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">Aanoush Surana</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-semibold">Visitors</span>
              <div className="flex space-x-1">
                {formatCount(visitors).map((digit, idx) => (
                  <span key={`v-${idx}`} className="bg-purple-600 text-white px-2 py-1 rounded shadow-inner font-mono font-bold tracking-widest text-base">
                    {digit}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-semibold">Hits</span>
              <div className="flex space-x-1">
                {formatCount(hits).map((digit, idx) => (
                  <span key={`h-${idx}`} className="bg-orange-600 text-white px-2 py-1 rounded shadow-inner font-mono font-bold tracking-widest text-base">
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
