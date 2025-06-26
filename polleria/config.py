"""
Archivo de configuración para el Sistema de Gestión de Pollería JT
"""

import os
from datetime import timedelta

class Config:
    """Configuración base"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'tu_clave_secreta_aqui_cambiala_en_produccion'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///polleria.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración de sesión
    PERMANENT_SESSION_LIFETIME = timedelta(hours=8)
    
    # Configuración de archivos
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = 'uploads'
    
    # Configuración de reportes
    REPORTS_PER_PAGE = 50
    
    # Configuración de Google Sheets (opcional)
    GOOGLE_SHEETS_CREDENTIALS_FILE = os.environ.get('GOOGLE_SHEETS_CREDENTIALS_FILE') or 'credentials.json'
    GOOGLE_SHEETS_SPREADSHEET_ID = os.environ.get('GOOGLE_SHEETS_SPREADSHEET_ID')
    
    # Configuración de email (opcional)
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    
    # Configuración de backup
    BACKUP_ENABLED = os.environ.get('BACKUP_ENABLED', 'true').lower() in ['true', 'on', '1']
    BACKUP_FOLDER = os.environ.get('BACKUP_FOLDER') or 'backups'
    BACKUP_RETENTION_DAYS = int(os.environ.get('BACKUP_RETENTION_DAYS') or 30)

class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    
    # En producción, usar variables de entorno
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY debe estar configurada en producción")

class TestingConfig(Config):
    """Configuración para pruebas"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False

# Diccionario de configuraciones
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

# Configuración específica de la aplicación
APP_CONFIG = {
    'name': 'Pollería JT - Sistema de Gestión',
    'version': '1.0.0',
    'description': 'Sistema completo de gestión para pollerías',
    'author': 'Pollería JT',
    'contact': 'soporte@polleriajt.com',
    
    # Configuración de módulos
    'modules': {
        'ventas': True,
        'caja': True,
        'inventario': True,
        'compras': True,
        'cocina': True,
        'delivery': True,
        'reportes': True
    },
    
    # Configuración de roles
    'roles': {
        'admin': {
            'name': 'Administrador',
            'permissions': ['all']
        },
        'cajero': {
            'name': 'Cajero',
            'permissions': ['ventas', 'caja', 'reportes_basicos']
        },
        'cocinero': {
            'name': 'Cocinero',
            'permissions': ['cocina', 'inventario_consulta']
        }
    },
    
    # Configuración de moneda
    'currency': {
        'symbol': 'S/.',
        'name': 'Soles',
        'decimal_places': 2
    },
    
    # Configuración de horarios
    'business_hours': {
        'monday': {'open': '10:00', 'close': '22:00'},
        'tuesday': {'open': '10:00', 'close': '22:00'},
        'wednesday': {'open': '10:00', 'close': '22:00'},
        'thursday': {'open': '10:00', 'close': '22:00'},
        'friday': {'open': '10:00', 'close': '23:00'},
        'saturday': {'open': '10:00', 'close': '23:00'},
        'sunday': {'open': '11:00', 'close': '21:00'}
    },
    
    # Configuración de delivery
    'delivery': {
        'enabled': True,
        'min_order': 15.00,
        'delivery_fee': 3.00,
        'free_delivery_threshold': 50.00,
        'estimated_time': 30,  # minutos
        'max_distance': 5.0  # km
    },
    
    # Configuración de impresión
    'printing': {
        'ticket_width': 80,  # caracteres
        'ticket_font_size': 10,
        'include_logo': True,
        'include_qr': False
    },
    
    # Configuración de notificaciones
    'notifications': {
        'stock_alerts': True,
        'low_stock_threshold': 0.2,  # 20% del stock mínimo
        'email_notifications': False,
        'sound_notifications': True
    }
}

def get_config():
    """Obtener configuración basada en el entorno"""
    config_name = os.environ.get('FLASK_ENV', 'default')
    return config.get(config_name, config['default'])

def init_app(app):
    """Inicializar configuración en la aplicación Flask"""
    config_class = get_config()
    app.config.from_object(config_class)
    
    # Crear directorios necesarios
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['BACKUP_FOLDER'], exist_ok=True)
    
    return app 