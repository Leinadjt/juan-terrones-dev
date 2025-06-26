# 🍗 Sistema de Gestión para Pollería JT

Un sistema completo de gestión empresarial diseñado específicamente para pollerías, que incluye control de ventas, inventario, caja, cocina, delivery y reportes.

## ✨ Características Principales

### 🛒 Módulo de Ventas
- **Registro rápido de ventas** con interfaz intuitiva
- **Selección de productos** por categorías (combos, platos, bebidas, postres)
- **Múltiples métodos de pago** (efectivo, Yape, tarjeta)
- **Tipos de venta** (mostrador, take out, delivery)
- **Generación de tickets** en PDF
- **Historial completo** de ventas

### 💰 Módulo de Caja
- **Apertura y cierre de caja** por turnos
- **Control de egresos** menores (compras rápidas, delivery, etc.)
- **Arqueo automático** con cálculo de diferencias
- **Reportes por turno** y por día
- **Registro de cajeros** y responsabilidades

### 📦 Módulo de Inventario
- **Control de stock** en tiempo real
- **Alertas automáticas** de stock bajo
- **Kardex completo** con historial de movimientos
- **Unidades flexibles** (kg, unidades, litros, etc.)
- **Precios unitarios** y costos
- **Ajustes de inventario** con conceptos

### 🛍️ Módulo de Compras
- **Registro de compras** a proveedores
- **Facturas y boletas** de proveedores
- **Actualización automática** del inventario
- **Historial de compras** por proveedor
- **Reportes de gastos** mensuales

### 👨‍🍳 Módulo de Cocina
- **Panel en tiempo real** de pedidos
- **Estados de pedidos** (pendiente, en preparación, listo)
- **Timers automáticos** para seguimiento
- **Notificaciones** de pedidos listos
- **Cálculo de consumo** de insumos

### 🚚 Módulo de Delivery
- **Gestión completa** de pedidos a domicilio
- **Información del cliente** (nombre, dirección, teléfono)
- **Seguimiento de estado** (pendiente, en camino, entregado)
- **Tiempos de entrega** estimados
- **Historial de deliveries**

### 📊 Módulo de Reportes
- **Reportes de ventas** por día, semana, mes
- **Análisis de inventario** y consumo
- **Reportes de caja** y arqueos
- **Estadísticas de delivery**
- **Gráficos interactivos** con Chart.js
- **Exportación** a Excel y PDF
- **Integración** con Google Sheets (opcional)

## 🚀 Instalación

### Requisitos Previos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd polleriaJT
```

2. **Crear entorno virtual**
```bash
python -m venv venv
```

3. **Activar entorno virtual**
```bash
# En Windows
venv\Scripts\activate

# En macOS/Linux
source venv/bin/activate
```

4. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

5. **Ejecutar la aplicación**
```bash
python app.py
```

6. **Acceder al sistema**
- Abrir navegador en: `http://localhost:5000`
- Usuario: `admin`
- Contraseña: `admin123`

## 📋 Configuración Inicial

### 1. Crear Productos
Antes de usar el sistema, debe crear los productos del menú:

```python
# Ejemplo de productos básicos
productos = [
    {"nombre": "Combo Pollo a la Brasa", "precio": 25.00, "categoria": "combo"},
    {"nombre": "1/4 Pollo a la Brasa", "precio": 15.00, "categoria": "plato"},
    {"nombre": "1/2 Pollo a la Brasa", "precio": 28.00, "categoria": "plato"},
    {"nombre": "Pollo Entero", "precio": 50.00, "categoria": "plato"},
    {"nombre": "Papas Fritas", "precio": 8.00, "categoria": "plato"},
    {"nombre": "Ensalada César", "precio": 12.00, "categoria": "plato"},
    {"nombre": "Gaseosa", "precio": 5.00, "categoria": "bebida"},
    {"nombre": "Chicha Morada", "precio": 4.00, "categoria": "bebida"},
    {"nombre": "Flan", "precio": 6.00, "categoria": "postre"}
]
```

### 2. Configurar Insumos
Crear los insumos principales:

```python
# Ejemplo de insumos básicos
insumos = [
    {"nombre": "Pollo", "unidad": "kg", "stock_actual": 100, "stock_minimo": 20, "precio_unitario": 12.00},
    {"nombre": "Papas", "unidad": "kg", "stock_actual": 50, "stock_minimo": 10, "precio_unitario": 3.50},
    {"nombre": "Aceite", "unidad": "litros", "stock_actual": 20, "stock_minimo": 5, "precio_unitario": 8.00},
    {"nombre": "Gaseosas", "unidad": "unidades", "stock_actual": 100, "stock_minimo": 20, "precio_unitario": 2.50}
]
```

## 🎯 Uso del Sistema

### Flujo de Trabajo Típico

1. **Apertura de Caja**
   - Ir a "Caja" → "Abrir Caja"
   - Ingresar monto inicial

2. **Registro de Ventas**
   - Ir a "Ventas"
   - Seleccionar productos del menú
   - Elegir tipo de venta y método de pago
   - Procesar venta y generar ticket

3. **Control de Cocina**
   - Los pedidos aparecen automáticamente en "Cocina"
   - Marcar como "En Preparación" → "Listo"
   - Sistema actualiza inventario automáticamente

4. **Gestión de Delivery**
   - Para ventas delivery, completar información del cliente
   - Seguir estado: Pendiente → En Camino → Entregado

5. **Control de Inventario**
   - Registrar compras de insumos
   - Sistema actualiza stock automáticamente
   - Alertas de stock bajo

6. **Cierre de Caja**
   - Registrar egresos menores
   - Cerrar caja con arqueo
   - Generar reporte del día

### Funciones Avanzadas

#### Reportes Personalizados
- Filtrar por fechas específicas
- Exportar a Excel o PDF
- Gráficos interactivos de ventas

#### Integración con Google Sheets
```python
# Configurar en app.py
GOOGLE_SHEETS_CONFIG = {
    'credentials_file': 'credentials.json',
    'spreadsheet_id': 'tu-spreadsheet-id'
}
```

#### Backup Automático
El sistema incluye backup automático de la base de datos SQLite.

## 🔧 Personalización

### Modificar Menú de Productos
Editar en `app.py` o usar la interfaz web para agregar/modificar productos.

### Configurar Alertas de Stock
Ajustar `stock_minimo` en cada insumo según necesidades.

### Personalizar Reportes
Modificar templates en `templates/reportes.html` para agregar nuevos reportes.

## 🛡️ Seguridad

- **Autenticación** de usuarios
- **Roles** (admin, cajero, cocinero)
- **Logs** de todas las operaciones
- **Backup** automático de datos

## 📱 Características Técnicas

- **Backend**: Flask (Python)
- **Base de Datos**: SQLite
- **Frontend**: Bootstrap 5 + jQuery
- **Gráficos**: Chart.js
- **PDF**: ReportLab
- **Responsive**: Compatible con móviles y tablets

## 🔄 Actualizaciones

### Versión 1.0
- Módulos básicos implementados
- Interfaz web completa
- Reportes básicos

### Próximas Versiones
- [ ] App móvil para delivery
- [ ] Integración con POS físicos
- [ ] Módulo de empleados y nómina
- [ ] Dashboard en tiempo real
- [ ] Notificaciones push

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@polleriajt.com
- Teléfono: +51 999 999 999

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ por Juan Terrones** 