import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

const floatingEmojis = ['✈️', '🏝️', '🎒', '🌴', '🗺️', '📸'];

export default function TravelAgency({ onShowModal }) {
  const floatingRef = useRef();
  const navigate = useNavigate();

  // Floating emojis animation
  useEffect(() => {
    function createFloatingElement() {
      if (!floatingRef.current) return;
      const element = document.createElement('div');
      element.className = 'absolute opacity-20 pointer-events-none select-none animate-float';
      element.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
      element.style.left = Math.random() * 90 + '%';
      element.style.top = '100%';
      element.style.fontSize = (Math.random() * 24 + 18) + 'px';
      element.style.animationDelay = Math.random() * 10 + 's';
      floatingRef.current.appendChild(element);
      setTimeout(() => element.remove(), 15000);
    }
    const interval = setInterval(createFloatingElement, 3000);
    // Initial floating elements
    for (let i = 0; i < 5; i++) setTimeout(createFloatingElement, i * 1000);
    return () => clearInterval(interval);
  }, []);

  // Custom keyframes for floating
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        from { transform: translateY(0) rotate(0deg); opacity: 0.2; }
        10% { opacity: 0.5; }
        90% { opacity: 0.5; }
        to { transform: translateY(-110vh) rotate(360deg); opacity: 0.2; }
      }
      .animate-float { animation: float 15s linear forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Imagen de fondo con overlay */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Paisaje de viajes"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/70 via-purple-800/60 to-blue-900/60" />
      </div>
      {/* Emojis flotantes */}
      <div ref={floatingRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Hero Section (HEADER) */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pt-24 pb-16">
        {/* Fondo con imagen y overlay oscuro */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={require('./assets/familia-joven-disfrutando-de-su-viaje.jpg')}
            alt="Familia joven disfrutando de su viaje"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 animate-fadein">Wanderlust Travels</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadein delay-200">Descubre el mundo con nosotros. Experiencias únicas, recuerdos inolvidables.</p>
          <a href="#contact" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all animate-fadein delay-400">¡Planea tu Aventura!</a>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 relative">Nuestros Servicios
            <span className="block w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all border border-gray-100">
              <div className="text-4xl mb-2">✈️</div>
              <h3 className="font-bold text-xl mb-2">Vuelos</h3>
              <p>Las mejores tarifas aéreas a destinos nacionales e internacionales. Comparamos precios para ofrecerte las opciones más convenientes.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all border border-gray-100">
              <div className="text-4xl mb-2">🏨</div>
              <h3 className="font-bold text-xl mb-2">Hoteles</h3>
              <p>Selección exclusiva de hoteles desde económicos hasta luxury. Reservas garantizadas con las mejores ubicaciones.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all border border-gray-100">
              <div className="text-4xl mb-2">🎒</div>
              <h3 className="font-bold text-xl mb-2">Paquetes</h3>
              <p>Experiencias completas diseñadas para cada tipo de viajero. Todo incluido para que solo te preocupes por disfrutar.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all border border-gray-100">
              <div className="text-4xl mb-2">🚗</div>
              <h3 className="font-bold text-xl mb-2">Transporte</h3>
              <p>Alquiler de vehículos, transfers y excursiones. Movilidad segura y cómoda en todos tus destinos.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all border border-gray-100">
              <div className="text-4xl mb-2">🗺️</div>
              <h3 className="font-bold text-xl mb-2">Tours Guiados</h3>
              <p>Exploraciones con guías expertos locales. Descubre la historia, cultura y secretos de cada lugar.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all border border-gray-100">
              <div className="text-4xl mb-2">💼</div>
              <h3 className="font-bold text-xl mb-2">Viajes Corporativos</h3>
              <p>Soluciones integrales para empresas. Gestión completa de viajes de negocios y eventos corporativos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinos */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 relative">Destinos Populares
            <span className="block w-16 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
              <img src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSZlVFbnBZOqpI8dVq6iOEVf8JII0guwRNbmkC6KDFBVfQffUaz_O8xvRCgiV6RAwGWARZfRi4zORws7Pe27ppRCzQ3dzMy4zLlwAMwAL4" alt="Cusco, Perú" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Cusco, Perú</h3>
                <p className="text-sm">Descubre la majestuosa ciudadela inca y la rica cultura andina. Incluye Valle Sagrado y experiencias gastronómicas únicas.</p>
                <p className="font-bold mt-2">Desde $850 USD</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
              <img src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSqexb6L7fJwXnbFD4WmE6Ocd_u4NQpBhRylGXL3CViaGyZxaP9ZL9SYARpICteDZdvrqMfsxcgR8NAuxR6_Lxo_g-JtCPpwVk3TI6iiQ" alt="París, Francia" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">París, Francia</h3>
                <p className="text-sm">Romanticismo y cultura en la capital francesa. Torre Eiffel, Louvre, y paseos por el Sena incluidos.</p>
                <p className="font-bold mt-2">Desde $1,200 USD</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
              <img src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSCUrhKRNYNBwcsNwu6IY9Xtkuu-U1o2H7GnskNGDaKKJdiuKbS22WShPyB24-s2QrBsc4NerRUs2ZO13wudUv-JAQoo9G0ughcUUTj5w" alt="Bali, Indonesia" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Bali, Indonesia</h3>
                <p className="text-sm">Playas paradisíacas, templos sagrados y cultura balinesa auténtica. Perfecto para relajación y aventura.</p>
                <p className="font-bold mt-2">Desde $950 USD</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
              <img src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqXPvMIWc7_kcKuqfa1hhkZfAF4HWS8aqz3QW74gGPAGCKj1pf85gMSyBIDb74i7-AhYLrY2MkbwKOa5igGq-cpSriZn_As88UZcRJ6JTLoqIgVLZAp0xI0HSxn4e754EiYwbcuZg=w675-h390-n-k-no" alt="Tokio, Japón" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Tokio, Japón</h3>
                <p className="text-sm">Experiencia única entre rascacielos futuristas y templos milenarios. Gastronomía y tecnología de vanguardia.</p>
                <p className="font-bold mt-2">Desde $1,400 USD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-20 bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900 text-white text-center" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
          <p className="text-lg mb-10">¿Listo para tu próxima aventura? Nuestros expertos en viajes están aquí para ayudarte.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-md hover:scale-105 transition-all">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-bold mb-1">Teléfono</h3>
              <p>+51 1 234-5678</p>
              <p className="text-xs text-white/70">Lun - Vie: 9:00 - 18:00</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-md hover:scale-105 transition-all">
              <div className="text-3xl mb-2">✉️</div>
              <h3 className="font-bold mb-1">Email</h3>
              <p>info@wanderlust.com</p>
              <p className="text-xs text-white/70">Respuesta en 24 horas</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-md hover:scale-105 transition-all">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-bold mb-1">Oficina</h3>
              <p>Av. Larco 1234</p>
              <p>Miraflores, Lima - Perú</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-md hover:scale-105 transition-all">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-bold mb-1">WhatsApp</h3>
              <p>+51 987 654 321</p>
              <p className="text-xs text-white/70">Consultas inmediatas</p>
            </div>
          </div>
          <a href="#" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all">Solicitar Cotización Gratuita</a>
        </div>
      </section>
      <Footer />
    </div>
  );
} 