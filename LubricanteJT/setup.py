import sqlite3
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

def setup_database():
    conn = sqlite3.connect('lubricante_jt.db')
    cursor = conn.cursor()
    
    # Crear tablas si no existen
    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(80) UNIQUE NOT NULL,
            password_hash VARCHAR(120) NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            rol VARCHAR(20) DEFAULT 'empleado',
            activo BOOLEAN DEFAULT 1,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cliente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(100) NOT NULL,
            celular VARCHAR(20),
            email VARCHAR(100),
            direccion VARCHAR(200),
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
            activo BOOLEAN DEFAULT 1
        );
        
        CREATE TABLE IF NOT EXISTS vehiculo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            placa VARCHAR(20) UNIQUE NOT NULL,
            tipo VARCHAR(50),
            marca VARCHAR(50),
            modelo VARCHAR(50),
            año INTEGER,
            kilometraje INTEGER,
            cliente_id INTEGER,
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
            activo BOOLEAN DEFAULT 1,
            FOREIGN KEY (cliente_id) REFERENCES cliente (id)
        );
        
        CREATE TABLE IF NOT EXISTS producto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(100) NOT NULL,
            tipo VARCHAR(50),
            viscosidad VARCHAR(20),
            presentacion VARCHAR(20),
            stock_actual FLOAT DEFAULT 0,
            stock_minimo FLOAT DEFAULT 5,
            precio_compra FLOAT DEFAULT 0,
            precio_venta FLOAT DEFAULT 0,
            proveedor VARCHAR(100),
            activo BOOLEAN DEFAULT 1,
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS servicio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehiculo_id INTEGER,
            cliente_id INTEGER,
            tipo_servicio VARCHAR(100) NOT NULL,
            kilometraje_actual INTEGER,
            kilometraje_proximo INTEGER,
            fecha_servicio DATETIME DEFAULT CURRENT_TIMESTAMP,
            fecha_proximo DATETIME,
            observaciones TEXT,
            usuario_id INTEGER,
            FOREIGN KEY (vehiculo_id) REFERENCES vehiculo (id),
            FOREIGN KEY (cliente_id) REFERENCES cliente (id),
            FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        );
        
        CREATE TABLE IF NOT EXISTS detalle_servicio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            servicio_id INTEGER,
            producto_id INTEGER,
            cantidad FLOAT NOT NULL,
            precio_unitario FLOAT DEFAULT 0,
            FOREIGN KEY (servicio_id) REFERENCES servicio (id),
            FOREIGN KEY (producto_id) REFERENCES producto (id)
        );
        
        CREATE TABLE IF NOT EXISTS venta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero_ticket VARCHAR(20) UNIQUE,
            cliente_id INTEGER,
            vehiculo_id INTEGER,
            tipo_venta VARCHAR(20) DEFAULT 'servicio',
            subtotal FLOAT DEFAULT 0,
            igv FLOAT DEFAULT 0,
            total FLOAT DEFAULT 0,
            metodo_pago VARCHAR(20) DEFAULT 'efectivo',
            fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
            usuario_id INTEGER,
            FOREIGN KEY (cliente_id) REFERENCES cliente (id),
            FOREIGN KEY (vehiculo_id) REFERENCES vehiculo (id),
            FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        );
        
        CREATE TABLE IF NOT EXISTS detalle_venta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            venta_id INTEGER,
            producto_id INTEGER,
            servicio_id INTEGER,
            descripcion VARCHAR(200),
            cantidad FLOAT DEFAULT 1,
            precio_unitario FLOAT DEFAULT 0,
            subtotal FLOAT DEFAULT 0,
            FOREIGN KEY (venta_id) REFERENCES venta (id),
            FOREIGN KEY (producto_id) REFERENCES producto (id),
            FOREIGN KEY (servicio_id) REFERENCES servicio (id)
        );
        
        CREATE TABLE IF NOT EXISTS compra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero_factura VARCHAR(50),
            proveedor VARCHAR(100) NOT NULL,
            ruc VARCHAR(20),
            fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
            subtotal FLOAT DEFAULT 0,
            igv FLOAT DEFAULT 0,
            total FLOAT DEFAULT 0,
            usuario_id INTEGER,
            FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        );
        
        CREATE TABLE IF NOT EXISTS detalle_compra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            compra_id INTEGER,
            producto_id INTEGER,
            cantidad FLOAT NOT NULL,
            precio_unitario FLOAT DEFAULT 0,
            subtotal FLOAT DEFAULT 0,
            FOREIGN KEY (compra_id) REFERENCES compra (id),
            FOREIGN KEY (producto_id) REFERENCES producto (id)
        );
        
        CREATE TABLE IF NOT EXISTS movimiento_inventario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            producto_id INTEGER,
            tipo_movimiento VARCHAR(20),
            cantidad FLOAT NOT NULL,
            stock_anterior FLOAT,
            stock_nuevo FLOAT,
            motivo VARCHAR(100),
            referencia VARCHAR(50),
            fecha_movimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
            usuario_id INTEGER,
            FOREIGN KEY (producto_id) REFERENCES producto (id),
            FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        );
        
        CREATE TABLE IF NOT EXISTS caja (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha DATE DEFAULT CURRENT_DATE,
            monto_apertura FLOAT DEFAULT 0,
            monto_cierre FLOAT DEFAULT 0,
            ingresos FLOAT DEFAULT 0,
            egresos FLOAT DEFAULT 0,
            estado VARCHAR(20) DEFAULT 'abierta',
            usuario_id INTEGER,
            fecha_apertura DATETIME DEFAULT CURRENT_TIMESTAMP,
            fecha_cierre DATETIME,
            FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        );
        
        CREATE TABLE IF NOT EXISTS movimiento_caja (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            caja_id INTEGER,
            tipo VARCHAR(20),
            concepto VARCHAR(200),
            monto FLOAT NOT NULL,
            referencia VARCHAR(50),
            fecha_movimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
            usuario_id INTEGER,
            FOREIGN KEY (caja_id) REFERENCES caja (id),
            FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        );
    ''')
    
    # Insertar datos de ejemplo
    cursor.execute('SELECT COUNT(*) FROM usuario')
    if cursor.fetchone()[0] == 0:
        # Usuarios
        usuarios = [
            ('admin', generate_password_hash('admin123'), 'Administrador', 'admin'),
            ('empleado1', generate_password_hash('123456'), 'Juan Pérez', 'empleado'),
            ('empleado2', generate_password_hash('123456'), 'María García', 'empleado')
        ]
        cursor.executemany('INSERT INTO usuario (username, password_hash, nombre, rol) VALUES (?, ?, ?, ?)', usuarios)
        
        # Clientes
        clientes = [
            ('Carlos López', '999888777', 'carlos@email.com', 'Av. Arequipa 123'),
            ('Ana Torres', '999777666', 'ana@email.com', 'Jr. Lima 456'),
            ('Roberto Silva', '999666555', 'roberto@email.com', 'Av. Tacna 789')
        ]
        cursor.executemany('INSERT INTO cliente (nombre, celular, email, direccion) VALUES (?, ?, ?, ?)', clientes)
        
        # Vehículos
        vehiculos = [
            ('ABC-123', 'auto', 'Toyota', 'Corolla', 2020, 45000, 1),
            ('XYZ-789', 'camion', 'Ford', 'Ranger', 2019, 80000, 2),
            ('DEF-456', 'moto', 'Honda', 'CG 150', 2021, 15000, 3)
        ]
        cursor.executemany('INSERT INTO vehiculo (placa, tipo, marca, modelo, año, kilometraje, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?)', vehiculos)
        
        # Productos
        productos = [
            ('Aceite Mobil 1 5W-30', 'aceite', '5W-30', '1L', 50, 10, 25.00, 35.00, 'Mobil'),
            ('Aceite Castrol 10W-40', 'aceite', '10W-40', '4L', 30, 5, 80.00, 120.00, 'Castrol'),
            ('Filtro de Aceite Toyota', 'filtro', '', '1 unidad', 20, 5, 15.00, 25.00, 'Toyota'),
            ('Filtro de Aire Honda', 'filtro', '', '1 unidad', 25, 5, 12.00, 20.00, 'Honda'),
            ('Aceite de Transmisión', 'aceite', 'ATF', '1L', 15, 3, 30.00, 45.00, 'Valvoline'),
            ('Líquido de Frenos', 'liquido', 'DOT4', '500ml', 20, 5, 8.00, 15.00, 'Castrol'),
            ('Anticongelante', 'liquido', '50/50', '1L', 18, 5, 12.00, 20.00, 'Prestone'),
            ('Aceite de Motor Diesel', 'aceite', '15W-40', '4L', 12, 3, 90.00, 140.00, 'Shell')
        ]
        cursor.executemany('INSERT INTO producto (nombre, tipo, viscosidad, presentacion, stock_actual, stock_minimo, precio_compra, precio_venta, proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', productos)
    
    conn.commit()
    conn.close()
    print("Base de datos inicializada correctamente!")

if __name__ == '__main__':
    setup_database() 