
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../group/ui/button';
import { MessageSquare, Package, Image, BookOpen, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useIsMobile } from '../hooks/use-mobile';

const navItems = [
  { name: 'Chat', path: '/chat', icon: <MessageSquare className="h-5 w-5" /> },
  { name: 'Projects', path: '/projects', icon: <Package className="h-5 w-5" /> },
  { name: 'Showcase', path: '/showcase', icon: <Image className="h-5 w-5" /> },
  { name: 'Learn', path: '/learn', icon: <BookOpen className="h-5 w-5" /> },
];

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "glass-panel border-b backdrop-blur-lg bg-background/70" 
          : "bg-transparent"
      )}
    >
      <div className="container max-w-screen-xl mx-auto h-16 flex items-center justify-between px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-medium text-xl tracking-tight"
        >
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded flex items-center justify-center font-bold select-none">
            C
          </span>
          <span className="animate-fade-in">Collab</span>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute top-16 left-0 w-full bg-background border-b border-border animate-fade-in">
                <nav className="container mx-auto py-4 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                        location.pathname === item.path
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
