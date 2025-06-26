import React from "react";
import heroLog from '../assets/logisticajt/hero-logistica.png';

const beneficios = [
  "Todo lo del plan Básico",
  "Integración GPS",
  "Módulo de costos avanzados",
  "Reportes exportables",
  "Soporte prioritario"
];

const terminos = [
  "Incluye acceso para hasta 5 usuarios y 20 vehículos.",
  "Permite exportar reportes y datos a Excel.",
  "Incluye soporte prioritario por email y WhatsApp.",
  "Acceso desde cualquier dispositivo con internet.",
  "Pago mensual, cancelable en cualquier momento con aviso de 7 días.",
  "No incluye desarrollo a medida ni módulos adicionales fuera del plan Profesional."
];

export default function LogisticaPlanProfesional() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      <section className="py-12 px-4 flex flex-col items-center">
        <img src={heroLog} alt="Plan Profesional Logística" className="w-32 h-32 rounded-full shadow mb-6 object-cover border-4 border-yellow-400" />
        <h1 className="text-4xl font-bold text-yellow-700 mb-2">Plan Profesional LogísticaJT</h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">Pensado para empresas en crecimiento que requieren mayor control, integración GPS y reportes avanzados.</p>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full mb-8 border-t-4 border-yellow-400">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Beneficios</h2>
          <ul className="space-y-3 mb-6">
            {beneficios.map((b, i) => (
              <li key={i} className="flex items-center text-gray-700"><span className="text-yellow-500 mr-2">🚚</span>{b}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Términos y Condiciones</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
            {terminos.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <a href="/registro-cliente?plan=ProfesionalLogistica" className="block mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg shadow hover:scale-105 transition text-center">Comenzar</a>
        </div>
      </section>
    </div>
  );
} 