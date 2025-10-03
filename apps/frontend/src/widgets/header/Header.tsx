import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, ShoppingCart, Heart, User, LogOut } from 'lucide-react';
import { useTheme } from '@shared/lib/hooks/useTheme';
import { useI18n } from '@shared/lib/hooks/useI18n';
import { useUserStore } from '@entities/user/model/user.store';
import { authApi } from '@shared/api/auth.api';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const { isAuthenticated, user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLocaleToggle = () => {
    setLocale(locale === 'ru' ? 'en' : 'ru');
  };

  const handleSignOut = async () => {
    try {
      await authApi.signOut();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearUser();
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
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

            {isAuthenticated && user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-lg py-2">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text">{user.username}</p>
                      <p className="text-xs text-text-secondary truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-text hover:bg-surface-hover"
                    >
                      <User size={16} className="mr-3" />
                      Профиль
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-2 text-sm text-text hover:bg-surface-hover"
                    >
                      <LogOut size={16} className="mr-3" />
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/sign-in"
                className="hidden sm:flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors text-sm"
              >
                Войти
              </Link>
            )}

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

              {isAuthenticated && user ? (
                <>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="px-3 py-2 text-sm font-medium text-text">{user.username}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-lg hover:bg-surface text-text flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Профиль
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg hover:bg-surface text-text flex items-center w-full text-left"
                  >
                    <LogOut size={16} className="mr-2" />
                    Выйти
                  </button>
                </>
              ) : (
                <div className="border-t border-border pt-3 mt-3">
                  <Link
                    to="/auth/sign-in"
                    className="block w-full px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Войти
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};
