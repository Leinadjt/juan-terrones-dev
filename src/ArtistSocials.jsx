import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaYoutube, FaSpotify, FaTiktok, FaTwitter, FaFacebook, FaSoundcloud, FaGlobe, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import profileImg from './assets/profile.jpg';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/juanda.t.b/',
    icon: <FaInstagram className="text-pink-500" />, color: 'hover:bg-pink-500/30',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/',
    icon: <FaYoutube className="text-red-500" />, color: 'hover:bg-red-500/30',
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/',
    icon: <FaSpotify className="text-green-400" />, color: 'hover:bg-green-400/30',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@juandax19',
    icon: <FaTiktok className="text-black dark:text-white" />, color: 'hover:bg-black/30',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/',
    icon: <FaTwitter className="text-sky-400" />, color: 'hover:bg-sky-400/30',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61553420795675',
    icon: <FaFacebook className="text-blue-600" />, color: 'hover:bg-blue-600/30',
  },
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/',
    icon: <FaSoundcloud className="text-orange-400" />, color: 'hover:bg-orange-400/30',
  },
  {
    name: 'Website',
    href: 'https://juanterrones.dev',
    icon: <FaGlobe className="text-purple-500" />, color: 'hover:bg-purple-500/30',
  },
  {
    name: 'Email',
    href: 'mailto:juanterrones189@gmail.com',
    icon: <FaEnvelope className="text-green-400" />, color: 'hover:bg-green-400/30',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/51977517628',
    icon: <FaWhatsapp className="text-green-500" />, color: 'hover:bg-green-500/30',
  },
];

export default function ArtistSocials() {
  const floatingRef = useRef();
  const navigate = useNavigate();

  // Floating elements animation
  useEffect(() => {
    const createFloating = () => {
      const el = document.createElement('div');
      el.className = 'absolute w-1 h-1 bg-white/30 rounded-full';
      el.style.left = Math.random() * 100 + '%';
      el.style.animation = `float 15s linear infinite`;
      el.style.animationDelay = Math.random() * 5 + 's';
      floatingRef.current.appendChild(el);
      setTimeout(() => el.remove(), 20000);
    };
    const interval = setInterval(createFloating, 3000);
    return () => clearInterval(interval);
  }, []);

  // Ripple effect on avatar
  const avatarRef = useRef();
  const handleAvatarClick = (e) => {
    const avatar = avatarRef.current;
    const ripple = document.createElement('span');
    ripple.className = 'absolute left-1/2 top-1/2 w-16 h-16 bg-white/30 rounded-full pointer-events-none';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    avatar.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // Custom keyframes for gradient and ripple
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
      }
      @keyframes ripple {
        to { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-gray-800 to-indigo-900 animate-none overflow-x-hidden" style={{backgroundSize:'400% 400%', animation:'gradientShift 15s ease infinite'}}>
      {/* Floating elements */}
      <div ref={floatingRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Contenido principal centrado */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-2 md:p-10 shadow-2xl border border-white/20 text-center overflow-hidden">
          {/* Avatar */}
          <div className="relative flex justify-center mb-6">
            <div
              ref={avatarRef}
              onClick={handleAvatarClick}
              className="relative w-32 h-32 rounded-full border-4 border-white/30 shadow-lg flex items-center justify-center text-6xl cursor-pointer bg-gradient-to-tr from-blue-700 via-gray-700 to-indigo-800 animate-none"
              style={{backgroundSize:'300% 300%', animation:'gradientShift 8s ease infinite'}}
            >
              <img
                src={profileImg}
                alt="Juan Terrones"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          {/* Nombre y bio */}
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow animate-pulse">Juan Terrones</h1>
          <p className="text-white/90 text-base mb-6">Desarrollador Full Stack | Especialista en Tecnología</p>
          {/* Social links */}
          <div className="flex flex-col gap-3 mb-6">
            {socials.map((s, i) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 bg-white/20 border border-white/30 rounded-xl text-white font-medium text-lg transition-all duration-200 hover:bg-white/30 ${s.color} relative overflow-hidden`}
              >
                <span className="text-2xl social-icon">{s.icon}</span>
                <span className="flex-1 text-left">{s.name}</span>
              </a>
            ))}
          </div>
          <div className="text-white/80 text-sm mt-4">Sígueme en todas mis redes sociales 💫</div>
        </div>
      </div>

      {/* Footer a todo el ancho */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
