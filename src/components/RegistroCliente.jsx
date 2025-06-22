import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const RegistroCliente = () => {
  const [state, handleSubmit] = useForm("xldnlvvr"); // Puedes usar un ID de formulario diferente si lo deseas
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get('plan') || 'No especificado';

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
        <div className="text-center bg-white/90 backdrop-blur-sm text-gray-800 p-10 rounded-lg shadow-2xl max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-3">¡Registro completado!</h2>
          <p className="text-lg">Gracias por registrarte. Hemos recibido tus datos y nos pondremos en contacto contigo a la brevedad para finalizar el proceso de activación de tu cuenta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">Registro de Cliente</h1>
        <p className="text-gray-600 text-center mb-8">Estás a un paso de comenzar con tu <span className="font-bold">{plan}</span>. Por favor, completa tus datos.</p>
        
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="plan" value={plan} />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
              <div className="relative">
                <FaUser className="absolute top-3.5 left-4 text-gray-400" />
                <input id="fullName" type="text" name="fullName" placeholder="Juan Pérez" required className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Teléfono de Contacto</label>
              <div className="relative">
                <FaPhone className="absolute top-3.5 left-4 text-gray-400" />
                <input id="phone" type="tel" name="phone" placeholder="+51 987654321" required className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Nombre de la Empresa</label>
            <div className="relative">
              <FaBuilding className="absolute top-3.5 left-4 text-gray-400" />
              <input id="companyName" type="text" name="companyName" placeholder="Mi Empresa S.A.C." required className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
              <input id="email" type="email" name="email" placeholder="tu.email@ejemplo.com" required className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Dirección Fiscal</label>
            <div className="relative">
                <FaMapMarkerAlt className="absolute top-3.5 left-4 text-gray-400" />
                <input id="address" type="text" name="address" placeholder="Av. Principal 123, Lima, Perú" required className="w-full pl-12 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          
          <button type="submit" disabled={state.submitting} className="w-full flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-400">
            <FaPaperPlane />
            {state.submitting ? 'Enviando Registro...' : 'Enviar y Activar Prueba'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroCliente; 