
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useEffect, useState } from 'react';
import { toast } from './ui/sonner';
import LanguageTranslator from './LanguageTranslator';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const commonNavItems = [
    { title: 'Home', href: '/' },
    { title: 'Symptom Analyzer', href: '/analyzer' },
    { title: 'Medical Store', href: '/store' },
    { title: 'Find Doctors', href: '/doctors' },
    { title: 'Services', href: '/services' },
    { title: 'Insurance', href: '/insurance' },
  ];

  const loggedInNavItems = [
    { title: 'My Profile', href: '/profile', icon: User },
    { title: 'Settings', href: '/settings', icon: Settings },
    { title: 'Logout', onClick: handleLogout, icon: LogOut },
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
            {commonNavItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {item.title}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <LanguageTranslator />
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {loggedInNavItems.map((item) => (
                    item.onClick ? (
                      <Button
                        key={item.title}
                        onClick={item.onClick}
                        variant="ghost"
                        className="flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Button>
                    ) : (
                      <Link key={item.title} to={item.href}>
                        <Button variant="ghost" className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </Button>
                      </Link>
                    )
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/register">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                  <Link to="/login">
                    <Button className="bg-[#9b87f5] hover:bg-[#8b77e5]">Log In</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageTranslator />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {commonNavItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  
                  {isLoggedIn ? (
                    <>
                      {loggedInNavItems.map((item) => (
                        item.onClick ? (
                          <Button
                            key={item.title}
                            onClick={item.onClick}
                            variant="ghost"
                            className="flex items-center justify-start gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </Button>
                        ) : (
                          <Link key={item.title} to={item.href}>
                            <Button variant="ghost" className="flex items-center justify-start gap-2 w-full">
                              <item.icon className="h-4 w-4" />
                              {item.title}
                            </Button>
                          </Link>
                        )
                      ))}
                    </>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button variant="outline" className="w-full">Sign Up</Button>
                      </Link>
                      <Link to="/login">
                        <Button className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]">Log In</Button>
                      </Link>
                    </>
                  )}
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
