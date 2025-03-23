
import React, { useState, useEffect } from 'react';
import { Leaf, Bell, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled 
        ? 'glass backdrop-blur-md py-2 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm' 
        : 'bg-transparent py-4',
      className
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-eco-green-600 mr-2" />
              <span className="font-semibold text-xl">GreenTrack</span>
            </div>
            
            <nav className="hidden md:flex space-x-6 ml-10">
              <a 
                href="#" 
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Suppliers
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Verification
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Analytics
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Reports
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-px h-6 bg-border mx-2"></div>
            <div className="h-8 w-8 rounded-full bg-ocean-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-ocean-blue-800">JD</span>
            </div>
          </div>
          
          <button 
            onClick={toggleMenu}
            className="p-2 md:hidden rounded-lg hover:bg-secondary transition-colors"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
              >
                Dashboard
              </a>
              <a 
                href="#" 
                className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Suppliers
              </a>
              <a 
                href="#" 
                className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Verification
              </a>
              <a 
                href="#" 
                className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </a>
              <a 
                href="#" 
                className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Reports
              </a>
            </nav>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-ocean-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-ocean-blue-800">JD</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
