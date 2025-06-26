import React from "react";
import heroLub from '../assets/lubricantejt/hero-lubricante.png';

const beneficios = [
  "Todo lo del plan Pro",
  "Actualizaciones incluidas durante la vigencia",
  "Reporte mensual en la nube",
  "Capacitación inicial incluida",
  "Soporte extendido"
];

const terminos = [
  "Incluye acceso para hasta 3 usuarios y reporte mensual en la nube.",
  "Incluye capacitación inicial y soporte extendido por email y WhatsApp.",
  "Acceso desde cualquier dispositivo con internet.",
  "Pago anual, la licencia cubre 12 meses de servicio.",
  "Incluye actualizaciones y mejoras durante la vigencia.",
  "No incluye desarrollo a medida ni módulos adicionales fuera del plan anual."
];

export default function LubricantePlanAnual() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50">
      <section className="py-12 px-4 flex flex-col items-center">
        <img src={heroLub} alt="Plan Licencia Anual Lubricante" className="w-32 h-32 rounded-full shadow mb-6 object-cover border-4 border-yellow-400" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Licencia Anual LubricanteJT</h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">La opción más completa para lubricentros que buscan estabilidad, soporte extendido y actualizaciones continuas.</p>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full mb-8 border-t-4 border-yellow-400">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Beneficios</h2>
          <ul className="space-y-3 mb-6">
            {beneficios.map((b, i) => (
              <li key={i} className="flex items-center text-gray-700"><span className="text-yellow-500 mr-2">🛢️</span>{b}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Términos y Condiciones</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
            {terminos.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <a href="/registro-cliente?plan=AnualLubricante" className="block mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-gray-700 to-yellow-500 text-white font-bold text-lg shadow hover:scale-105 transition text-center">Comenzar</a>
        </div>
      </section>
    </div>
  );
} 