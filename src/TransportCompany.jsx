import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const floatingShapes = [
  'bg-orange-400/30',
  'bg-blue-700/30',
  'bg-yellow-400/30',
  'bg-cyan-400/30',
];

const statsData = [
  { value: 500, label: 'Clientes Satisfechos', suffix: '+' },
  { value: 25, label: 'Ciudades Cubiertas' },
  { value: 99.8, label: 'Entregas Exitosas', suffix: '%' },
  { value: 15, label: 'Años de Experiencia' },
];

export default function TransportCompany() {
  const navigate = useNavigate();
  const floatingRef = useRef();
  const statsRef = useRef();
  const [stats, setStats] = useState(statsData.map(s => 0));
  const [formSent, setFormSent] = useState(false);

  // Floating shapes animation
  useEffect(() => {
    function createFloatingShape() {
      if (!floatingRef.current) return;
      const el = document.createElement('div');
      el.className = `absolute rounded-full pointer-events-none select-none animate-float`;
      el.classList.add(floatingShapes[Math.floor(Math.random() * floatingShapes.length)]);
      el.style.left = Math.random() * 90 + '%';
      el.style.top = '100%';
      el.style.width = el.style.height = (Math.random() * 60 + 40) + 'px';
      el.style.animationDelay = Math.random() * 8 + 's';
      floatingRef.current.appendChild(el);
      setTimeout(() => el.remove(), 12000);
    }
    const interval = setInterval(createFloatingShape, 2500);
    for (let i = 0; i < 3; i++) setTimeout(createFloatingShape, i * 1000);
    return () => clearInterval(interval);
  }, []);

  // Custom keyframes for floating
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: 0.3; }
        10% { opacity: 0.7; }
        90% { opacity: 0.7; }
        100% { transform: translateY(-110vh) scale(1.2); opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Stats animation
  useEffect(() => {
    function animateStats() {
      statsData.forEach((stat, i) => {
        let current = 0;
        const increment = stat.value / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setStats(prev => {
            const copy = [...prev];
            copy[i] = stat.suffix === '%' ? current.toFixed(1) : Math.floor(current);
            return copy;
          });
        }, 20);
      });
    }
    // Trigger when stats section is visible
    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  }

  return (
    <div className="w-full  ...">
      {/* Floating shapes */}
      <div ref={floatingRef} className="fixed inset-0 pointer-events-none z-10" />
      {/* Header */}
      <header className="fixed w-full top-0 z-30 bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 shadow-xl">
      </header>
      {/* Hero Section */}
      <section id="inicio" className="relative flex items-center justify-center min-h-screen text-center text-white" style={{backgroundImage: `linear-gradient(rgba(20,20,60,0.7),rgba(255,110,64,0.5)),url('https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-700/60 to-orange-500/60" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadein">Transporte de Carga Confiable</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadein delay-200">Especialistas en pallets, contenedores y carga suelta por todo el Perú</p>
          <a href="#contacto" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all animate-fadein delay-400">Solicitar Cotización</a>
        </div>
      </section>
      {/* Servicios */}
      <section id="servicios" className="py-24 bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12 relative">Nuestros Servicios
            <span className="block w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all border-2 border-orange-100">
              <div className="text-5xl mb-2">📦</div>
              <h3 className="font-bold text-2xl mb-2 text-blue-900">Transporte de Pallets</h3>
              <p>Manejo especializado de pallets con equipos modernos y personal capacitado para garantizar la integridad de tu mercancía.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all border-2 border-orange-100">
              <div className="text-5xl mb-2">🚛</div>
              <h3 className="font-bold text-2xl mb-2 text-blue-900">Contenedores</h3>
              <p>Transporte de contenedores de 20 y 40 pies con seguimiento GPS y entrega puntual a nivel nacional.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all border-2 border-orange-100">
              <div className="text-5xl mb-2">📋</div>
              <h3 className="font-bold text-2xl mb-2 text-blue-900">Carga Suelta</h3>
              <p>Soluciones flexibles para carga suelta con embalaje profesional y manejo cuidadoso de cada producto.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all border-2 border-orange-100">
              <div className="text-5xl mb-2">🌐</div>
              <h3 className="font-bold text-2xl mb-2 text-blue-900">Logística Integral</h3>
              <p>Gestión completa de la cadena de suministro desde el origen hasta el destino final.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all border-2 border-orange-100">
              <div className="text-5xl mb-2">📍</div>
              <h3 className="font-bold text-2xl mb-2 text-blue-900">Seguimiento GPS</h3>
              <p>Monitoreo en tiempo real de tu carga con tecnología GPS avanzada y reportes constantes.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-all border-2 border-orange-100">
              <div className="text-5xl mb-2">🔒</div>
              <h3 className="font-bold text-2xl mb-2 text-blue-900">Seguro de Carga</h3>
              <p>Protección completa de tu mercancía con seguros especializados y cobertura total.</p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-blue-900">Sobre TransCarga Perú</h2>
              <p className="text-lg mb-4 text-gray-700">Con más de 15 años de experiencia en el sector logístico, somos líderes en transporte de carga en el Perú. Nuestra flota moderna y equipo especializado garantizan la entrega segura y puntual de tu mercancía.</p>
              <p className="text-lg mb-4 text-gray-700">Operamos desde Lima hacia todas las regiones del país, ofreciendo soluciones personalizadas para cada tipo de carga. Nuestro compromiso es brindar un servicio de excelencia que supere las expectativas de nuestros clientes.</p>
              <p className="text-lg mb-4 text-gray-700">Contamos con certificaciones internacionales de calidad y un equipo de profesionales altamente capacitados en logística y transporte especializado.</p>
            </div>
            <div className="rounded-2xl overflow-hidden h-96 shadow-xl border-2 border-orange-200">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sobre nosotros" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section ref={statsRef} className="bg-gradient-to-r from-blue-900 via-blue-700 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {statsData.map((stat, i) => (
              <div key={stat.label} className="stat-item">
                <h3 className="text-5xl font-extrabold text-yellow-300 mb-2">{stats[i]}{stat.suffix || ''}</h3>
                <p className="text-lg font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12 relative">Contáctanos
            <span className="block w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">Información de Contacto</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-2xl mr-4">📍</div>
                <div>
                  <h4 className="font-bold">Dirección</h4>
                  <p>Av. Argentina 2750, Callao, Lima - Perú</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-2xl mr-4">📞</div>
                <div>
                  <h4 className="font-bold">Teléfono</h4>
                  <p>+51 977517628</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-2xl mr-4">✉️</div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p>juanterrones189@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white text-2xl mr-4">🕒</div>
                <div>
                  <h4 className="font-bold">Horario</h4>
                  <p>Lun - Vie: 8:00 AM - 6:00 PM<br />Sáb: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-100">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">Solicitar Cotización</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Nombre Completo</label>
                  <input type="text" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-700" required />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Empresa</label>
                  <input type="text" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-700" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Email</label>
                  <input type="email" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-700" required />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Teléfono</label>
                  <input type="tel" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-700" required />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Tipo de Servicio</label>
                  <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-700">
                    <option>Transporte de Pallets</option>
                    <option>Contenedores</option>
                    <option>Carga Suelta</option>
                    <option>Logística Integral</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Mensaje</label>
                  <textarea rows={4} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-700" placeholder="Describe tu requerimiento..."></textarea>
                </div>
                <button type="submit" className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all">Enviar Solicitud</button>
                {formSent && <div className="text-green-600 font-bold mt-4">¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto.</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-300 mb-2">TransCarga Perú</h3>
              <p>Líderes en transporte de carga con más de 15 años de experiencia en el mercado peruano.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-300 mb-2">Servicios</h3>
              <a href="#" className="block text-white/80 hover:text-yellow-300">Transporte de Pallets</a>
              <a href="#" className="block text-white/80 hover:text-yellow-300">Contenedores</a>
              <a href="#" className="block text-white/80 hover:text-yellow-300">Carga Suelta</a>
              <a href="#" className="block text-white/80 hover:text-yellow-300">Logística Integral</a>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-300 mb-2">Contacto</h3>
              <p>Av. Argentina 2750, Callao</p>
              <p>+51 1 234-5678</p>
              <p>info@transcargaperu.com</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center text-white/70">
          © 2025 Juan Terrones. Todos los derechos reservados. | Diseñado con <span className="text-red-500">❤️</span> en Lima, Perú
          </div>
        </div>
      </footer>
    </div>
  );
} 