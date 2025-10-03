import { Link } from 'react-router-dom';
import { useI18n } from '@shared/lib/hooks/useI18n';

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="font-semibold text-text">{t.footer.brand}</span>
            </div>
            <p className="text-sm text-text-secondary">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link to="/yoga" className="hover:text-text transition-colors">
                  {t.nav.yoga}
                </Link>
              </li>
              <li>
                <Link to="/tea" className="hover:text-text transition-colors">
                  {t.nav.tea}
                </Link>
              </li>
              <li>
                <Link to="/book-club" className="hover:text-text transition-colors">
                  {t.nav.bookClub}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">{t.footer.contacts}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Samara, Russia</li>
              <li>info@creativecluster.ru</li>
              <li>+7 (XXX) XXX-XX-XX</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text mb-4">{t.footer.social}</h4>
            <div className="flex space-x-3">
              {['IG', 'VK', 'TG'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-surface-hover rounded-lg flex items-center justify-center text-text-secondary hover:text-text hover:bg-primary/10 transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-text-secondary">
          <p>© 2025 Creative Cluster. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
