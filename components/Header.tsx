import { useState, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Icon } from './Icons';

const Header: FC = () => {
  const location = useLocation();
  const { role, setRole, isEmployee } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600';
  };

  const roles: UserRole[] = ['user', 'employee', 'admin'];
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Icon name="home" className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">BILIMGER</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>Главная</Link>
          <Link to="/map" className={`text-sm font-medium transition-colors ${isActive('/map')}`}>Карта</Link>
          <Link to="/compare" className={`text-sm font-medium transition-colors ${isActive('/compare')}`}>Сравнение</Link>
          <Link to="/calculator" className={`text-sm font-medium transition-colors ${isActive('/calculator')}`}>Калькулятор</Link>
          <Link to="/chat" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/chat')}`}>
            <Icon name="chat" className="h-4 w-4" />
            AI Чат
          </Link>
          {isEmployee && (
            <Link to="/admin" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/admin')}`}>
              <Icon name="shield" className="h-4 w-4" />
              Админ
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
            {/* Role Switcher (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg bg-gray-100 p-1">
                {roles.map((r) => (
                    <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${role === r ? 'bg-white shadow text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {r.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600" onClick={toggleMenu}>
              <Icon name={isMobileMenuOpen ? "x" : "menu"} className="h-6 w-6" />
            </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-gray-200 bg-white px-4 py-6 shadow-xl md:hidden">
          <nav className="flex flex-col space-y-4">
             <Link to="/" onClick={closeMenu} className={`text-base font-medium ${isActive('/')}`}>Главная</Link>
             <Link to="/map" onClick={closeMenu} className={`text-base font-medium ${isActive('/map')}`}>Карта Вузов</Link>
             <Link to="/compare" onClick={closeMenu} className={`text-base font-medium ${isActive('/compare')}`}>Сравнение</Link>
             <Link to="/calculator" onClick={closeMenu} className={`text-base font-medium ${isActive('/calculator')}`}>Калькулятор</Link>
             <Link to="/chat" onClick={closeMenu} className={`flex items-center gap-2 text-base font-medium ${isActive('/chat')}`}>
               <Icon name="chat" className="h-5 w-5" /> AI Чат
             </Link>
             {isEmployee && (
                <Link to="/admin" onClick={closeMenu} className={`flex items-center gap-2 text-base font-medium ${isActive('/admin')}`}>
                  <Icon name="shield" className="h-5 w-5" /> Админ
                </Link>
             )}
             
             <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Роль (Тест)</p>
                <div className="flex gap-2">
                   {roles.map((r) => (
                    <button key={r} onClick={() => setRole(r)} className={`px-3 py-2 text-xs font-bold rounded-lg border ${role === r ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-50 text-slate-600 border-gray-200'}`}>
                        {r}
                    </button>
                  ))}
                </div>
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;