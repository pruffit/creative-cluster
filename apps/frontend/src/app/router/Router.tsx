import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { HomePage } from '@pages/home';
import { YogaPage } from '@pages/yoga';
import { TeaPage } from '@pages/tea';
import { BookClubPage } from '@pages/book-club';

export const Router = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/yoga" element={<YogaPage />} />
            <Route path="/tea" element={<TeaPage />} />
            <Route path="/book-club" element={<BookClubPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};