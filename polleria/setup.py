#!/usr/bin/env python3
"""
Script de configuración inicial para el Sistema de Gestión de Pollería JT
Este script crea la base de datos, usuarios iniciales y datos de ejemplo.
"""

import os
import sys
from datetime import datetime

# Agregar el directorio actual al path para importar app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, Usuario, Producto, Insumo
from werkzeug.security import generate_password_hash

def crear_usuarios_iniciales():
    """Crear usuarios del sistema"""
    print("🔧 Creando usuarios iniciales...")
    
    usuarios = [
        {
            'username': 'admin',
            'password': 'admin123',
            'nombre': 'Administrador',
            'rol': 'admin'
        },
        {
            'username': 'cajero1',
            'password': 'cajero123',
            'nombre': 'Juan Pérez',
            'rol': 'cajero'
        },
        {
            'username': 'cocinero1',
            'password': 'cocinero123',
            'nombre': 'María García',
            'rol': 'cocinero'
        }
    ]
    
    for user_data in usuarios:
        if not Usuario.query.filter_by(username=user_data['username']).first():
            usuario = Usuario(
                username=user_data['username'],
                password_hash=generate_password_hash(user_data['password']),
                nombre=user_data['nombre'],
                rol=user_data['rol']
            )
            db.session.add(usuario)
            print(f"  ✅ Usuario creado: {user_data['username']} ({user_data['rol']})")
        else:
            print(f"  ⚠️  Usuario ya existe: {user_data['username']}")

def crear_productos_ejemplo():
    """Crear productos del menú"""
    print("🍗 Creando productos del menú...")
    
    productos = [
        # Combos
        {'nombre': 'Combo Pollo a la Brasa', 'precio': 25.00, 'categoria': 'combo'},
        {'nombre': 'Combo Familiar', 'precio': 45.00, 'categoria': 'combo'},
        {'nombre': 'Combo Ejecutivo', 'precio': 18.00, 'categoria': 'combo'},
        
        # Platos principales
        {'nombre': '1/4 Pollo a la Brasa', 'precio': 15.00, 'categoria': 'plato'},
        {'nombre': '1/2 Pollo a la Brasa', 'precio': 28.00, 'categoria': 'plato'},
        {'nombre': 'Pollo Entero', 'precio': 50.00, 'categoria': 'plato'},
        {'nombre': 'Pollo Broaster', 'precio': 16.00, 'categoria': 'plato'},
        {'nombre': 'Pechuga a la Plancha', 'precio': 18.00, 'categoria': 'plato'},
        
        # Acompañamientos
        {'nombre': 'Papas Fritas', 'precio': 8.00, 'categoria': 'plato'},
        {'nombre': 'Ensalada César', 'precio': 12.00, 'categoria': 'plato'},
        {'nombre': 'Ensalada Mixta', 'precio': 10.00, 'categoria': 'plato'},
        {'nombre': 'Arroz Chaufa', 'precio': 9.00, 'categoria': 'plato'},
        {'nombre': 'Puré de Papas', 'precio': 7.00, 'categoria': 'plato'},
        
        # Bebidas
        {'nombre': 'Gaseosa', 'precio': 5.00, 'categoria': 'bebida'},
        {'nombre': 'Chicha Morada', 'precio': 4.00, 'categoria': 'bebida'},
        {'nombre': 'Limonada', 'precio': 4.00, 'categoria': 'bebida'},
        {'nombre': 'Inka Kola', 'precio': 5.00, 'categoria': 'bebida'},
        {'nombre': 'Coca Cola', 'precio': 5.00, 'categoria': 'bebida'},
        {'nombre': 'Agua Mineral', 'precio': 3.00, 'categoria': 'bebida'},
        
        # Postres
        {'nombre': 'Flan', 'precio': 6.00, 'categoria': 'postre'},
        {'nombre': 'Tres Leches', 'precio': 8.00, 'categoria': 'postre'},
        {'nombre': 'Helado', 'precio': 5.00, 'categoria': 'postre'},
        {'nombre': 'Gelatina', 'precio': 4.00, 'categoria': 'postre'}
    ]
    
    for prod_data in productos:
        if not Producto.query.filter_by(nombre=prod_data['nombre']).first():
            producto = Producto(
                nombre=prod_data['nombre'],
                precio=prod_data['precio'],
                categoria=prod_data['categoria']
            )
            db.session.add(producto)
            print(f"  ✅ Producto creado: {prod_data['nombre']} - S/. {prod_data['precio']:.2f}")
        else:
            print(f"  ⚠️  Producto ya existe: {prod_data['nombre']}")

def crear_insumos_ejemplo():
    """Crear insumos básicos"""
    print("📦 Creando insumos básicos...")
    
    insumos = [
        # Proteínas
        {'nombre': 'Pollo', 'unidad': 'kg', 'stock_actual': 100, 'stock_minimo': 20, 'precio_unitario': 12.00},
        {'nombre': 'Huevos', 'unidad': 'unidades', 'stock_actual': 200, 'stock_minimo': 50, 'precio_unitario': 0.50},
        
        # Verduras y tubérculos
        {'nombre': 'Papas', 'unidad': 'kg', 'stock_actual': 50, 'stock_minimo': 10, 'precio_unitario': 3.50},
        {'nombre': 'Cebolla', 'unidad': 'kg', 'stock_actual': 20, 'stock_minimo': 5, 'precio_unitario': 4.00},
        {'nombre': 'Zanahoria', 'unidad': 'kg', 'stock_actual': 15, 'stock_minimo': 3, 'precio_unitario': 3.00},
        {'nombre': 'Lechuga', 'unidad': 'unidades', 'stock_actual': 30, 'stock_minimo': 10, 'precio_unitario': 2.00},
        {'nombre': 'Tomate', 'unidad': 'kg', 'stock_actual': 25, 'stock_minimo': 5, 'precio_unitario': 5.00},
        
        # Aceites y condimentos
        {'nombre': 'Aceite Vegetal', 'unidad': 'litros', 'stock_actual': 20, 'stock_minimo': 5, 'precio_unitario': 8.00},
        {'nombre': 'Sal', 'unidad': 'kg', 'stock_actual': 10, 'stock_minimo': 2, 'precio_unitario': 2.50},
        {'nombre': 'Pimienta', 'unidad': 'kg', 'stock_actual': 2, 'stock_minimo': 0.5, 'precio_unitario': 25.00},
        {'nombre': 'Ajo', 'unidad': 'kg', 'stock_actual': 5, 'stock_minimo': 1, 'precio_unitario': 15.00},
        
        # Bebidas
        {'nombre': 'Gaseosas', 'unidad': 'unidades', 'stock_actual': 100, 'stock_minimo': 20, 'precio_unitario': 2.50},
        {'nombre': 'Agua Mineral', 'unidad': 'unidades', 'stock_actual': 80, 'stock_minimo': 15, 'precio_unitario': 1.50},
        
        # Empaques
        {'nombre': 'Cajas de Cartón', 'unidad': 'unidades', 'stock_actual': 200, 'stock_minimo': 50, 'precio_unitario': 1.00},
        {'nombre': 'Bolsas Plásticas', 'unidad': 'unidades', 'stock_actual': 500, 'stock_minimo': 100, 'precio_unitario': 0.20},
        {'nombre': 'Servilletas', 'unidad': 'paquetes', 'stock_actual': 50, 'stock_minimo': 10, 'precio_unitario': 3.00},
        
        # Otros
        {'nombre': 'Carbón', 'unidad': 'kg', 'stock_actual': 30, 'stock_minimo': 5, 'precio_unitario': 6.00},
        {'nombre': 'Leña', 'unidad': 'kg', 'stock_actual': 100, 'stock_minimo': 20, 'precio_unitario': 2.00}
    ]
    
    for insumo_data in insumos:
        if not Insumo.query.filter_by(nombre=insumo_data['nombre']).first():
            insumo = Insumo(
                nombre=insumo_data['nombre'],
                unidad=insumo_data['unidad'],
                stock_actual=insumo_data['stock_actual'],
                stock_minimo=insumo_data['stock_minimo'],
                precio_unitario=insumo_data['precio_unitario']
            )
            db.session.add(insumo)
            print(f"  ✅ Insumo creado: {insumo_data['nombre']} - {insumo_data['stock_actual']} {insumo_data['unidad']}")
        else:
            print(f"  ⚠️  Insumo ya existe: {insumo_data['nombre']}")

def mostrar_credenciales():
    """Mostrar credenciales de acceso"""
    print("\n" + "="*50)
    print("🎉 ¡Sistema configurado exitosamente!")
    print("="*50)
    print("\n📋 Credenciales de acceso:")
    print("  🌐 URL: http://localhost:5000")
    print("  👤 Usuario: admin")
    print("  🔑 Contraseña: admin123")
    print("\n👥 Otros usuarios creados:")
    print("  👤 Cajero: cajero1 / cajero123")
    print("  👤 Cocinero: cocinero1 / cocinero123")
    print("\n🚀 Para iniciar el sistema:")
    print("  python app.py")
    print("\n" + "="*50)

def main():
    """Función principal del script"""
    print("🍗 Sistema de Gestión para Pollería JT")
    print("🔧 Configuración inicial")
    print("="*50)
    
    try:
        with app.app_context():
            # Crear todas las tablas
            print("🗄️  Creando base de datos...")
            db.create_all()
            print("  ✅ Base de datos creada")
            
            # Crear datos iniciales
            crear_usuarios_iniciales()
            crear_productos_ejemplo()
            crear_insumos_ejemplo()
            
            # Guardar todos los cambios
            db.session.commit()
            print("\n💾 Guardando cambios en la base de datos...")
            print("  ✅ Configuración completada")
            
            mostrar_credenciales()
            
    except Exception as e:
        print(f"\n❌ Error durante la configuración: {e}")
        print("🔧 Verifique que todas las dependencias estén instaladas:")
        print("  pip install -r requirements.txt")
        sys.exit(1)

if __name__ == '__main__':
    main() 