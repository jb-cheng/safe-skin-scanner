
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled 
          ? 'glass shadow-soft backdrop-blur-md' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-primary text-2xl">Label</span>
          <span className="text-2xl">Lens</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" current={location.pathname}>
            Home
          </NavLink>
          <NavLink to="/profile" current={location.pathname}>
            Profile
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link
            to="/profile"
            className={cn(
              "rounded-full p-2 transition-all",
              isScrolled ? "hover:bg-gray-100/80 dark:hover:bg-gray-800/80" : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
            )}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-foreground"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  current: string;
  children: React.ReactNode;
}

function NavLink({ to, current, children }: NavLinkProps) {
  const isActive = current === to || (to !== '/' && current.startsWith(to));
  
  return (
    <Link
      to={to}
      className={cn(
        "relative text-sm font-medium py-1 px-1 transition-colors",
        isActive 
          ? "text-primary" 
          : "text-foreground/90 hover:text-primary"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded animate-fade-in" />
      )}
    </Link>
  );
}

export default Header;
