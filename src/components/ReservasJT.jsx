import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const servicios = [
  {
    id: 1,
    nombre: 'Consulta General',
    descripcion: 'Atención médica integral para toda la familia',
    duracion: '30 min',
    precio: 'S/ 80',
    icono: '👨‍⚕️'
  },
  {
    id: 2,
    nombre: 'Consulta Especializada',
    descripcion: 'Atención por especialistas certificados',
    duracion: '45 min',
    precio: 'S/ 120',
    icono: '🏥'
  },
  {
    id: 3,
    nombre: 'Examen Físico',
    descripcion: 'Evaluación completa del estado de salud',
    duracion: '60 min',
    precio: 'S/ 150',
    icono: '🔍'
  },
  {
    id: 4,
    nombre: 'Vacunación',
    descripcion: 'Aplicación de vacunas según calendario',
    duracion: '20 min',
    precio: 'S/ 60',
    icono: '💉'
  },
  {
    id: 5,
    nombre: 'Control Prenatal',
    descripcion: 'Seguimiento del embarazo',
    duracion: '40 min',
    precio: 'S/ 100',
    icono: '🤱'
  },
  {
    id: 6,
    nombre: 'Pediatría',
    descripcion: 'Atención especializada para niños',
    duracion: '35 min',
    precio: 'S/ 90',
    icono: '👶'
  }
];

const testimonios = [
  {
    id: 1,
    nombre: 'María González',
    comentario: 'Excelente atención, muy profesionales y puntuales. Recomiendo totalmente.',
    calificacion: 5,
    ubicacion: 'Lima'
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    comentario: 'El sistema de reservas es súper fácil de usar. Sin colas y muy eficiente.',
    calificacion: 5,
    ubicacion: 'Callao'
  },
  {
    id: 3,
    nombre: 'Ana Torres',
    comentario: 'Los recordatorios por WhatsApp son geniales. Nunca más olvido mis citas.',
    calificacion: 5,
    ubicacion: 'Miraflores'
  }
];

const precios = [
  {
    nombre: 'Básico',
    precio: 'S/ 80',
    caracteristicas: [
      'Consulta general',
      'Receta médica',
      'Atención personalizada',
      'Sin colas'
    ],
    destacado: false
  },
  {
    nombre: 'Premium',
    precio: 'S/ 120',
    caracteristicas: [
      'Consulta especializada',
      'Examen físico completo',
      'Receta médica',
      'Seguimiento por WhatsApp',
      'Prioridad en agenda'
    ],
    destacado: true
  },
  {
    nombre: 'Familiar',
    precio: 'S/ 200',
    caracteristicas: [
      '3 consultas incluidas',
      'Descuento del 20%',
      'Atención para toda la familia',
      'Recordatorios automáticos',
      'Soporte prioritario'
    ],
    destacado: false
  }
];

export default function ReservasJT() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: '',
    fecha: '',
    horario: '',
    mensaje: ''
  });
  const [formSent, setFormSent] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    
    // Simular envío
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        servicio: '',
        fecha: '',
        horario: '',
        mensaje: ''
      });
    }, 3000);
  };

  const enviarWhatsApp = () => {
    const mensaje = `Hola, quisiera agendar una cita médica. Mi nombre es ${formData.nombre || '[Nombre]'}.`;
    const url = `https://wa.me/51977517628?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Reserva tu Cita Médica
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Sin colas, sin esperas. Atención médica de calidad cuando la necesites.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#reservar" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition">
              Reservar Ahora
            </a>
            <a href="https://wa.me/51977517628" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition flex items-center justify-center gap-2">
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-semibold mb-2">Sin Colas</h3>
              <p>Reserva tu cita y evita las largas esperas en la clínica.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p>Comunicación directa y recordatorios automáticos.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Puntualidad</h3>
              <p>Respetamos tu tiempo con horarios exactos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio) => (
              <div key={servicio.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-4xl mb-4">{servicio.icono}</div>
                <h3 className="text-xl font-semibold mb-2">{servicio.nombre}</h3>
                <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    <FaClock className="inline mr-1" />
                    {servicio.duracion}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">{servicio.precio}</span>
                </div>
                <button 
                  onClick={() => document.getElementById('reservar').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Reserva */}
      <section id="reservar" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Reserva tu Cita</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Servicio</label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar servicio</option>
                    {servicios.map((servicio) => (
                      <option key={servicio.id} value={servicio.nombre}>
                        {servicio.nombre} - {servicio.precio}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horario</label>
                  <select
                    name="horario"
                    value={formData.horario}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar horario</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje adicional</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe brevemente tu consulta o síntomas..."
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  disabled={formSent}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
                >
                  {formSent ? 'Enviando...' : 'Reservar Cita'}
                </button>
                <button
                  type="button"
                  onClick={enviarWhatsApp}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp />
                  WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {precios.map((plan, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-8 ${plan.destacado ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}>
                {plan.destacado && (
                  <div className="bg-blue-500 text-white text-center py-2 rounded-full text-sm font-semibold mb-4">
                    Más Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.nombre}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">{plan.precio}</div>
                <ul className="space-y-3 mb-8">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheck className="text-green-500 mr-3" />
                      {caracteristica}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  Elegir Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros pacientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((testimonio) => (
              <div key={testimonio.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonio.calificacion)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonio.comentario}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{testimonio.nombre}</span>
                  <span className="text-gray-500 text-sm">{testimonio.ubicacion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="mr-3" />
                  <span>+51 977517628</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-3" />
                  <span>juanterrones189@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-3" />
                  <span>Av. Principal 123, Lima - Perú</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-3" />
                  <span>Lun - Vie: 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Horarios de Atención</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span>8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/51977517628?text=Hola,%20quisiera%20agendar%20una%20cita%20médica"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
} 