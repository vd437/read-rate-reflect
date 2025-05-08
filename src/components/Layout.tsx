
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-book-light">
      <header className="bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="container flex justify-between items-center">
          <Link 
            to="/" 
            className="text-book-purple text-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <BookOpen size={24} />
            My Reading Tracker
          </Link>
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/books" current={location.pathname.startsWith("/books")}>My Books</NavLink>
            <NavLink to="/stats" current={location.pathname === "/stats"}>Statistics</NavLink>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container my-6 animate-fade-in">
        {children}
      </main>
      
      <footer className="py-4 border-t border-gray-200 bg-white">
        <div className="container text-center text-sm text-gray-500">
          &copy; 2025 My Reading Tracker — Your personal book journal
        </div>
      </footer>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <MobileNavLink to="/" current={location.pathname === "/"} icon={<Home size={20} />} label="Home" />
          <MobileNavLink to="/books" current={location.pathname.startsWith("/books")} icon={<BookOpen size={20} />} label="Books" />
          <MobileNavLink to="/stats" current={location.pathname === "/stats"} icon={<BarChart2 size={20} />} label="Stats" />
        </div>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  current: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, current }) => (
  <Link
    to={to}
    className={cn(
      "font-medium px-3 py-2 rounded-md transition-colors",
      current
        ? "text-book-purple bg-book-light"
        : "text-gray-600 hover:text-book-purple hover:bg-gray-100"
    )}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  current: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label, current }) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center p-1 rounded-md transition-colors",
      current
        ? "text-book-purple"
        : "text-gray-500 hover:text-book-purple"
    )}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default Layout;
