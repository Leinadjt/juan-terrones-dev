import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModalPaneles({ show, onClose }) {
  const navigate = useNavigate();
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 p-2 md:p-4 max-w-full md:max-w-4xl w-full h-full md:h-auto items-center overflow-y-auto">
          <button
            onClick={e => { e.stopPropagation(); onClose(); }}
            className="fixed top-4 right-4 bg-white/30 hover:bg-white/60 text-gray-800 rounded-full p-2 z-50 shadow-lg"
            title="Cerrar"
          >
            ✕
          </button>
          {/* Miniatura Social Media */}
          <div
            onClick={() => { onClose(); navigate('/redes'); }}
            className="block bg-white/90 rounded-2xl shadow-lg overflow-hidden w-full max-w-xs cursor-pointer transition hover:shadow-2xl"
            title="Ver página de redes sociales"
          >
            <img src={require('./assets/socialmedia.png')} alt="Redes Sociales" className="w-full object-cover" />
          </div>
          {/* Miniatura Agencia de Viaje */}
          <div
            onClick={() => { onClose(); navigate('/viajes'); }}
            className="block bg-white/90 rounded-2xl shadow-lg overflow-hidden w-full max-w-xs cursor-pointer transition hover:shadow-2xl"
            title="Ver página de agencia de viajes"
          >
            <img src={require('./assets/agenciadeviaje.png')} alt="Agencia de Viajes" className="w-full object-cover" />
          </div>
          {/* Miniatura Transporte de Carga */}
          <div
            onClick={() => { onClose(); navigate('/transporte'); }}
            className="block bg-white/90 rounded-2xl shadow-lg overflow-hidden w-full max-w-xs cursor-pointer transition hover:shadow-2xl"
            title="Ver página de transporte de carga"
          >
            <img src={require('./assets/transporte de carga.png')} alt="Transporte de Carga" className="w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}