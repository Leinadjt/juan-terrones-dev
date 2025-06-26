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
import PolleriaJT from './components/PolleriaJT';
import LubricanteJT from './components/LubricanteJT';
import LogisticaJT from './components/LogisticaJT';
import PolleriaPlanBasico from './components/PolleriaPlanBasico';
import PolleriaPlanPro from './components/PolleriaPlanPro';
import PolleriaPlanAnual from './components/PolleriaPlanAnual';
import LubricantePlanBasico from './components/LubricantePlanBasico';
import LubricantePlanPro from './components/LubricantePlanPro';
import LubricantePlanAnual from './components/LubricantePlanAnual';
import LogisticaPlanBasico from './components/LogisticaPlanBasico';
import LogisticaPlanProfesional from './components/LogisticaPlanProfesional';
import LogisticaPlanCorporativo from './components/LogisticaPlanCorporativo';

function App() {
  return (
    <Router>
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
          <Route path="/gestor-polleria" element={<PolleriaJT />} />
          <Route path="/gestor-lubricantes" element={<LubricanteJT />} />
          <Route path="/gestor-logistica" element={<LogisticaJT />} />
          <Route path="/polleria/basico" element={<PolleriaPlanBasico />} />
          <Route path="/polleria/pro" element={<PolleriaPlanPro />} />
          <Route path="/polleria/anual" element={<PolleriaPlanAnual />} />
          <Route path="/lubricante/basico" element={<LubricantePlanBasico />} />
          <Route path="/lubricante/pro" element={<LubricantePlanPro />} />
          <Route path="/lubricante/anual" element={<LubricantePlanAnual />} />
          <Route path="/logistica/basico" element={<LogisticaPlanBasico />} />
          <Route path="/logistica/profesional" element={<LogisticaPlanProfesional />} />
          <Route path="/logistica/corporativo" element={<LogisticaPlanCorporativo />} />
          <Route path="/juan-terrones-dev" element={<WebsiteStructureBuilder />} />
        </Routes>
      </main>
      <Footer />
      {/* Botón flotante de WhatsApp con animación de rebote tipo agua */}
      <style>{`
        @keyframes bounce-water {
          0%, 100% { transform: translateY(0) scale(1); }
          10% { transform: translateY(-8px) scale(1.05, 0.95); }
          20% { transform: translateY(-14px) scale(0.98, 1.02); }
          30% { transform: translateY(-10px) scale(1.04, 0.96); }
          40% { transform: translateY(-6px) scale(0.98, 1.02); }
          50% { transform: translateY(-2px) scale(1.02, 0.98); }
          60% { transform: translateY(0) scale(1, 1); }
        }
        .whatsapp-bounce-water {
          animation: bounce-water 2.2s cubic-bezier(.22,1.61,.36,1) infinite;
        }
      `}</style>
      <a
        href="https://wa.me/51977517628"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-0 flex items-center justify-center w-14 h-14 transition-all duration-300 whatsapp-bounce-water"
        title="Contáctanos por WhatsApp"
        style={{ boxShadow: '0 4px 24px 0 rgba(37, 211, 102, 0.3)' }}
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="19" cy="19" r="19" fill="#25D366"/>
          <path d="M28.1 23.2c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.5-.2-.7.2-.2.4-.7 1.2-.9 1.4-.2.2-.3.3-.7.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7 0-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.9 2.3 1 2.5.1.2 1.7 2.7 4.1 3.7 1.4.6 2 .7 2.7.6.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1.1z" fill="#fff"/>
          <path d="M19 7C12.373 7 7 12.373 7 19c0 2.385.832 4.584 2.236 6.354L7 31l5.793-2.236C14.416 30.168 16.615 31 19 31c6.627 0 12-5.373 12-12S25.627 7 19 7zm0 22c-2.09 0-4.062-.646-5.7-1.75l-.406-.27-3.43 1.324 1.324-3.43-.27-.406C8.646 23.062 8 21.09 8 19c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm5.29-6.71c-.27-.135-1.59-.785-1.835-.875-.245-.09-.425-.135-.605.135-.18.27-.695.875-.85 1.055-.155.18-.31.2-.575.07-.265-.13-1.12-.415-2.13-1.32-.79-.705-1.325-1.575-1.48-1.84-.155-.265-.017-.41.115-.54.12-.12.265-.31.4-.465.135-.155.18-.27.27-.45.09-.18.045-.34-.022-.475-.067-.135-.605-1.46-.83-2.005-.22-.53-.445-.46-.605-.47-.155-.01-.34-.012-.525-.012-.18 0-.47.067-.72.335-.25.27-.95.93-.95 2.265 0 1.335.975 2.625 1.11 2.805.135.18 1.92 2.94 4.665 4.005.65.28 1.155.45 1.55.575.65.205 1.24.175 1.705.105.52-.08 1.59-.65 1.815-1.28.225-.63.225-1.17.155-1.28-.07-.11-.25-.18-.52-.315z" fill="#fff"/>
        </svg>
      </a>
    </Router>
  );
}

export default App;
