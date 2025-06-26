# 🚀 Instalación del Sistema de Logística JT

## 📋 Requisitos Previos

1. **Python 3.8 o superior**
   - Descargar desde: https://www.python.org/downloads/
   - Asegúrate de marcar "Add Python to PATH" durante la instalación

2. **pip** (gestor de paquetes de Python)
   - Viene incluido con Python

## 🛠️ Pasos de Instalación

### 1. Verificar Python
```bash
python --version
# o
python3 --version
```

### 2. Instalar Dependencias
```bash
pip install -r requirements.txt
```

### 3. Inicializar Base de Datos
```bash
python init_db.py
```

### 4. Ejecutar la Aplicación
```bash
python app.py
```

### 5. Acceder a la Aplicación
- **URL**: http://localhost:5001
- **Usuario**: admin
- **Contraseña**: admin123

## 🔧 Solución de Problemas

### Si Python no se encuentra:
1. Reinstalar Python marcando "Add Python to PATH"
2. Reiniciar la terminal
3. Verificar con `python --version`

### Si hay errores de dependencias:
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### Si hay errores de base de datos:
```bash
# Eliminar archivo de base de datos existente
del logistica.db
# Volver a inicializar
python init_db.py
```

## 📁 Estructura del Proyecto

```
logistica_flask/
├── app.py                 # Aplicación principal
├── config.py             # Configuración
├── extensions.py         # Extensiones Flask
├── models.py             # Modelos de base de datos
├── routes.py             # Rutas y controladores
├── init_db.py            # Inicialización de BD
├── requirements.txt      # Dependencias
├── README.md            # Documentación
├── INSTALACION.md       # Este archivo
└── templates/           # Plantillas HTML
    ├── base.html
    ├── login.html
    ├── dashboard.html
    ├── rutas/
    ├── clientes/
    ├── vehiculos/
    ├── choferes/
    ├── guias/
    ├── facturas/
    └── perfil/
```

## 🎯 Funcionalidades Disponibles

- ✅ **Dashboard** con estadísticas
- ✅ **Gestión de Rutas** (crear, listar)
- ✅ **Gestión de Clientes** (crear, listar)
- ✅ **Gestión de Vehículos** (crear, listar)
- ✅ **Gestión de Choferes** (crear, listar)
- ✅ **Gestión de Guías** (crear, listar)
- ✅ **Facturación** (crear, listar)
- ✅ **Perfil de Usuario** (ver, editar)
- ✅ **Sistema de Login** completo

## 🔒 Seguridad

- Autenticación requerida para todas las páginas
- Hashing seguro de contraseñas
- Protección CSRF
- Sesiones seguras

## 🎨 Interfaz

- Diseño responsive con Bootstrap 5
- Iconos Font Awesome
- Gradientes modernos
- Animaciones suaves

## 📞 Soporte

Si tienes problemas con la instalación:
1. Verifica que Python esté instalado correctamente
2. Asegúrate de que todas las dependencias se instalen
3. Revisa los logs de error en la consola
4. Verifica que el puerto 5001 esté disponible

¡La aplicación está lista para usar! 🎉 