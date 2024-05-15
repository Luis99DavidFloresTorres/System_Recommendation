import os

from flask_cors import CORS
from flask import Flask, jsonify
from src.routes.AlumnosRoutes import main
from src.routes.RecomendacionRoutes import recomendacion
from src.routes.RecomendacionStudenRoutes import recomendacionStudent
from src.routes.UsuarioRoutes import usuario
from src.database.db_connect import db
from src.Model.UsuarioModel import Usuario
from src.Model.TokenBlockList import Token_block_list
from src.Model.RecomendacionModel import Recomendacion
from transformers import AutoTokenizer, AutoModelForCausalLM
from flask_jwt_extended import JWTManager
from datetime import timedelta
from sqlalchemy import create_engine
import os
app = Flask(__name__)
cors = CORS(app)
jwt = JWTManager()
tokenizer = AutoTokenizer.from_pretrained("DeepESP/gpt2-spanish-medium")
#model = AutoModelForCausalLM.from_pretrained("src/gpt2_sin_cursos_ensenanza")
#model = AutoModelForCausalLM.from_pretrained("src/gpt2_con_cursos_ensenanza")
#tokenizer = AutoTokenizer.from_pretrained("LuisDavidFT777/gpt2-spanish-medium")
model = AutoModelForCausalLM.from_pretrained("LuisDavidFT777/gpt2-spanish-medium")
generation_config = model.generation_config
generation_config.max_new_tokens=100
generation_config.pad_token_id=tokenizer.eos_token_id
generation_config.eos_token_id=tokenizer.eos_token_id
generation_config.num_return_sequence=1
generation_config.top_p=0.6 # de acuerdo a las probabilidades de las palabras, mientras mas bajo menos incoherente
generation_config.top_k= 5 # escoge las 7 mas probables palabras
generation_config.temperature=0.7
generation_config.do_sample=True

def init_app():
    #app.config.from_object(config)

    app.register_blueprint(main, url_prefix='/alumnos/')
    app.register_blueprint(recomendacion, url_prefix='/recomendacion/')
    app.register_blueprint(recomendacionStudent, url_prefix='/recomendacionStudent/')
    app.register_blueprint(usuario, url_prefix='/usuario/')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("url_base_datos")
    # Desactiva la señalización de cambios de la base de datos
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_ALGORITHM"] = "HS256"
    app.config['SECRET_KEY'] = 'caac3c307a8dc042c4518d91'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1600)
    db.init_app(app)
    with app.app_context():
        db.create_all()
    jwt.init_app(app)
    @jwt.user_lookup_loader
    def user_lookup_loader(jwt_header,jwt_data):
        identity = jwt_data['sub']
        usuario = Usuario.query.filter_by(idusuario=identity).one_or_none()
        json = {'id':usuario.idusuario,'usuario':usuario.usuario,'tipo':usuario.tipo,'contrasena':usuario.contrasena}
        return json
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header,jwt_data):
        return jsonify({"message": "token has expired", "error": "token_expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"message": "Signature verification failed", "error": "invalid_expired"}), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"message": "Request doesnt contain valid token", "error": "token_expired"}), 401
    @jwt.token_in_blocklist_loader
    def token_in_blocklist_callback(jwt_header,jwt_data):

        id = jwt_data['sub']

        token = Token_block_list.query.filter_by(idU=id).scalar()
        return token is not None
    return app