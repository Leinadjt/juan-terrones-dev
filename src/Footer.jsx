import { FaEnvelope, FaFacebookMessenger, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2c3440] text-gray-200 pt-10 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Sobre Mí */}
          <div>
            <h3 className="text-xl font-bold mb-2">Sobre Mí</h3>
            <p>
              Desarrollador apasionado por la tecnología y la innovación, <br />
              siempre buscando nuevos desafíos y oportunidades para crecer profesionalmente.
            </p>
          </div>
          {/* Servicios */}
          <div>
            <h3 className="text-xl font-bold mb-2">Servicios</h3>
            <p>
              Desarrollo Web Full Stack &bull; Consultoría Técnica &bull; Arquitectura de Software &bull; Optimización de Performance
            </p>
          </div>
          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p>
              ¿Tienes un proyecto en mente? No dudes en contactarme.<br />
              Estoy disponible para colaboraciones y oportunidades laborales.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="mailto:juanterrones189@gmail.com"
                className="bg-gray-700 hover:bg-green-500 text-white rounded-full p-3 transition-colors"
                title="Enviar correo"
              >
                <FaEnvelope size={22} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61553420795675"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 text-white rounded-full p-3 transition-colors"
                title="Facebook Messenger"
              >
                <FaFacebookMessenger size={22} />
              </a>
              <a
                href="https://wa.me/51977517628"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-green-600 text-white rounded-full p-3 transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp size={22} />
              </a>
              <a
                href="https://instagram.com/juanda.t.b/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-pink-500 text-white rounded-full p-3 transition-colors"
                title="Instagram"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-600" />
        <div className="text-center text-gray-400 text-sm">
          © 2025 Juan Terrones. Todos los derechos reservados. | Diseñado con <span className="text-red-500">❤️</span> en Lima, Perú
        </div>
      </div>
    </footer>
  );
}
