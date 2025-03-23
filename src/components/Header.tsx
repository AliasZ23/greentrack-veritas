
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  hideNav?: boolean;
}

const Header = ({ hideNav = false }: HeaderProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">SV</span>
          </div>
          <Link to="/" className="text-xl font-bold">SupplyVerify</Link>
        </div>

        {!hideNav && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/verification" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/verification') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Verifications
            </Link>
            <Link 
              to="/admin" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/admin') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Admin
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {!hideNav && (
            <div className="hidden md:block">
              <Link 
                to="/admin"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                Admin Portal
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
