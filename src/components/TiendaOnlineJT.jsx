import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaHeart, FaStar, FaWhatsapp, FaTruck, FaShieldAlt, FaMedal, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const productos = [
  {
    id: 1,
    nombre: 'Camiseta Premium',
    precio: 89.90,
    precioOriginal: 120.00,
    categoria: 'ropa',
    imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Camiseta de algodón premium con diseño moderno y cómodo ajuste.',
    calificacion: 4.5,
    reseñas: 128,
    stock: 15
  },
  {
    id: 2,
    nombre: 'Jeans Clásicos',
    precio: 129.90,
    precioOriginal: 180.00,
    categoria: 'ropa',
    imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Jeans de alta calidad con corte clásico y máxima durabilidad.',
    calificacion: 4.8,
    reseñas: 95,
    stock: 8
  },
  {
    id: 3,
    nombre: 'Zapatillas Sport',
    precio: 159.90,
    precioOriginal: 220.00,
    categoria: 'calzado',
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Zapatillas deportivas con tecnología de amortiguación avanzada.',
    calificacion: 4.7,
    reseñas: 203,
    stock: 12
  },
  {
    id: 4,
    nombre: 'Bolso Elegante',
    precio: 199.90,
    precioOriginal: 280.00,
    categoria: 'accesorios',
    imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Bolso elegante con múltiples compartimentos y diseño atemporal.',
    calificacion: 4.6,
    reseñas: 67,
    stock: 5
  },
  {
    id: 5,
    nombre: 'Reloj Clásico',
    precio: 299.90,
    precioOriginal: 450.00,
    categoria: 'accesorios',
    imagen: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Reloj de pulsera clásico con movimiento automático suizo.',
    calificacion: 4.9,
    reseñas: 156,
    stock: 3
  },
  {
    id: 6,
    nombre: 'Gafas de Sol',
    precio: 89.90,
    precioOriginal: 150.00,
    categoria: 'accesorios',
    imagen: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Gafas de sol con protección UV y diseño moderno.',
    calificacion: 4.4,
    reseñas: 89,
    stock: 20
  }
];

const categorias = [
  { id: 'todos', nombre: 'Todos', icono: '🛍️' },
  { 
    id: 'ropa', 
    nombre: 'Ropa', 
    icono: '👕', 
    imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 'accesorios', 
    nombre: 'Accesorios', 
    icono: '👜',
    imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'calzado', 
    nombre: 'Calzado', 
    icono: '👟',
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'promociones', 
    nombre: 'Promociones', 
    icono: '🏷️',
    imagen: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80'
  }
];

export default function TiendaOnlineJT() {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const productosFiltrados = categoriaActiva === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaActiva);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      setCarrito(carrito.map(item => 
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const removerDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removerDelCarrito(productoId);
    } else {
      setCarrito(carrito.map(item => 
        item.id === productoId 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      ));
    }
  };

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const enviarWhatsApp = (producto = null) => {
    const mensaje = producto 
      ? `Hola, me interesa el producto: ${producto.nombre} - S/ ${producto.precio}`
      : 'Hola, quisiera consultar sobre productos';
    const url = `https://wa.me/51977517628?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carrito Flotante */}
      {mostrarCarrito && (
        <div className="fixed top-20 right-4 bg-white rounded-lg shadow-xl p-6 w-80 z-50">
          <h3 className="text-lg font-semibold mb-4">Carrito de Compras</h3>
          {carrito.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {carrito.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img src={item.imagen} alt={item.nombre} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.nombre}</h4>
                      <p className="text-blue-600 font-semibold">S/ {item.precio}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.cantidad}</span>
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">S/ {totalCarrito.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  Proceder al Pago
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section id="inicio" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a Tienda JT
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Descubre productos únicos y de calidad para tu estilo
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition"
            >
              Ver Productos
            </button>
            <button
              onClick={() => enviarWhatsApp()}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp />
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4 text-blue-600 flex justify-center">
                <FaTruck />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
              <p>En compras mayores a S/50</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-blue-600 flex justify-center">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagos Seguros</h3>
              <p>Múltiples métodos de pago</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-blue-600 flex justify-center">
                <FaMedal />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía</h3>
              <p>30 días de garantía</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-blue-600 flex justify-center">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p>Atención personalizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
          
          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`px-6 py-2 rounded-full transition flex items-center gap-2 ${
                  categoriaActiva === categoria.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{categoria.icono}</span>
                {categoria.nombre}
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-64 object-cover"
                  />
                  {producto.precioOriginal > producto.precio && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)}%
                    </div>
                  )}
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition">
                    <FaHeart className="text-gray-400" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < Math.floor(producto.calificacion) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({producto.reseñas})</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{producto.descripcion}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">S/ {producto.precio}</span>
                      {producto.precioOriginal > producto.precio && (
                        <span className="text-gray-400 line-through">S/ {producto.precioOriginal}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">Stock: {producto.stock}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      Agregar
                    </button>
                    <button
                      onClick={() => enviarWhatsApp(producto)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                    >
                      <FaWhatsapp />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestras Categorías */}
      <section id="categorias" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categorias.filter(c => c.id !== 'todos').map((categoria) => (
              <div
                key={categoria.id}
                className="relative group rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 h-80"
                onClick={() => {
                  setCategoriaActiva(categoria.id);
                  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img src={categoria.imagen} alt={categoria.nombre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors"></div>
                <div className="relative z-10 flex flex-col items-center justify-center text-white h-full p-4 text-center">
                  <h3 className="text-3xl font-bold">{categoria.nombre}</h3>
                  <button className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                    Ver Productos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/51977517628?text=Hola,%20quiero%20comprar%20un%20producto"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
} 