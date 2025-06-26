# 🚀 Instalación Rápida - Sistema de Gestión Pollería JT

## ⚡ Instalación en 5 minutos

### 1. Requisitos Previos
- Python 3.8 o superior
- pip (gestor de paquetes)

### 2. Descargar e Instalar

```bash
# 1. Clonar o descargar el proyecto
git clone <url-del-repositorio>
cd polleriaJT

# 2. Crear entorno virtual
python -m venv venv

# 3. Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Configurar sistema inicial
python setup.py

# 6. Ejecutar aplicación
python app.py
```

### 3. Acceder al Sistema
- 🌐 Abrir navegador: `http://localhost:5000`
- 👤 Usuario: `admin`
- 🔑 Contraseña: `admin123`

## 📋 Datos Iniciales Creados

### 👥 Usuarios
- **admin** / admin123 (Administrador)

### 🍗 Productos del Menú
- Combos (Pollo a la Brasa, Familiar, Ejecutivo)
- Platos principales (1/4, 1/2, Entero, Broaster)
- Acompañamientos (Papas, Ensaladas, Arroz)
- Bebidas (Gaseosas, Chicha, Limonada)
- Postres (Flan, Tres Leches, Helado)

### 📦 Insumos Básicos
- Pollo, Papas, Aceite, Sal, Pimienta
- Verduras (Cebolla, Zanahoria, Lechuga, Tomate)
- Bebidas (Gaseosas, Agua)
- Empaques (Cajas, Bolsas, Servilletas)
- Combustibles (Carbón, Leña)

## 🎯 Primeros Pasos

### 1. Abrir Caja
1. Ir a "Caja" en el menú
2. Hacer clic en "Abrir Caja"
3. Ingresar monto inicial (ej: 100.00)

### 2. Registrar Primera Venta
1. Ir a "Ventas"
2. Seleccionar productos del menú
3. Elegir tipo de venta (mostrador/takeout/delivery)
4. Seleccionar método de pago
5. Procesar venta

### 3. Control de Cocina
1. Ir a "Cocina"
2. Ver pedidos pendientes
3. Marcar como "En Preparación"
4. Marcar como "Listo" cuando termine

### 4. Cerrar Caja
1. Ir a "Caja"
2. Registrar egresos si los hay
3. Hacer clic en "Cerrar Caja"
4. Ingresar monto final para arqueo

## 🔧 Configuración Avanzada

### Personalizar Productos
- Editar en `app.py` o usar la interfaz web
- Agregar nuevos productos según el menú

### Configurar Alertas de Stock
- Ajustar `stock_minimo` en cada insumo
- Sistema alertará cuando el stock esté bajo

### Backup Automático
- El sistema incluye backup automático
- Los datos se guardan en `polleria.db`

## 🆘 Solución de Problemas

### Error: "No module named 'flask'"
```bash
pip install -r requirements.txt
```

### Error: "Database is locked"
- Cerrar la aplicación
- Eliminar archivo `polleria.db`
- Ejecutar `python setup.py` nuevamente

### Error: "Port 5000 already in use"
```bash
# Cambiar puerto en app.py
app.run(debug=True, port=5001)
```

### Error: "Permission denied"
```bash
# En Linux/macOS
chmod +x setup.py
```

## 📞 Soporte

- 📧 Email: soporte@polleriajt.com
- 📱 WhatsApp: +51 999 999 999
- 🌐 Web: www.polleriajt.com

## 🔄 Actualizaciones

Para actualizar el sistema:
```bash
git pull origin main
pip install -r requirements.txt
python setup.py
```

---

**¡Listo! Tu sistema de gestión está funcionando** 🎉

Ahora puedes comenzar a usar todas las funcionalidades:
- ✅ Ventas y tickets
- ✅ Control de caja
- ✅ Gestión de inventario
- ✅ Panel de cocina
- ✅ Delivery
- ✅ Reportes y análisis 