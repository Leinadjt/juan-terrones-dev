# 🛢️ Sistema de Gestión Lubricante JT

Sistema completo de gestión para un lubricentro que permite controlar servicios automotrices, inventario de lubricantes y filtros, caja diaria, compras, ventas y reportes.

## 🚀 Características Principales

### 🛠️ Módulo de Servicios y Vehículos
- Registro completo de servicios automotrices
- Gestión de clientes y vehículos
- Historial de servicios por cliente y vehículo
- Control de kilometraje y próximos cambios
- Registro de lubricantes y filtros utilizados

### 🛢️ Módulo de Inventario
- Control de stock de lubricantes, filtros y accesorios
- Alertas de stock mínimo
- Kardex (movimiento de inventario)
- Gestión de precios de compra y venta
- Ajustes de inventario

### 💰 Módulo de Caja
- Apertura y cierre de caja diaria
- Registro de ingresos por ventas
- Control de egresos menores
- Arqueo automático
- Reportes de movimiento de caja

### 🧾 Módulo de Ventas
- Venta de productos y servicios
- Múltiples métodos de pago (efectivo, Yape, tarjeta)
- Generación de tickets
- Historial de ventas

### 🛒 Módulo de Compras
- Registro de compras a proveedores
- Entrada automática al inventario
- Control de facturas y RUC
- Reportes de compras

### 📊 Módulo de Reportes
- Reportes de servicios realizados
- Análisis de ventas
- Control de stock
- Exportación a Google Sheets (próximamente)

## 🛠️ Instalación

### Requisitos Previos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd LubricanteJT
   ```

2. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

3. **Inicializar la base de datos**
   ```bash
   python setup.py
   ```

4. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```

5. **Acceder al sistema**
   - Abrir navegador en: `http://localhost:5001`
   - Usuario: `admin` | Contraseña: `admin123`

## 👥 Usuarios por Defecto

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | Administrador |
| empleado1 | 123456 | Empleado |
| empleado2 | 123456 | Empleado |

## 📋 Estructura del Proyecto

```
LubricanteJT/
├── app.py                 # Aplicación principal Flask
├── setup.py              # Script de inicialización de BD
├── requirements.txt      # Dependencias de Python
├── README.md            # Este archivo
├── templates/           # Plantillas HTML
│   ├── base.html       # Plantilla base
│   ├── login.html      # Página de login
│   ├── index.html      # Dashboard principal
│   ├── servicios.html  # Gestión de servicios
│   ├── inventario.html # Control de inventario
│   ├── caja.html       # Gestión de caja
│   ├── ventas.html     # Ventas
│   ├── compras.html    # Compras
│   └── reportes.html   # Reportes
└── lubricante_jt.db    # Base de datos SQLite
```

## 🗄️ Base de Datos

El sistema utiliza SQLite con las siguientes tablas principales:

- **usuarios**: Gestión de usuarios del sistema
- **clientes**: Información de clientes
- **vehiculos**: Datos de vehículos
- **productos**: Inventario de productos
- **servicios**: Registro de servicios realizados
- **ventas**: Historial de ventas
- **compras**: Registro de compras
- **caja**: Control de caja diaria
- **movimientos_inventario**: Kardex de productos
- **movimientos_caja**: Movimientos de caja

## 🎯 Funcionalidades por Módulo

### Servicios
- ✅ Registro de servicios automotrices
- ✅ Gestión de clientes y vehículos
- ✅ Control de kilometraje
- ✅ Historial de servicios
- ✅ Registro de productos utilizados

### Inventario
- ✅ Control de stock
- ✅ Alertas de stock mínimo
- ✅ Ajustes de inventario
- ✅ Movimiento de productos
- ✅ Gestión de precios

### Caja
- ✅ Apertura/cierre de caja
- ✅ Registro de ingresos
- ✅ Control de egresos
- ✅ Arqueo automático
- ✅ Reportes de caja

### Ventas
- ✅ Venta de productos
- ✅ Múltiples métodos de pago
- ✅ Generación de tickets
- ✅ Historial de ventas

### Compras
- ✅ Registro de compras
- ✅ Entrada automática al inventario
- ✅ Control de proveedores
- ✅ Gestión de facturas

### Reportes
- ✅ Reportes de servicios
- ✅ Análisis de ventas
- ✅ Control de stock
- ✅ Gráficos estadísticos
- 🔄 Exportación a Google Sheets (en desarrollo)

## 🔧 Configuración

### Puerto de la Aplicación
Por defecto, la aplicación se ejecuta en el puerto 5001. Para cambiar el puerto, modificar en `app.py`:

```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Base de Datos
El sistema utiliza SQLite por defecto. Para cambiar a otra base de datos, modificar en `app.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lubricante_jt.db'
```

## 📱 Interfaz de Usuario

El sistema cuenta con una interfaz moderna y responsiva desarrollada con:
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **Font Awesome**: Iconos profesionales
- **jQuery**: Interacciones dinámicas
- **Chart.js**: Gráficos estadísticos

## 🔒 Seguridad

- Autenticación de usuarios
- Control de sesiones
- Encriptación de contraseñas
- Roles de usuario (admin/empleado)

## 📊 Reportes Disponibles

1. **Reporte de Servicios**
   - Servicios realizados por período
   - Análisis por tipo de servicio
   - Control de kilometraje

2. **Reporte de Ventas**
   - Ventas por período
   - Análisis por método de pago
   - Productos más vendidos

3. **Reporte de Stock**
   - Estado actual del inventario
   - Productos con stock bajo
   - Valor total del inventario

4. **Reporte de Compras**
   - Compras por período
   - Análisis por proveedor
   - Control de facturas

## 🚀 Próximas Funcionalidades

- [ ] Exportación a Google Sheets
- [ ] Impresión de tickets
- [ ] Notificaciones push
- [ ] App móvil
- [ ] Backup automático
- [ ] Múltiples sucursales
- [ ] Integración con WhatsApp
- [ ] Reportes avanzados

## 🐛 Solución de Problemas

### Error de puerto ocupado
Si el puerto 5001 está ocupado, cambiar en `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5002)  # Cambiar puerto
```

### Error de dependencias
Si hay problemas con las dependencias:
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### Error de base de datos
Si hay problemas con la base de datos:
```bash
rm lubricante_jt.db  # Eliminar BD corrupta
python setup.py      # Recrear BD
```

## 📞 Soporte

Para soporte técnico o consultas:
- Crear un issue en el repositorio
- Contactar al desarrollador

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**Desarrollado con ❤️ para Lubricante JT** 