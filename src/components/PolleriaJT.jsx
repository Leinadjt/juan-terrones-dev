import React from "react";
import { Link } from 'react-router-dom';
import screenshot1 from '../assets/polleriajt/screenshot-1.png';
import screenshot2 from '../assets/polleriajt/screenshot-2.png';
import screenshot3 from '../assets/polleriajt/screenshot-3.png';
import heroChef from '../assets/polleriajt/hero-chef.png';

const heroImg = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

const modulos = [
  { icon: "🍽️", title: "Pedidos salón y delivery", desc: "Centraliza y gestiona pedidos de mesa, delivery y recojo en un solo sistema." },
  { icon: "📦", title: "Inventario de insumos", desc: "Controla el stock de pollos, insumos y combos en tiempo real." },
  { icon: "💵", title: "Caja diaria y arqueo", desc: "Registra ventas, ingresos y egresos. Cierre de caja fácil y seguro." },
  { icon: "📊", title: "Reportes automáticos", desc: "Reportes de ventas por día, producto o canal. Exporta a Excel o Google Sheets." },
  { icon: "👥", title: "Gestión de usuarios", desc: "Control de permisos y acceso para tu equipo." },
];

const beneficios = [
  { icon: "✅", text: "Fácil de usar en cocina y atención" },
  { icon: "✅", text: "Control preciso del stock de pollos e insumos" },
  { icon: "✅", text: "Acceso a reportes desde cualquier lugar" },
  { icon: "✅", text: "Evita pérdidas por mal manejo de inventario o caja" },
  { icon: "✅", text: "Agiliza la atención y mejora el control de tu negocio" },
];

const planes = [
  { nombre: "Básico", precio: "S/ 149.90/mes", desc: "1 local, 2 usuarios", destacado: false, beneficios: [
    "Gestión de pedidos salón y delivery",
    "Inventario básico de insumos",
    "Cierre de caja diario",
    "Reportes de ventas esenciales",
    "Soporte por email"
  ] },
  { nombre: "Pro", precio: "S/ 219.90/mes", desc: "Hasta 3 usuarios, reportes exportables", destacado: true, beneficios: [
    "Todo lo del plan Básico",
    "Reportes avanzados y exportación a Excel/Sheets",
    "Gestión de combos y promociones",
    "Control de usuarios y permisos",
    "Soporte prioritario"
  ] },
  { nombre: "Licencia anual", precio: "Desde S/ 2,500", desc: "Hasta 3 usuarios, reportes exportables, reporte mensual en la nube", destacado: false, beneficios: [
    "Todo lo del plan Pro",
    "Actualizaciones incluidas",
    "Reporte mensual en la nube",
    "Capacitación inicial",
    "Soporte extendido"
  ] },
];

const complementos = [
  { icon: "🧾", title: "Facturación electrónica" },
  { icon: "📱", title: "App móvil para mozos" },
  { icon: "🔔", title: "Alertas de stock bajo" },
  { icon: "📈", title: "Reportes exportables" },
  { icon: "🔒", title: "Seguridad y backups" },
  { icon: "🌐", title: "Acceso remoto" },
];

const faqs = [
  { q: "¿Puedo usarlo en varios dispositivos?", a: "Sí, puedes acceder desde cualquier PC, tablet o smartphone con internet." },
  { q: "¿Incluye soporte?", a: "Sí, todos los planes incluyen soporte técnico por email y WhatsApp." },
  { q: "¿Puedo exportar mis reportes?", a: "Sí, puedes exportar ventas e inventario a Excel o Google Sheets." },
  { q: "¿Se puede personalizar?", a: "Ofrecemos desarrollo a medida y módulos adicionales según tus necesidades." },
];

export default function PolleriaJT() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-yellow-900 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Imagen chef */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 md:h-[420px] flex items-center justify-center bg-gray-800">
            <img src={heroChef} alt="Chef pollería" className="object-cover w-full h-full opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-700/60 to-transparent" />
          </div>
          {/* Bloque texto */}
          <div className="text-white flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2"><span className="text-yellow-400">Gestiona tu Pollería</span> de manera fácil y rápida</h1>
            <p className="text-lg md:text-xl text-yellow-100">Centraliza pedidos, controla tu inventario y agiliza la gestión de tu restaurante con un sistema hecho para pollerías peruanas.</p>
            <div className="bg-white/10 rounded-xl p-6 flex flex-col gap-3 shadow-lg">
              <span className="font-bold text-yellow-300 text-lg">¿Listo para modernizar tu negocio?</span>
              <a href="mailto:juanterrones189@gmail.com" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg shadow hover:scale-105 transition">Solicitar información</a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios visuales */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-12">¿Por qué elegir nuestro sistema?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {beneficios.map((b, idx) => (
              <div key={idx} className="flex items-center bg-yellow-50 rounded-lg shadow p-6 text-lg mb-2 border-l-4 border-yellow-400">
                <span className="text-3xl mr-4">{b.icon}</span>
                <span className="text-gray-700">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes y precios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-12">Planes Competitivos para tu Negocio</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {planes.map((plan, idx) => (
              <div key={idx} className={`rounded-xl shadow-lg p-8 text-center border-2 ${plan.destacado ? 'border-yellow-500 scale-105 bg-yellow-50' : 'border-gray-100 bg-white'}`}>
                {plan.destacado && <div className="bg-yellow-500 text-white text-xs font-bold rounded-full px-4 py-1 mb-2 inline-block">Más Popular</div>}
                <h3 className="text-2xl font-bold mb-2 text-yellow-700">{plan.nombre}</h3>
                <div className="text-4xl font-extrabold text-yellow-600 mb-2">{plan.precio}</div>
                <p className="text-gray-600 mb-4">{plan.desc}</p>
                <ul className="text-left mb-6 space-y-2">
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>{b}</li>
                  ))}
                </ul>
                {/* Botón de acción */}
                {plan.nombre === 'Básico' && (
                  <Link to="/polleria/basico" className="block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold text-lg shadow hover:scale-105 transition">Ver detalles</Link>
                )}
                {plan.nombre === 'Pro' && (
                  <Link to="/polleria/pro" className="block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold text-lg shadow hover:scale-105 transition">Ver detalles</Link>
                )}
                {plan.nombre === 'Licencia anual' && (
                  <Link to="/polleria/anual" className="block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold text-lg shadow hover:scale-105 transition">Ver detalles</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complementos */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-12">Complementos para vender y facturar</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {complementos.map((c, idx) => (
              <div key={idx} className="bg-yellow-100 rounded-lg shadow p-4 flex flex-col items-center text-center">
                <span className="text-3xl mb-2">{c.icon}</span>
                <span className="font-semibold text-yellow-800">{c.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capturas del Sistema */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Capturas del Sistema</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <img src={screenshot1} alt="Dashboard Principal" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Dashboard Principal</h3>
                <p className="text-gray-600 text-sm">Vista general del rendimiento del negocio.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <img src={screenshot2} alt="Gestión de Inventario" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Gestión de Inventario</h3>
                <p className="text-gray-600 text-sm">Control de stock en tiempo real.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <img src={screenshot3} alt="Reporte de Ventas" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Reporte de Ventas</h3>
                <p className="text-gray-600 text-sm">Análisis detallado de las ventas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-yellow-700 mb-8">Resuelve tus dudas</h2>
            <ul className="space-y-6">
              {faqs.map((faq, idx) => (
                <li key={idx}>
                  <div className="font-semibold text-gray-800 mb-1">{faq.q}</div>
                  <div className="text-gray-600 text-base">{faq.a}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img src={heroImg} alt="Pollería" className="rounded-2xl shadow-xl w-full max-w-xs md:max-w-sm" />
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-gray-50">
        {/* Footer limpio, sin texto adicional */}
      </footer>
    </div>
  );
} 