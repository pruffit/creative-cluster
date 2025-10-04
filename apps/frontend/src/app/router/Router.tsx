import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { HomePage } from '@pages/home';
import { YogaPage } from '@pages/yoga';
import { TeaPage } from '@pages/tea';
import { BookClubPage } from '@pages/book-club';
import { SignInPage, SignUpPage } from '@pages/auth';
import { ProfilePage } from '@pages/profile';
import { AdminPage } from '@pages/admin';
import { NotFoundPage } from '@pages/not-found';
import { ProtectedRoute } from './ProtectedRoute';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />

        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-background flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/yoga" element={<YogaPage />} />
                  <Route path="/tea" element={<TeaPage />} />
                  <Route path="/book-club" element={<BookClubPage />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requiredRole={['ADMIN']}>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
