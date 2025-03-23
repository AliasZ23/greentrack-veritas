
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-border/40 bg-background/80 backdrop-blur-md z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <button className="md:hidden rounded-sm p-1.5 text-muted-foreground hover:bg-accent">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            EcoVerify<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle className="mr-2" />
          <button className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-accent">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Notifications</span>
          </button>
          <button className="rounded-full overflow-hidden border-2 border-border w-8 h-8">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
