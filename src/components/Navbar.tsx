
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const Navbar = () => {
  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Symptom Analyzer', href: '/analyzer' },
    { title: 'Medical Store', href: '/store' },
    { title: 'Find Doctors', href: '/doctors' },
    { title: 'About Us', href: '/about' },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Sympto<span className="text-[#9b87f5]">Care</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {item.title}
              </Link>
            ))}
            <Button variant="default" className="bg-[#9b87f5] hover:bg-[#8b77e5]">
              Sign In
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Button className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]">
                    Sign In
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
