import React from "react";
import heroChef from '../assets/polleriajt/hero-chef.png';

const beneficios = [
  "Todo lo del plan Básico",
  "Reportes avanzados y exportación a Excel/Sheets",
  "Gestión de combos y promociones",
  "Control de usuarios y permisos",
  "Soporte prioritario"
];

const terminos = [
  "El servicio incluye acceso para hasta 3 usuarios.",
  "Permite exportar reportes y datos a Excel o Google Sheets.",
  "Incluye soporte prioritario por email y WhatsApp.",
  "El sistema es accesible desde cualquier dispositivo con internet.",
  "El pago es mensual y puede cancelarse en cualquier momento con aviso previo de 7 días.",
  "No incluye desarrollo a medida ni módulos adicionales fuera del plan Pro."
];

export default function PolleriaPlanPro() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-100 to-red-100 py-12 px-4 flex flex-col items-center">
        <img src={heroChef} alt="Plan Pro Pollería" className="w-32 h-32 rounded-full shadow mb-6 object-cover" />
        <h1 className="text-4xl font-bold text-yellow-700 mb-2">Plan Pro PolleríaJT</h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">Pensado para pollerías en crecimiento que requieren mayor control, reportes avanzados y gestión de promociones.</p>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full mb-8">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Beneficios</h2>
          <ul className="space-y-3 mb-6">
            {beneficios.map((b, i) => (
              <li key={i} className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>{b}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">Términos y Condiciones</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
            {terminos.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <a href="/registro-cliente?plan=ProPolleria" className="block mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold text-lg shadow hover:scale-105 transition text-center">Comenzar</a>
        </div>
      </section>
    </div>
  );
} 