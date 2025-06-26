import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Globe, Home, Users, ShoppingCart, Mail, Info, FileText, Image, Settings, Search } from 'lucide-react';
import socialMediaPreview from './assets/socialmedia.png';
import travelAgencyPreview from './assets/agenciadeviaje.png';
import transportCompanyPreview from './assets/transporte de carga.png';
import gestorPreview from './assets/gestor.png';
import dentalPreview from './assets/dental.png';
import restaurantePreview from './assets/restauran.png';
import tiendaPreview from './assets/tienda.png';
import polleriaPreview from './assets/polleriajt/hero-polleria.png';
import lubricantePreview from './assets/lubricantejt/hero-lubricante1.png';
import logisticaPreview from './assets/logisticajt/hero-logistica1.png';

const projects = [
  {
    title: 'Redes Sociales',
    description: 'Portafolio de artista',
    image: socialMediaPreview,
    path: '/redes',
    color: 'from-purple-500 to-pink-500',
    icon: '🎨'
  },
  {
    title: 'Agencia de Viajes',
    description: 'Destinos y paquetes',
    image: travelAgencyPreview,
    path: '/viajes',
    color: 'from-blue-500 to-teal-400',
    icon: '✈️'
  },
  {
    title: 'Transporte de Carga',
    description: 'Logística y envíos',
    image: transportCompanyPreview,
    path: '/transporte',
    color: 'from-gray-600 to-blue-800',
    icon: '🚛'
  },
  {
    title: 'Sistema de Reservas',
    description: 'Clínica médica',
    image: dentalPreview,
    path: '/reservas',
    color: 'from-blue-500 to-blue-700',
    icon: '🏥'
  },
  {
    title: 'Restaurante',
    description: 'Menú y delivery',
    image: restaurantePreview,
    path: '/restaurante',
    color: 'from-orange-500 to-red-500',
    icon: '🍽️'
  },
  {
    title: 'Tienda Online',
    description: 'E-commerce completo',
    image: tiendaPreview,
    path: '/tienda',
    color: 'from-purple-500 to-indigo-500',
    icon: '🛍️'
  },
  {
    title: 'Sistema de Gestión',
    description: 'Software empresarial',
    image: gestorPreview,
    path: '/gestor',
    color: 'from-green-500 to-teal-500',
    icon: '⚙️'
  },
  {
    title: 'Gestor Pollería JT',
    description: 'Sistema integral para pollerías y restaurantes',
    image: polleriaPreview,
    path: '/gestor-polleria',
    color: 'from-yellow-500 to-red-400',
    icon: '🍗'
  },
  {
    title: 'Gestor Lubricantes JT',
    description: 'Gestión para lubricentros y cambios de aceite',
    image: lubricantePreview,
    path: '/gestor-lubricantes',
    color: 'from-gray-700 to-yellow-500',
    icon: '🛢️'
  },
  {
    title: 'Gestor Logística JT',
    description: 'Sistema logístico para transporte de carga',
    image: logisticaPreview,
    path: '/gestor-logistica',
    color: 'from-blue-900 to-gray-400',
    icon: '🚚'
  },
];

const siteTypes = {
  corporate: {
    name: 'Sitio Corporativo',
    color: 'bg-blue-500',
    structure: {
      'Inicio': { icon: Home, pages: ['Hero Section', 'Servicios Destacados', 'Testimonios', 'CTA'] },
      'Nosotros': { icon: Users, pages: ['Historia', 'Equipo', 'Misión y Visión', 'Valores'] },
      'Servicios': { icon: Settings, pages: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Solicitar Cotización'] },
      'Proyectos': { icon: Image, pages: ['Portfolio', 'Casos de Éxito', 'Testimonios Detallados'] },
      'Blog': { icon: FileText, pages: ['Artículos Recientes', 'Categorías', 'Archivo'] },
      'Contacto': { icon: Mail, pages: ['Formulario', 'Ubicación', 'Información de Contacto'] }
    }
  },
  ecommerce: {
    name: 'Tienda Online',
    color: 'bg-green-500',
    structure: {
      'Inicio': { icon: Home, pages: ['Productos Destacados', 'Ofertas', 'Categorías Populares'] },
      'Tienda': { icon: ShoppingCart, pages: ['Todas las Categorías', 'Filtros', 'Búsqueda Avanzada'] },
      'Productos': { icon: Search, pages: ['Ficha de Producto', 'Reseñas', 'Productos Relacionados'] },
      'Mi Cuenta': { icon: Users, pages: ['Perfil', 'Pedidos', 'Lista de Deseos', 'Direcciones'] },
      'Carrito': { icon: ShoppingCart, pages: ['Resumen', 'Checkout', 'Métodos de Pago'] },
      'Soporte': { icon: Info, pages: ['FAQ', 'Políticas', 'Contacto', 'Devoluciones'] }
    }
  },
  blog: {
    name: 'Blog Personal',
    color: 'bg-purple-500',
    structure: {
      'Inicio': { icon: Home, pages: ['Últimas Entradas', 'Categorías Populares', 'Sobre Mí'] },
      'Blog': { icon: FileText, pages: ['Todas las Entradas', 'Por Categoría', 'Por Fecha', 'Archivo'] },
      'Categorías': { icon: Search, pages: ['Tecnología', 'Lifestyle', 'Viajes', 'Tutoriales'] },
      'Acerca de': { icon: Users, pages: ['Mi Historia', 'Experiencia', 'Contacto'] },
      'Contacto': { icon: Mail, pages: ['Formulario', 'Redes Sociales', 'Colaboraciones'] }
    }
  },
  portfolio: {
    name: 'Portfolio Profesional',
    color: 'bg-orange-500',
    structure: {
      'Inicio': { icon: Home, pages: ['Hero', 'Proyectos Destacados', 'Habilidades', 'CTA'] },
      'Portfolio': { icon: Image, pages: ['Todos los Proyectos', 'Por Categoría', 'Estudios de Caso'] },
      'Sobre Mí': { icon: Users, pages: ['Biografía', 'Experiencia', 'Educación', 'CV'] },
      'Servicios': { icon: Settings, pages: ['Qué Ofrezco', 'Proceso de Trabajo', 'Precios'] },
      'Blog': { icon: FileText, pages: ['Tips y Consejos', 'Proceso Creativo', 'Actualizaciones'] },
      'Contacto': { icon: Mail, pages: ['Formulario', 'Disponibilidad', 'Presupuestos'] }
    }
  },
  landing: {
    name: 'Landing Page',
    color: 'bg-red-500',
    structure: {
      'Hero Section': { icon: Home, pages: ['Titular Principal', 'Subtítulo', 'CTA Principal'] },
      'Beneficios': { icon: Info, pages: ['Problema', 'Solución', 'Ventajas Clave'] },
      'Características': { icon: Settings, pages: ['Feature 1', 'Feature 2', 'Feature 3'] },
      'Testimonios': { icon: Users, pages: ['Reseñas', 'Casos de Éxito', 'Logos de Clientes'] },
      'Precios': { icon: ShoppingCart, pages: ['Planes', 'Comparación', 'FAQ de Precios'] },
      'CTA Final': { icon: Mail, pages: ['Formulario', 'Garantía', 'Contacto'] }
    }
  }
};

const WebsiteStructureBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState('corporate');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const currentSite = siteTypes[selectedType];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <Globe className="text-blue-600" />
          Portafolio de Proyectos Web
        </h1>
        <p className="text-lg text-gray-600">
          Una colección de plantillas y sistemas web funcionales.
        </p>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => navigate(project.path)}
            className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className={`w-full h-48 flex items-center justify-center bg-gradient-to-br ${project.color}`}>
                <span className="text-6xl text-white text-opacity-80">
                  {project.icon}
                </span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <div className={`w-full h-2 bg-gradient-to-r ${project.color}`}></div>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="my-20 border-t-2 border-dashed border-gray-300"></div>
      
      {/* Generador de Estructuras */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <Settings className="text-blue-500" />
            Generador de Estructuras Web
          </h2>
          <p className="text-gray-600">Selecciona el tipo de sitio web y explora su estructura recomendada.</p>
        </div>

        {/* Selector de tipo de sitio */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Tipo de Sitio Web</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(siteTypes).map(([key, site]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedType === key 
                    ? `${site.color} text-white border-transparent shadow-lg transform scale-105` 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">{site.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Estructura del sitio */}
        <div className="bg-gray-50 rounded-lg shadow-inner p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-4 h-4 rounded-full ${currentSite.color}`}></div>
            <h3 className="text-2xl font-bold text-gray-800">{currentSite.name}</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(currentSite.structure).map(([sectionName, sectionData]) => {
              const Icon = sectionData.icon;
              const isExpanded = expandedSections[sectionName];
              
              return (
                <div key={sectionName} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(sectionName)}
                    className="w-full px-4 py-3 bg-white hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-800">{sectionName}</span>
                    </div>
                    {isExpanded ? 
                      <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    }
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 py-3 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sectionData.pages.map((page, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 rounded text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                            {page}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tips adicionales */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Tips para tu estructura:</h3>
            <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Mantén la navegación simple y clara.</li>
              <li>Incluye un buscador si tienes mucho contenido.</li>
              <li>Considera la experiencia móvil en la estructura.</li>
              <li>Incluye páginas legales (Privacidad, Términos) si es necesario.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteStructureBuilder;