import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock, FaStar, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const menuData = [
  {
    id: 1,
    name: 'Ceviche Clásico',
    description: 'Pescado fresco marinado en limón, cebolla y ají limo',
    price: 'S/ 25',
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Lomo Saltado',
    description: 'Tiras de lomo fino salteadas con cebolla, tomate y papas fritas',
    price: 'S/ 35',
    category: 'fondos',
    image: 'https://blog.plazavea.com.pe/wp-content/uploads/2023/05/la-receta-de-lomo-saltado.jpg'
  },
  {
    id: 3,
    name: 'Ají de Gallina',
    description: 'Pollo deshilachado en salsa de ají amarillo con arroz y papas',
    price: 'S/ 28',
    category: 'fondos',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Anticuchos',
    description: 'Brochetas de corazón de res marinadas y asadas a la parrilla',
    price: 'S/ 18',
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Suspiro a la Limeña',
    description: 'Postre tradicional de manjar blanco con merengue italiano',
    price: 'S/ 12',
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Chicha Morada',
    description: 'Bebida tradicional de maíz morado con piña y manzana',
    price: 'S/ 8',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Pollo a la Brasa',
    description: 'Pollo marinado y asado a la brasa con papas y ensalada',
    price: 'S/ 45',
    category: 'fondos',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Causa Limeña',
    description: 'Puré de papa amarilla relleno de pollo o atún',
    price: 'S/ 20',
    category: 'entradas',
    image: 'https://sabordelobueno.com/wp-content/uploads/2020/05/causa-de-pollo-1-1024x689.jpg'
  }
];

const testimonios = [
  {
    id: 1,
    nombre: 'María González',
    comentario: 'La mejor comida peruana que he probado. El ceviche es espectacular!',
    calificacion: 5,
    ubicacion: 'Lima'
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    comentario: 'Excelente servicio de delivery, llegó caliente y a tiempo.',
    calificacion: 5,
    ubicacion: 'Miraflores'
  },
  {
    id: 3,
    nombre: 'Ana Torres',
    comentario: 'Los precios son justos y la calidad es increíble. Recomendado!',
    calificacion: 5,
    ubicacion: 'San Isidro'
  }
];

const categorias = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'entradas', nombre: 'Entradas' },
  { id: 'fondos', nombre: 'Platos de Fondo' },
  { id: 'postres', nombre: 'Postres' },
  { id: 'bebidas', nombre: 'Bebidas' },
  { id: 'promociones', nombre: 'Promociones' }
];

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', alt: 'Ceviche Fresco' },
  { id: 2, src: 'https://blog.plazavea.com.pe/wp-content/uploads/2023/05/la-receta-de-lomo-saltado.jpg', alt: 'Lomo Saltado Jugoso' },
  { id: 3, src: 'https://www.jamear.com/wp-content/uploads/2022/05/arrozconpollo-peruano.png', alt: 'Plato peruano con arroz' },
  { id: 4, src: 'https://i.ytimg.com/vi/tc3DuYwPJAQ/maxresdefault.jpg', alt: 'Pescado frito con yuca' },
  { id: 5, src: 'https://www.paulinacocina.net/wp-content/uploads/2021/12/arroz-chaufa-peruano-receta-1200x800.jpg', alt: 'Arroz Chaufa' },
  { id: 6, src: 'https://imag.bonviveur.com/tacu-tacu-con-huevo-y-patano-macho.webp', alt: 'Tacu Tacu' }
];

export default function RestauranteJT() {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });
  const [formSent, setFormSent] = useState(false);

  const menuFiltrado = categoriaActiva === 'todos' 
    ? menuData 
    : menuData.filter(item => item.category === categoriaActiva);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        mensaje: ''
      });
    }, 3000);
  };

  const enviarWhatsApp = (plato = '') => {
    const mensaje = plato 
      ? `Hola, quisiera pedir: ${plato}`
      : 'Hola, quisiera hacer un pedido';
    const url = `https://wa.me/51977517628?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurante"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Sabor Peruano Auténtico
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Los mejores platos de la gastronomía peruana en tu mesa
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
            >
              Ver Menú
            </button>
            <button
              onClick={() => enviarWhatsApp()}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp />
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Información de Delivery */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Delivery Gratis</h3>
              <p>En pedidos mayores a S/ 50</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">30 Minutos</h3>
              <p>Tiempo promedio de entrega</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Toda Lima</h3>
              <p>Cobertura en toda la ciudad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menú */}
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Menú</h2>
          
          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`px-6 py-2 rounded-full transition ${
                  categoriaActiva === categoria.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>

          {/* Grid de platos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuFiltrado.map((plato) => (
              <div key={plato.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48">
                  <img
                    src={plato.image}
                    alt={plato.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {plato.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plato.name}</h3>
                  <p className="text-gray-600 mb-4">{plato.description}</p>
                  <button
                    onClick={() => enviarWhatsApp(plato.name)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />
                    Pedir por WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
              <p className="text-lg text-gray-700 mb-4">
                Con más de 15 años de experiencia, Restaurante JT se ha convertido en un referente 
                de la gastronomía peruana en Lima. Nuestros chefs utilizan ingredientes frescos y 
                técnicas tradicionales para crear platos auténticos que transportan a nuestros 
                clientes a los sabores más puros del Perú.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Nos especializamos en ceviches, anticuchos, lomo saltado y todos los platos 
                emblemáticos de nuestra rica tradición culinaria.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">15+</div>
                  <div className="text-gray-600">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">1000+</div>
                  <div className="text-gray-600">Clientes satisfechos</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
                alt="Nuestro restaurante"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
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

      {/* Galería */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Galería</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-orange-600 text-white">
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
                  <FaMapMarkerAlt className="mr-3" />
                  <span>Av. Principal 123, Lima - Perú</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-3" />
                  <span>Lun - Dom: 12:00 PM - 10:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-800"
                />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Tu teléfono"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-800"
                />
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Tu mensaje"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg text-gray-800"
                ></textarea>
                <button
                  type="submit"
                  disabled={formSent}
                  className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:bg-gray-300"
                >
                  {formSent ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/51977517628?text=Hola,%20quisiera%20hacer%20un%20pedido"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
} 