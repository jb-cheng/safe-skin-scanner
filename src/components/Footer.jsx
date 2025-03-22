
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 border-t border-border/30 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="text-lg font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <span className="text-primary">Label</span>
              <span>Lens</span>
            </Link>
            <span className="text-muted-foreground text-sm">
              &copy; {currentYear} All rights reserved
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
