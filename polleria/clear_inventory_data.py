#!/usr/bin/env python3
"""
Script para borrar los datos de ejemplo del inventario en el Sistema de Gestión de Pollería JT
"""

import os
import sys

# Agregar el directorio actual al path para importar app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, Insumo, MovimientoInsumo, Compra, DetalleCompra

def clear_data():
    with app.app_context():
        print("Eliminando datos de movimientos de insumo...")
        MovimientoInsumo.query.delete()
        print("Datos de movimientos eliminados.")

        print("Eliminando detalles de compras...")
        DetalleCompra.query.delete()
        print("Detalles de compras eliminados.")

        print("Eliminando compras...")
        Compra.query.delete()
        print("Compras eliminadas.")
        
        print("Eliminando todos los insumos...")
        Insumo.query.delete()
        print("Insumos eliminados.")

        db.session.commit()
        print("¡Limpieza completa de datos de inventario!")

def main():
    """Función principal del script"""
    print("🧹 Limpiando datos de ejemplo del inventario - Pollería JT")
    print("="*50)
    print("⚠️  Atención: Este script borrará TODOS los insumos, movimientos de inventario e historial de compras.")
    print("Los productos del menú, las ventas y los usuarios NO serán afectados.")
    
    clear_data()

if __name__ == '__main__':
    main() 