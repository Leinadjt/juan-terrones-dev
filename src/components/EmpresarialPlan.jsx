import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmpresarialPlan = () => {
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Plan Empresarial</h1>
            <p className="text-lg text-gray-600">Soluciones a medida para grandes empresas y corporaciones.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Qué incluye el Plan Empresarial?</h2>
              <ul className="space-y-3">
                <li className="font-semibold text-gray-900">Todo lo del Plan Profesional, y además:</li>
                {[
                  'API personalizada y sin límites',
                  'Integraciones avanzadas a medida',
                  'Soporte 24/7 dedicado',
                  'Capacitación incluida para equipos',
                  'Usuarios ilimitados',
                  'Gestor de cuenta personal',
                  'Acuerdos de Nivel de Servicio (SLA)'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-700">Precio Personalizado</p>
              <p className="text-3xl md:text-4xl font-bold text-slate-800 my-3">Contacta con nosotros</p>
              <p className="text-gray-600 mb-4">Creamos un plan a la medida de tus necesidades.</p>
              
              <Link to="/registro-cliente?plan=Empresarial" className="mt-6 block w-full text-center py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition shadow-md">
                Contactar a Ventas
              </Link>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Soluciones de Pago Flexibles</h3>
            <p className="text-gray-600">Ofrecemos facturación personalizada, órdenes de compra y diversas modalidades de pago para adaptarnos a los requerimientos de tu empresa.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Términos y Condiciones</h3>
            <p className="text-sm text-gray-600 mb-2">
              Los planes empresariales se negocian de forma individual con un contrato personalizado que incluye Acuerdos de Nivel de Servicio (SLA). Nos comprometemos a ofrecer la máxima flexibilidad y un soporte adaptado a tus operaciones.
            </p>
            <button 
              onClick={() => setIsTermsExpanded(!isTermsExpanded)}
              className="text-slate-600 hover:underline text-sm font-semibold"
            >
              {isTermsExpanded ? 'Leer menos' : 'Leer términos y condiciones completos'}
            </button>

            {isTermsExpanded && (
              <div className="mt-4 text-xs text-gray-600 bg-gray-100 p-4 rounded-md">
                <p className="font-bold mb-2">1. Acuerdo de Nivel de Servicio (SLA):</p>
                <p className="mb-2">Se firmará un SLA personalizado que garantizará un tiempo de actividad (uptime) del 99.9% y definirá los tiempos de respuesta del soporte dedicado. Las penalizaciones por incumplimiento del SLA se detallarán en el contrato.</p>
                <p className="font-bold mb-2">2. Personalización y Desarrollo:</p>
                <p className="mb-2">Cualquier desarrollo a medida o integración personalizada se cotizará por separado y se regirá por un anexo al contrato principal, con sus propios plazos y costos.</p>
                <p className="font-bold mb-2">3. Confidencialidad:</p>
                <p>Se firmará un Acuerdo de No Divulgación (NDA) para proteger toda la información sensible de su empresa a la que podamos tener acceso durante la prestación del servicio.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmpresarialPlan; 