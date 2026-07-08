import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ArtisanList from './components/artisan/ArtisanList';
import ArtisanDetail from './components/artisan/ArtisanDetail';
import NotFound from './pages/NotFound';
import './styles/main.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artisans" element={<ArtisanList />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="/mentions-legales" element={<NotFound />} />
        <Route path="/donnees-personnelles" element={<NotFound />} />
        <Route path="/accessibilite" element={<NotFound />} />
        <Route path="/cookies" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;