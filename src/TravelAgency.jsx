import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const floatingEmojis = ['✈️', '🏝️', '🎒', '🌴', '🗺️', '📸'];

export default function TravelAgency() {
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
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] text-center px-4 py-20 text-white">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={require('./assets/familia-joven-disfrutando-de-su-viaje.jpg')}
            alt="Familia de viaje"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg mb-4">Wanderlust Travels</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">Descubre el mundo con nosotros. Experiencias únicas, recuerdos inolvidables.</p>
          <a href="#contact" className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg shadow-xl hover:scale-105 transform transition-transform duration-300">
            ¡Planea tu Aventura!
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* Servicios */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Cards */}
              <div className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">✈️</div>
                <h3 className="font-bold text-xl mb-2">Vuelos</h3>
                <p className="text-gray-600">Las mejores tarifas aéreas a destinos nacionales e internacionales.</p>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">🏨</div>
                <h3 className="font-bold text-xl mb-2">Hoteles</h3>
                <p className="text-gray-600">Selección exclusiva de hoteles desde económicos hasta luxury.</p>
              </div>
              <div className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">🎒</div>
                <h3 className="font-bold text-xl mb-2">Paquetes</h3>
                <p className="text-gray-600">Experiencias completas diseñadas para cada tipo de viajero.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destinos */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Destinos Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSZlVFbnBZOqpI8dVq6iOEVf8JII0guwRNbmkC6KDFBVfQffUaz_O8xvRCgiV6RAwGWARZfRi4zORws7Pe27ppRCzQ3dzMy4zLlwAMwAL4', title: 'Cusco, Perú' },
                { img: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSqexb6L7fJwXnbFD4WmE6Ocd_u4NQpBhRylGXL3CViaGyZxaP9ZL9SYARpICteDZdvrqMfsxcgR8NAuxR6_Lxo_g-JtCPpwVk3TI6iiQ', title: 'París, Francia' },
                { img: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSCUrhKRNYNBwcsNwu6IY9Xtkuu-U1o2H7GnskNGDaKKJdiuKbS22WShPyB24-s2QrBsc4NerRUs2ZO13wudUv-JAQoo9G0ughcUUTj5w', title: 'Bali, Indonesia' },
                { img: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqXPvMIWc7_kcKuqfa1hhkZfAF4HWS8aqz3QW74gGPAGCKj1pf85gMSyBIDb74i7-AhYLrY2MkbwKOa5igGq-cpSriZn_As88UZcRJ6JTLoqIgVLZAp0xI0HSxn4e754EiYwbcuZg=w675-h390-n-k-no', title: 'Tokio, Japón' },
              ].map(dest => (
                <div key={dest.title} className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer h-96">
                  <img src={dest.img} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{dest.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="py-20 bg-blue-800 text-white text-center" id="contact">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">¿Listo para tu próxima aventura?</h2>
            <p className="text-lg mb-8">Nuestros expertos en viajes están aquí para ayudarte a planificar el viaje de tus sueños.</p>
            <a href="#" className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg shadow-xl hover:scale-105 transform transition-transform duration-300">
              Solicitar Cotización Gratuita
            </a>
          </div>
        </section>
      </main>
    </div>
  );
} 