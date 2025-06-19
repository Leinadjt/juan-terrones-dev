import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Home, Users, ShoppingCart, Mail, Info, FileText, Image, Settings, Search } from 'lucide-react';

const WebsiteStructureBuilder = () => {
  const [selectedType, setSelectedType] = useState('corporate');
  const [expandedSections, setExpandedSections] = useState({});

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const currentSite = siteTypes[selectedType];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <Globe className="text-blue-500" />
          Generador de Estructuras Web
        </h1>
        <p className="text-gray-600">Selecciona el tipo de sitio web y explora su estructura recomendada</p>
      </div>

      {/* Selector de tipo de sitio */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Tipo de Sitio Web</h2>
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
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-4 h-4 rounded-full ${currentSite.color}`}></div>
          <h2 className="text-2xl font-bold text-gray-800">{currentSite.name}</h2>
        </div>

        <div className="space-y-3">
          {Object.entries(currentSite.structure).map(([sectionName, sectionData]) => {
            const Icon = sectionData.icon;
            const isExpanded = expandedSections[sectionName];
            
            return (
              <div key={sectionName} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionName)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
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
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
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
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Mantén la navegación simple y clara</li>
            <li>• Incluye un buscador si tienes mucho contenido</li>
            <li>• Considera la experiencia móvil en la estructura</li>
            <li>• Incluye páginas legales (Privacidad, Términos) si es necesario</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WebsiteStructureBuilder;