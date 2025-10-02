import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, ShoppingCart, Heart, User } from 'lucide-react';
import { useTheme } from '@shared/lib/hooks/useTheme';
import { useI18n } from '@shared/lib/hooks/useI18n';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  const handleLocaleToggle = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="font-semibold text-lg text-text hidden sm:block">
              Creative Cluster
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-secondary hover:text-text transition-colors">
              {t.nav.home}
            </Link>
            <Link to="/yoga" className="text-text-secondary hover:text-text transition-colors">
              {t.nav.yoga}
            </Link>
            <Link to="/tea" className="text-text-secondary hover:text-text transition-colors">
              {t.nav.tea}
            </Link>
            <Link to="/book-club" className="text-text-secondary hover:text-text transition-colors">
              {t.nav.bookClub}
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-text"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={handleLocaleToggle}
              className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-text"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>

            <button className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-text relative hidden sm:block">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <button className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-text relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <button className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-text hidden sm:block">
              <User size={20} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-surface transition-colors md:hidden text-text"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg hover:bg-surface text-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/yoga"
                className="px-3 py-2 rounded-lg hover:bg-surface text-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.yoga}
              </Link>
              <Link
                to="/tea"
                className="px-3 py-2 rounded-lg hover:bg-surface text-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.tea}
              </Link>
              <Link
                to="/book-club"
                className="px-3 py-2 rounded-lg hover:bg-surface text-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.bookClub}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};