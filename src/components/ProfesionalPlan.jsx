import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfesionalPlan = () => {
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-200">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">Plan Profesional</h1>
            <p className="text-lg text-gray-600">Ideal para negocios en crecimiento que necesitan herramientas avanzadas.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">¿Qué incluye el Plan Profesional?</h2>
              <ul className="space-y-3">
                <li className="font-semibold text-gray-800">Todo lo del Plan Básico, y además:</li>
                {[
                  'Analytics avanzados',
                  'Gestión de empleados',
                  'Aplicación móvil completa',
                  'Soporte prioritario (email y chat)',
                  'Hasta 5 usuarios',
                  'Integración con pasarelas de pago',
                  'API para desarrolladores'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-indigo-50 p-8 rounded-lg text-center ring-2 ring-indigo-500">
              <p className="text-lg font-semibold text-gray-700">Precio Mensual</p>
              <p className="text-5xl font-bold text-indigo-600 my-2">S/ 299</p>
              <p className="text-gray-600 mb-4">/ mes</p>
              <p className="text-sm text-gray-500">O elige el plan anual y ahorra un 20%</p>
              <Link to="/registro-cliente?plan=Profesional" className="mt-6 block w-full text-center py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md">
                Comenzar Ahora
              </Link>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-700 mb-3">Formas de Pago Aceptadas</h3>
            <p className="text-gray-600">Aceptamos las principales tarjetas de crédito y débito (Visa, MasterCard, American Express) y transferencias bancarias.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-3">Términos y Condiciones</h3>
            <p className="text-sm text-gray-600 mb-2">
              El Plan Profesional se factura de forma mensual o anual. Puedes cambiar de plan o cancelar tu suscripción en cualquier momento. La cancelación será efectiva al final del ciclo de facturación. Todos los datos generados son de tu propiedad y puedes exportarlos cuando lo necesites.
            </p>
            <button 
              onClick={() => setIsTermsExpanded(!isTermsExpanded)}
              className="text-indigo-600 hover:underline text-sm font-semibold"
            >
              {isTermsExpanded ? 'Leer menos' : 'Leer términos y condiciones completos'}
            </button>

            {isTermsExpanded && (
              <div className="mt-4 text-xs text-gray-600 bg-gray-100 p-4 rounded-md">
                <p className="font-bold mb-2">1. Política de Uso Justo de la API:</p>
                <p className="mb-2">El acceso a la API está sujeto a una política de uso justo para garantizar la estabilidad del servicio para todos los usuarios. Nos reservamos el derecho de limitar el número de llamadas si se detecta un uso excesivo que afecte al rendimiento general.</p>
                <p className="font-bold mb-2">2. Usuarios:</p>
                <p className="mb-2">El plan incluye hasta 5 usuarios. Cada usuario adicional tendrá un costo extra, que se añadirá a la facturación mensual o anual.</p>
                <p className="font-bold mb-2">3. Soporte Prioritario:</p>
                <p>El soporte prioritario por email y chat garantiza un tiempo de primera respuesta inferior a 8 horas hábiles.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfesionalPlan; 