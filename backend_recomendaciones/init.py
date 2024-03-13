from flask import Flask
from src.routes.AlumnosRoutes import main
from src.database.db_connect import db
app = Flask(__name__)

def init_app():
    #app.config.from_object(config)
    app.register_blueprint(main, url_prefix='/alumnos/')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/whatss_students'
    # Desactiva la señalización de cambios de la base de datos
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app