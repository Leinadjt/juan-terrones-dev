import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import profileImg from './assets/profile.jpg'; // Ajusta la ruta si es necesario
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const noBackButtonPaths = ['/', '/gestor-jt/basico', '/gestor-jt/profesional', '/gestor-jt/empresarial', '/registro-cliente', '/polleria/basico', '/polleria/pro', '/polleria/anual', '/lubricante/basico', '/lubricante/pro', '/lubricante/anual', '/logistica/basico', '/logistica/profesional', '/logistica/corporativo'];

  // Si la ruta actual está en la lista de no mostrar el botón, o no estamos en la página de inicio, muestra solo el botón de volver
  if (!noBackButtonPaths.includes(location.pathname)) {
    return (
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 bg-white/30 hover:bg-white/60 text-gray-800 rounded-full p-2 shadow-lg z-50 transition"
        title="Ir a inicio"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L10 14L18 22" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  // Si estamos en la página de inicio o en /juan-terrones-dev, muestra el header completo
  if (location.pathname === '/' || location.pathname === '/juan-terrones-dev') {
    return (
      <header className="relative h-[420px] flex flex-col items-center justify-center text-white">
        {/* Fondo con overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
            alt="Fondo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center w-full py-6 px-2">
            {/* Imagen de perfil */}
            <img
              src={profileImg}
              alt="Juan Terrones"
              className="w-20 h-20 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover mb-2"
            />
            {/* Nombre y subtítulo */}
            <h1 className="text-xl md:text-4xl font-bold mb-1 text-center">Juan Terrones</h1>
            <p className="text-sm md:text-xl text-gray-200 mb-3 text-center">
              Desarrollador Full Stack | Especialista en Tecnología
            </p>
            {/* Grid de datos */}
            <div className="grid  md:grid-cols-3 gap-2 md:gap-4 w-full max-w-4xl mx-auto">
              {/* Email */}
              <a
                href="mailto:juanterrones189@gmail.com"
                className="flex items-center justify-center gap-2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 rounded-full px-6 py-3 text-base md:text-lg text-white font-normal transition w-full max-w-xs truncate"
              >
                <span className="text-xl">📧</span>
                <span className="truncate">juanterrones189@gmail.com</span>
              </a>
              {/* Teléfono */}
              <a
                href="tel:+51977517628"
                className="flex items-center justify-center gap-2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 rounded-full px-6 py-3 text-base md:text-lg text-white font-normal transition w-full max-w-xs truncate"
              >
                <span className="text-xl">📱</span>
                <span className="truncate">+51 977517628</span>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/juan-terrones-1617b9253"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 rounded-full px-6 py-3 text-base md:text-lg text-white font-normal transition w-full max-w-xs truncate"
              >
                <span className="text-xl text-blue-400">🔗</span>
                <span className="truncate">linkedin.com/in/juan-terrones-1617b9253</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  // Si estamos en una de las páginas de los planes o registro, no muestra nada
  return null;
}
