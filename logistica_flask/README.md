# Sistema de Logística JT - Flask

Sistema de gestión logística desarrollado con Flask, similar al Centro Naturista pero adaptado para gestión de transporte y logística.

## 🚀 Características

- **Gestión de Rutas**: Crear y administrar rutas de transporte
- **Gestión de Clientes**: Registro y administración de clientes
- **Gestión de Vehículos**: Control de flota vehicular
- **Gestión de Choferes**: Administración de conductores
- **Gestión de Guías**: Control de guías turísticos/logísticos
- **Facturación**: Sistema completo de facturación
- **Dashboard**: Panel de control con estadísticas
- **Perfil de Usuario**: Gestión de cuenta de administrador

## 📋 Requisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

## 🛠️ Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd logistica_flask
   ```

2. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

3. **Inicializar la base de datos**
   ```bash
   python init_db.py
   ```

4. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```

5. **Acceder a la aplicación**
   - URL: http://localhost:5001
   - Usuario: admin
   - Contraseña: admin123

## 📁 Estructura del Proyecto

```
logistica_flask/
├── app.py                 # Aplicación principal Flask
├── config.py             # Configuración de la aplicación
├── extensions.py         # Extensiones Flask (DB, Login)
├── models.py             # Modelos de base de datos
├── routes.py             # Rutas y controladores
├── init_db.py            # Script de inicialización
├── requirements.txt      # Dependencias Python
├── templates/            # Plantillas HTML
│   ├── base.html         # Plantilla base
│   ├── login.html        # Página de login
│   ├── dashboard.html    # Dashboard principal
│   ├── rutas/            # Plantillas de rutas
│   ├── clientes/         # Plantillas de clientes
│   ├── vehiculos/        # Plantillas de vehículos
│   ├── choferes/         # Plantillas de choferes
│   ├── guias/            # Plantillas de guías
│   ├── facturas/         # Plantillas de facturas
│   └── perfil/           # Plantillas de perfil
└── static/               # Archivos estáticos (CSS, JS, imágenes)
```

## 🔧 Configuración

### Variables de Entorno (Opcional)
Crear un archivo `.env` en la raíz del proyecto:

```env
SECRET_KEY=tu-clave-secreta-aqui
DATABASE_URL=sqlite:///logistica.db
```

### Base de Datos
- **Por defecto**: SQLite (`logistica.db`)
- **Personalizable**: Cambiar `DATABASE_URL` en `config.py`

## 👤 Usuarios por Defecto

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin   | admin123   | Administrador |

## 🎯 Módulos Principales

### 1. Dashboard
- Estadísticas generales
- Resumen del día
- Acciones rápidas
- Facturas recientes

### 2. Rutas
- Crear nuevas rutas
- Asignar vehículos y choferes
- Definir precios base
- Gestionar estados

### 3. Clientes
- Registro de clientes
- Información de contacto
- Datos empresariales
- Historial de facturas

### 4. Vehículos
- Registro de flota
- Información técnica
- Estados (activo, mantenimiento, inactivo)
- Capacidad y tipo

### 5. Choferes
- Datos personales
- Licencias de conducir
- Estados (activo, inactivo, suspendido)
- Fechas de vencimiento

### 6. Guías
- Información personal
- Especialidades
- Idiomas
- Estados

### 7. Facturas
- Generación automática de números
- Cálculo de IGV
- Estados de pago
- Historial completo

## 🔒 Seguridad

- Autenticación de usuarios
- Protección de rutas con `@login_required`
- Hashing seguro de contraseñas
- Sesiones seguras

## 🎨 Interfaz

- Diseño responsive con Bootstrap 5
- Iconos Font Awesome
- Gradientes modernos
- Animaciones suaves
- Tablas interactivas

## 🚀 Despliegue

### Desarrollo
```bash
python app.py
```

### Producción
```bash
# Usar un servidor WSGI como Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

## 📝 Notas

- La aplicación usa el puerto 5001 por defecto
- La base de datos se crea automáticamente en la primera ejecución
- Todos los módulos están protegidos por autenticación
- El sistema es completamente funcional desde la instalación

## 🤝 Contribuciones

Para contribuir al proyecto:
1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. 