import React from "react";
import { Link } from 'react-router-dom';
import heroImg from '../assets/logisticajt/hero-logistica.png';
import servicio1 from '../assets/logisticajt/servicio-1.png';
import servicio2 from '../assets/logisticajt/servicio-2.png';
import screenshot1 from '../assets/logisticajt/screenshot-1.jpg';
import screenshot2 from '../assets/logisticajt/screenshot-2.jpg';
import screenshot3 from '../assets/logisticajt/screenshot-3.jpg';

const herramientas = [
  { icon: "🚚", title: "Gestión de Flota", desc: "Control total de vehículos, mantenimientos y rutas." },
  { icon: "📦", title: "Guías y Paquetería", desc: "Emisión y seguimiento de guías de remisión y paquetes." },
  { icon: "💸", title: "Caja y Gastos", desc: "Registro de ingresos, egresos y rendición de gastos por ruta." },
  { icon: "📊", title: "Reportes y Dashboard", desc: "Panel visual con KPIs, reportes y exportación a Excel." },
  { icon: "🧑‍💼", title: "Conductores y Usuarios", desc: "Gestión de personal, permisos y app móvil para choferes." },
  { icon: "🛰️", title: "Integración GPS", desc: "Monitoreo y rastreo en tiempo real de la flota." },
];

const planes = [
  { nombre: "Básico", precio: "S/ 250/mes", desc: "Hasta 5 vehículos, 1 usuario, módulos básicos", beneficios: [
    "Gestión de flota y viajes",
    "Guías de remisión",
    "Caja y gastos básicos",
    "Reportes esenciales",
    "Soporte por email"
  ] },
  { nombre: "Profesional", precio: "S/ 450/mes", desc: "Hasta 20 vehículos, 5 usuarios, módulo de costos y GPS", beneficios: [
    "Todo lo del plan Básico",
    "Integración GPS",
    "Módulo de costos avanzados",
    "Reportes exportables",
    "Soporte prioritario"
  ], destacado: true },
  { nombre: "Corporativo", precio: "S/ 850/mes", desc: "Ilimitado, soporte premium, app móvil + rastreo", beneficios: [
    "Todo lo del plan Profesional",
    "Usuarios y vehículos ilimitados",
    "App móvil para conductores",
    "Soporte premium 24/7",
    "Desarrollo personalizado"
  ] },
];

export default function LogisticaJT() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 overflow-hidden bg-gradient-to-br from-yellow-100 to-white">
        <img src={heroImg} alt="Logística" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-white/80 rounded-3xl shadow-2xl p-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-700 mb-4">Sistema Logístico Integral</h1>
            <p className="text-lg text-gray-700 mb-6">Optimiza la gestión de tu empresa de transporte y logística con tecnología de última generación.</p>
            <ul className="mb-6 space-y-2 text-gray-700">
              <li>✔ Control de flota, viajes y guías</li>
              <li>✔ Reducción de costos y optimización de rutas</li>
              <li>✔ Reportes automáticos y dashboard visual</li>
            </ul>
          </div>
          {/* Formulario de contacto/demostración */}
          <form action="https://formspree.io/f/xayrjvbp" method="POST" className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-yellow-700 mb-2">Solicita una demostración</h2>
            <input type="text" name="nombre" placeholder="Nombre" required className="border rounded-lg px-4 py-2" />
            <input type="email" name="email" placeholder="Correo electrónico" required className="border rounded-lg px-4 py-2" />
            <input type="text" name="empresa" placeholder="Empresa" className="border rounded-lg px-4 py-2" />
            <input type="tel" name="telefono" placeholder="Teléfono" className="border rounded-lg px-4 py-2" />
            <textarea name="mensaje" placeholder="¿En qué podemos ayudarte?" rows={3} className="border rounded-lg px-4 py-2" />
            <button type="submit" className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition">Solicitar Demo</button>
          </form>
        </div>
      </section>

      {/* Servicios principales */}
      <section className="py-20 bg-gradient-to-br from-yellow-100 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div>
            <h2 className="text-3xl font-bold text-yellow-700 mb-4">Transporte de Carga Pesada</h2>
            <ul className="text-gray-700 mb-6 space-y-2">
              <li>✔ Gestión de viajes y rutas</li>
              <li>✔ Control de vehículos y mantenimientos</li>
              <li>✔ Guías de remisión electrónicas</li>
              <li>✔ Rendición de gastos y caja</li>
            </ul>
            <button
              onClick={() => {
                const section = document.getElementById('planes');
                if(section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition"
            >
              Ver planes
            </button>
          </div>
          <img src={servicio1} alt="Dashboard transporte" className="rounded-2xl shadow-xl w-full max-w-md mx-auto" />
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4 mt-16">
          <img src={servicio2} alt="Dashboard paquetería" className="rounded-2xl shadow-xl w-full max-w-md mx-auto order-2 md:order-1" />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-yellow-700 mb-4">Empresas de Paquetería</h2>
            <ul className="text-gray-700 mb-6 space-y-2">
              <li>✔ Seguimiento de paquetes y entregas</li>
              <li>✔ Control de almacenes y stock</li>
              <li>✔ App móvil para repartidores</li>
              <li>✔ Reportes y facturación electrónica</li>
            </ul>
            <button
              onClick={() => {
                const section = document.getElementById('planes');
                if(section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition"
            >
              Ver planes
            </button>
          </div>
        </div>
      </section>

      {/* Herramientas/funcionalidades */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-12">Fortalece tu empresa con estas herramientas</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {herramientas.map((h, idx) => (
              <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3">
                <div className="text-5xl mb-2">{h.icon}</div>
                <h3 className="text-xl font-bold mb-1 text-yellow-700">{h.title}</h3>
                <p className="text-gray-700">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes y precios */}
      <section id="planes" className="py-20 bg-gradient-to-br from-yellow-100 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-12">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {planes.map((plan, idx) => (
              <div key={idx} className={`rounded-2xl shadow-2xl p-10 text-center border-2 ${plan.destacado ? 'border-yellow-400 scale-105 bg-yellow-50/80' : 'border-gray-200 bg-white'} flex flex-col items-center hover:scale-105 transition-transform duration-300`}>
                {plan.destacado && <div className="bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-4 py-1 mb-2 inline-block">Más Popular</div>}
                <h3 className="text-2xl font-bold mb-2 text-yellow-700">{plan.nombre}</h3>
                <div className="text-4xl font-extrabold text-yellow-600 mb-2">{plan.precio}</div>
                <p className="text-gray-700 mb-4">{plan.desc}</p>
                <ul className="text-left mb-6 space-y-2">
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>{b}</li>
                  ))}
                </ul>
                {plan.nombre === 'Básico' && (
                  <Link to="/logistica/basico" className="block mt-auto px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition text-center">Ver detalles</Link>
                )}
                {plan.nombre === 'Profesional' && (
                  <Link to="/logistica/profesional" className="block mt-auto px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition text-center">Ver detalles</Link>
                )}
                {plan.nombre === 'Corporativo' && (
                  <Link to="/logistica/corporativo" className="block mt-auto px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition text-center">Ver detalles</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de capturas */}
      <section className="py-20 bg-gradient-to-br from-yellow-100/80 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Capturas del Sistema</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <img src={screenshot1} alt="Panel de Viajes" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Panel de Viajes</h3>
                <p className="text-gray-600 text-sm">Gestión y control de viajes y guías.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <img src={screenshot2} alt="Gestión de Flota" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Gestión de Flota</h3>
                <p className="text-gray-600 text-sm">Control de vehículos y mantenimiento.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <img src={screenshot3} alt="Reportes Logísticos" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Reportes Logísticos</h3>
                <p className="text-gray-600 text-sm">Análisis de costos, rutas y rendimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-gray-900">
        {/* Footer limpio, sin texto adicional */}
      </footer>
    </div>
  );
} 