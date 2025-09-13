import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold font-poppins">
                Sympto<span className="text-mint">Care</span>
              </span>
            </Link>
            <p className="text-navy-foreground/80 leading-relaxed font-inter">
              Revolutionizing healthcare with AI-powered solutions, connecting patients with top specialists, 
              and making quality healthcare accessible to everyone.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center hover:bg-mint hover:text-navy transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-mint font-poppins">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { title: 'AI Symptom Analyzer', path: '/analyzer' },
                { title: 'Find Doctors', path: '/doctors' },
                { title: 'Medical Store', path: '/store' },
                { title: 'Ayurveda Care', path: '/ayurveda' },
                { title: 'Health Insurance', path: '/insurance' },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="text-navy-foreground/80 hover:text-mint transition-colors duration-300 font-inter"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-mint font-poppins">Services</h3>
            <ul className="space-y-3">
              {[
                'Telemedicine',
                'Health Monitoring',
                'Prescription Delivery',
                'Emergency Care',
                'Health Records',
              ].map((service) => (
                <li key={service}>
                  <span className="text-navy-foreground/80 font-inter">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-mint font-poppins">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-mint mt-1" />
                <span className="text-navy-foreground/80 font-inter">
                  123 Healthcare Street<br />
                  Medical District, Mumbai 400001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mint" />
                <span className="text-navy-foreground/80 font-inter">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-mint" />
                <span className="text-navy-foreground/80 font-inter">care@symptocare.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-mint/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-navy-foreground/80 font-inter">Made with</span>
              <Heart className="h-4 w-4 text-mint" />
              <span className="text-navy-foreground/80 font-inter">for better healthcare in India</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-navy-foreground/80 hover:text-mint transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-navy-foreground/80 hover:text-mint transition-colors">
                Terms of Service
              </Link>
              <span className="text-navy-foreground/60">© 2024 SymptoCare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;