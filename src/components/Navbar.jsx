
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="py-4 px-6 border-b border-border/30 w-full">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span className="text-primary">Label</span>
            <span>Lens</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Search
            </Link>
            <Link to="/scan" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Scan
            </Link>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
