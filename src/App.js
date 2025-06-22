import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WebsiteStructureBuilder from './WebsiteStructureBuilder';
import TransportCompany from './TransportCompany';
import TravelAgency from './TravelAgency';
import ArtistSocials from './ArtistSocials';
import GestorJT from './components/GestorJT';
import RestauranteJT from './components/RestauranteJT';
import TiendaOnlineJT from './components/TiendaOnlineJT';
import ReservasJT from './components/ReservasJT';
import BasicoPlan from './components/BasicoPlan';
import ProfesionalPlan from './components/ProfesionalPlan';
import EmpresarialPlan from './components/EmpresarialPlan';
import RegistroCliente from './components/RegistroCliente';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router basename="/juan-terrones-dev">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<WebsiteStructureBuilder />} />
          <Route path="/transporte" element={<TransportCompany />} />
          <Route path="/viajes" element={<TravelAgency />} />
          <Route path="/redes" element={<ArtistSocials />} />
          <Route path="/reservas" element={<ReservasJT />} />
          <Route path="/restaurante" element={<RestauranteJT />} />
          <Route path="/tienda" element={<TiendaOnlineJT />} />
          <Route path="/gestor" element={<GestorJT />} />
          <Route path="/restaurante-jt" element={<RestauranteJT />} />
          <Route path="/tienda-online-jt" element={<TiendaOnlineJT />} />
          <Route path="/reservas-jt" element={<ReservasJT />} />
          <Route path="/gestor-jt/basico" element={<BasicoPlan />} />
          <Route path="/gestor-jt/profesional" element={<ProfesionalPlan />} />
          <Route path="/gestor-jt/empresarial" element={<EmpresarialPlan />} />
          <Route path="/registro-cliente" element={<RegistroCliente />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
