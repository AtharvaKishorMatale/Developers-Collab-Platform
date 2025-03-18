
import React from 'react';
import Navigation from '../group/Navigation';
import { cn } from '../lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const MainLayout = ({ children, className, fullWidth = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out", 
          fullWidth ? "w-full" : "page-container",
          className
        )}
      >
        {children}
      </main>
      <footer className="py-6 px-4 border-t border-border/30 backdrop-blur-xs">
        <div className="container max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Collab Space. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
