import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaEnvelope, FaPhone, FaCheck, FaArrowUp, FaUsers, FaChartLine, FaShieldAlt, FaMobile, FaCloud, FaHeadset } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import screenshot1 from '../assets/gestor/screenshot-1.jpg';
import screenshot2 from '../assets/gestor/screenshot-2.jpg';
import screenshot3 from '../assets/gestor/screenshot-3.jpg';

const screenshots = [
  {
    id: 1,
    src: screenshot1,
    alt: 'Screenshot 1 del sistema',
    title: 'Dashboard Principal',
    description: 'Vista general del rendimiento del negocio.'
  },
  {
    id: 2,
    src: screenshot2,
    alt: 'Screenshot 2 del sistema',
    title: 'Gestión de Inventario',
    description: 'Control de stock en tiempo real.'
  },
  {
    id: 3,
    src: screenshot3,
    alt: 'Screenshot 3 del sistema',
    title: 'Reporte de Ventas',
    description: 'Análisis detallado de las ventas.'
  }
];

const caracteristicas = [
  {
    id: 1,
    titulo: 'Gestión de Inventario',
    descripcion: 'Control completo de stock, alertas automáticas y reportes detallados',
    icono: '📦',
    items: [
      'Control de stock en tiempo real',
      'Alertas de inventario bajo',
      'Reportes de rotación',
      'Códigos de barras integrados'
    ]
  },
  {
    id: 2,
    titulo: 'Ventas y Facturación',
    descripcion: 'Sistema completo de ventas con facturación electrónica integrada',
    icono: '💰',
    items: [
      'Facturación electrónica',
      'Múltiples métodos de pago',
      'Reportes de ventas',
      'Gestión de clientes'
    ]
  },
  {
    id: 3,
    titulo: 'Reportes y Analytics',
    descripcion: 'Análisis detallado del rendimiento de tu negocio',
    icono: '📊',
    items: [
      'Dashboard interactivo',
      'Reportes personalizables',
      'Análisis de tendencias',
      'Exportación de datos'
    ]
  },
  {
    id: 4,
    titulo: 'Gestión de Empleados',
    descripcion: 'Control de personal, horarios y nóminas integrado',
    icono: '👥',
    items: [
      'Control de asistencia',
      'Gestión de horarios',
      'Cálculo de nóminas',
      'Evaluaciones de personal'
    ]
  },
  {
    id: 5,
    titulo: 'Aplicación Móvil',
    descripcion: 'Acceso completo desde cualquier dispositivo móvil',
    icono: '📱',
    items: [
      'App nativa iOS y Android',
      'Sincronización en tiempo real',
      'Funciones offline',
      'Notificaciones push'
    ]
  },
  {
    id: 6,
    titulo: 'Soporte 24/7',
    descripcion: 'Asistencia técnica disponible en cualquier momento',
    icono: '🛠️',
    items: [
      'Chat en vivo',
      'Soporte telefónico',
      'Base de conocimientos',
      'Capacitación incluida'
    ]
  }
];

const precios = [
  {
    nombre: 'Básico',
    precios: {
      mensual: 'S/ 149',
      anual: 'S/ 1490'
    },
    descripcion: 'Perfecto para pequeños negocios',
    caracteristicas: [
      'Gestión de inventario básica',
      'Ventas y facturación',
      'Reportes básicos',
      'Soporte por email',
      '1 usuario incluido'
    ],
    destacado: false,
    boton: 'Comenzar',
    link: '/gestor-jt/basico'
  },
  {
    nombre: 'Profesional',
    precios: {
      mensual: 'S/ 299',
      anual: 'S/ 2990'
    },
    descripcion: 'Ideal para negocios en crecimiento',
    caracteristicas: [
      'Todo del plan Básico',
      'Analytics avanzados',
      'Gestión de empleados',
      'Aplicación móvil',
      'Soporte prioritario',
      'Hasta 5 usuarios'
    ],
    destacado: true,
    boton: 'Comenzar Ahora',
    link: '/gestor-jt/profesional'
  },
  {
    nombre: 'Empresarial',
    precios: {
      mensual: 'S/ 599',
      anual: 'S/ 5990'
    },
    descripcion: 'Para empresas grandes',
    caracteristicas: [
      'Todo del plan Profesional',
      'API personalizada',
      'Integraciones avanzadas',
      'Soporte 24/7',
      'Capacitación incluida',
      'Usuarios ilimitados'
    ],
    destacado: false,
    boton: 'Contactar Ventas',
    link: '/gestor-jt/empresarial'
  }
];

const estadisticas = [
  { valor: 500, sufijo: '+', etiqueta: 'Clientes Satisfechos' },
  { valor: 25, sufijo: '', etiqueta: 'Ciudades Cubiertas' },
  { valor: 99.8, sufijo: '%', etiqueta: 'Tiempo de Actividad' },
  { valor: 15, sufijo: '', etiqueta: 'Años de Experiencia' }
];

export default function GestorJT() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const [billingCycle, setBillingCycle] = useState('mensual');

  // Animación de estadísticas
  useEffect(() => {
    const animateStats = () => {
      estadisticas.forEach((stat, index) => {
        let current = 0;
        const increment = stat.valor / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.valor) {
            current = stat.valor;
            clearInterval(timer);
          }
          setStats(prev => {
            const copy = [...prev];
            copy[index] = stat.sufijo === '%' ? current.toFixed(1) : Math.floor(current);
            return copy;
          });
        }, 20);
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    });

    const statsSection = document.getElementById('estadisticas');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const enviarWhatsApp = () => {
    const mensaje = 'Hola, me interesa conocer más sobre el sistema de gestión GestorJT.';
    const url = `https://wa.me/51977517628?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                  Gestiona tu Negocio <br /> de Forma Inteligente
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  Sistema integral de gestión que automatiza y optimiza cada área de tu negocio.
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <Link to="/gestor-jt/basico" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition shadow-lg">
                    Comenzar
                  </Link>
                  <a 
                    href="https://wa.me/51977517628?text=Hola,%20me%20gustaría%20contratar%20el%20servicio%20de%20GestorJT."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition shadow-lg"
                  >
                    Contratar
                  </a>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={screenshot1}
                alt="Dashboard Principal del Sistema"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section id="estadisticas" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {estadisticas.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stats[index]}{stat.sufijo}
                </div>
                <div className="text-gray-600">{stat.etiqueta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="caracteristicas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Características Principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caracteristicas.map((caracteristica) => (
              <div key={caracteristica.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-4xl mb-4">{caracteristica.icono}</div>
                <h3 className="text-xl font-semibold mb-2">{caracteristica.titulo}</h3>
                <p className="text-gray-600 mb-4">{caracteristica.descripcion}</p>
                <ul className="space-y-2">
                  {caracteristica.items.map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Capturas del Sistema</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group cursor-pointer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition duration-300"
                />
                <div className="p-4 bg-gray-50">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {precios.map((plan, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-8 flex flex-col ${plan.destacado ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}>
                {plan.destacado && (
                  <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg text-sm font-semibold -mt-8 -mx-8 mb-4">
                    Más Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">{plan.precios[billingCycle]}</span>
                  <span className="text-gray-500"> / {billingCycle === 'mensual' ? 'mes' : 'año'}</span>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{plan.descripcion}</p>
                <ul className="space-y-3 mb-8">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheck className="text-green-500 mr-3" />
                      {caracteristica}
                    </li>
                  ))}
                </ul>
                <Link to={plan.link} className={`w-full block text-center py-3 rounded-lg font-semibold transition mt-auto ${
                  plan.destacado 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}>
                  {plan.boton}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-gray-100">
        {/* Testimonios content */}
      </section>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/51977517628?text=Hola,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20GestorJT"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
} 