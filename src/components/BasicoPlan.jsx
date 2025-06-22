import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BasicoPlan = () => {
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-200">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">Plan Básico</h1>
            <p className="text-lg text-gray-600">La solución ideal para iniciar y gestionar tu pequeño negocio.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">¿Qué incluye el Plan Básico?</h2>
              <ul className="space-y-3">
                {[
                  'Gestión de inventario básica',
                  'Ventas y facturación',
                  'Reportes básicos de ventas',
                  'Soporte por email',
                  '1 Usuario incluido',
                  'Acceso desde cualquier dispositivo',
                  'Copia de seguridad diaria'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-700">Precio Mensual</p>
              <p className="text-5xl font-bold text-blue-600 my-2">S/ 149</p>
              <p className="text-gray-600 mb-4">/ mes</p>
              <p className="text-sm text-gray-500">O elige el plan anual y ahorra un 20%</p>
              <Link to="/registro-cliente?plan=Básico" className="mt-6 block w-full text-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
                Comenzar
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
              El Plan Básico se factura de forma mensual o anual, según tu elección. Puedes cancelar tu suscripción en cualquier momento desde tu panel de control. La cancelación será efectiva al final del ciclo de facturación actual. No se realizan reembolsos por periodos parciales. Tus datos te pertenecen y puedes exportarlos en cualquier momento.
            </p>
            
            <button 
              onClick={() => setIsTermsExpanded(!isTermsExpanded)}
              className="text-blue-600 hover:underline text-sm font-semibold"
            >
              {isTermsExpanded ? 'Leer menos' : 'Leer términos y condiciones completos'}
            </button>

            {isTermsExpanded && (
              <div className="mt-4 text-xs text-gray-600 bg-gray-100 p-4 rounded-md">
                <p className="font-bold mb-2">1. Suscripción:</p>
                <p className="mb-2">La suscripción al Plan Básico se renueva automáticamente cada mes o año. La cancelación debe realizarse al menos 24 horas antes de la fecha de renovación para evitar cargos.</p>
                <p className="font-bold mb-2">2. Uso del Servicio:</p>
                <p className="mb-2">El servicio es para un único usuario. No está permitida la reventa o el uso compartido de la cuenta. El uso indebido del servicio puede resultar en la suspensión de la cuenta.</p>
                <p className="font-bold mb-2">3. Soporte:</p>
                <p>El soporte por email se atenderá en un plazo de 48 horas hábiles.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BasicoPlan; 