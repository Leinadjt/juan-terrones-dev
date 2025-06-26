import React from "react";
import { Link } from 'react-router-dom';
import heroImg from '../assets/lubricantejt/hero-lubricante.png';
import screenshot1 from '../assets/lubricantejt/screenshot-1.jpg';
import screenshot2 from '../assets/lubricantejt/screenshot-2.jpg';
import screenshot3 from '../assets/lubricantejt/screenshot-3.jpg';

const modulos = [
  { icon: "🛢️", title: "Servicios por vehículo", desc: "Historial y registro detallado de cada servicio realizado." },
  { icon: "📦", title: "Inventario inteligente", desc: "Stock en tiempo real de aceites, filtros y productos." },
  { icon: "💵", title: "Caja y arqueo", desc: "Control de ingresos, egresos y cierre diario seguro." },
  { icon: "📊", title: "Reportes avanzados", desc: "Análisis de ventas, servicios y stock exportables." },
  { icon: "👥", title: "Gestión de usuarios", desc: "Permisos y roles para tu equipo de trabajo." },
];

const beneficios = [
  { icon: "🚀", text: "Automatiza tu taller y ahorra tiempo" },
  { icon: "📱", text: "Acceso desde cualquier dispositivo" },
  { icon: "🔒", text: "Datos seguros y respaldados" },
  { icon: "📈", text: "Toma mejores decisiones con reportes visuales" },
  { icon: "🤝", text: "Soporte técnico personalizado" },
];

const planes = [
  { nombre: "Básico", precio: "S/ 250/mes", desc: "1 usuario, inventario y caja", ruta: "/lubricante/basico", destacado: false, beneficios: [
    "Registro de servicios por vehículo",
    "Inventario básico de aceites y filtros",
    "Caja diaria y arqueo",
    "Reportes esenciales",
    "Soporte por email"
  ] },
  { nombre: "Pro", precio: "S/ 450/mes", desc: "Hasta 3 usuarios y reportes avanzados", ruta: "/lubricante/pro", destacado: true, beneficios: [
    "Todo lo del plan Básico",
    "Reportes avanzados y exportación a Excel/Sheets",
    "Gestión de proveedores y compras",
    "Control de usuarios y permisos",
    "Soporte prioritario"
  ] },
  { nombre: "Licencia anual", precio: "Desde S/ 3,000", desc: "Hasta 3 usuarios, reportes avanzados, soporte extendido", ruta: "/lubricante/anual", destacado: false, beneficios: [
    "Todo lo del plan Pro",
    "Actualizaciones incluidas durante la vigencia",
    "Reporte mensual en la nube",
    "Capacitación inicial incluida",
    "Soporte extendido"
  ] },
];

export default function LubricanteJT() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-100">
      {/* Hero moderno */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 overflow-hidden">
        <img src={heroImg} alt="Taller lubricentro" className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-yellow-400/30" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-white/20 border border-white/30 shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center gap-6 animate-fade-in">
            <span className="text-6xl mb-2">🛢️</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 drop-shadow mb-2 text-center">Software Moderno para Lubricentros</h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-4 text-center">Gestiona servicios, inventario y caja de tu taller con tecnología de última generación.</p>
            <a href="mailto:juanterrones189@gmail.com" className="inline-block mt-2 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-lg shadow-xl hover:scale-105 transform transition-transform duration-300">Solicitar información</a>
          </div>
        </div>
      </section>

      {/* Módulos visuales */}
      <section className="py-20 bg-gradient-to-br from-gray-900/80 to-gray-800/90">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Módulos Principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {modulos.map((mod, idx) => (
              <div key={idx} className="bg-white/10 border border-yellow-400/30 rounded-2xl shadow-xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3">
                <div className="text-5xl mb-2">{mod.icon}</div>
                <h3 className="text-xl font-bold mb-1 text-yellow-300">{mod.title}</h3>
                <p className="text-gray-200">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios visuales */}
      <section className="py-20 bg-gradient-to-br from-yellow-100/80 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Beneficios Clave</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {beneficios.map((b, idx) => (
              <div key={idx} className="flex items-center bg-white rounded-xl shadow-lg p-6 text-lg mb-2 border-l-4 border-yellow-400 hover:scale-105 transition-transform duration-300">
                <span className="text-3xl mr-4">{b.icon}</span>
                <span className="text-gray-700">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes y precios modernos */}
      <section className="py-20 bg-gradient-to-br from-gray-900/90 to-gray-800/80">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {planes.map((plan, idx) => (
              <div key={idx} className={`rounded-2xl shadow-2xl p-10 text-center border-2 ${plan.destacado ? 'border-yellow-400 scale-105 bg-yellow-50/80' : 'border-gray-700 bg-white/10'} flex flex-col items-center hover:scale-105 transition-transform duration-300`}>
                {plan.destacado && <div className="bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-4 py-1 mb-2 inline-block">Más Popular</div>}
                <h3 className={`text-2xl font-bold mb-2 ${plan.destacado ? 'text-yellow-500' : 'text-yellow-400'}`}>{plan.nombre}</h3>
                <div className={`text-4xl font-extrabold mb-2 ${plan.destacado ? 'text-yellow-600' : 'text-yellow-500'}`}>{plan.precio}</div>
                <p className={`${plan.destacado ? 'text-gray-900' : 'text-gray-200'} mb-4`}>{plan.desc}</p>
                <ul className={`text-left mb-6 space-y-2 ${plan.destacado ? 'text-gray-900' : 'text-gray-100'}`}>
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center"><span className="text-green-400 mr-2">✔</span>{b}</li>
                  ))}
                </ul>
                <Link to={plan.ruta} className="block mt-auto px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-lg shadow hover:scale-105 transition">Ver detalles</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de capturas visual */}
      <section className="py-20 bg-gradient-to-br from-yellow-100/80 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Capturas del Sistema</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <img src={screenshot1} alt="Dashboard Principal" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Dashboard Principal</h3>
                <p className="text-gray-600 text-sm">Vista general del rendimiento del lubricentro.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <img src={screenshot2} alt="Gestión de Inventario" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Gestión de Inventario</h3>
                <p className="text-gray-600 text-sm">Control de stock de aceites y filtros en tiempo real.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <img src={screenshot3} alt="Reporte de Servicios" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Reporte de Servicios</h3>
                <p className="text-gray-600 text-sm">Análisis detallado de servicios y ventas.</p>
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