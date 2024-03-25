from flask_cors import CORS
from flask import Flask
from src.routes.AlumnosRoutes import main
from src.database.db_connect import db
from transformers import AutoTokenizer, AutoModelForCausalLM
app = Flask(__name__)
cors = CORS(app)
tokenizer = AutoTokenizer.from_pretrained("DeepESP/gpt2-spanish-medium")
#model = AutoModelForCausalLM.from_pretrained("src/gpt2_sin_cursos_ensenanza")
model = AutoModelForCausalLM.from_pretrained("src/gpt2_con_cursos_ensenanza")
generation_config = model.generation_config
generation_config.max_new_tokens=100
generation_config.pad_token_id=tokenizer.eos_token_id
generation_config.eos_token_id=tokenizer.eos_token_id
generation_config.num_return_sequence=3
generation_config.top_p=0.5 # de acuerdo a las probabilidades de las palabras, mientras mas bajo menos incoherente
#generation_config.top_k= 7 # escoge las 7 mas probables palabras
generation_config.temperature=0.1
generation_config.do_sample=True
def init_app():
    #app.config.from_object(config)

    app.register_blueprint(main, url_prefix='/alumnos/')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/whatss_students'
    # Desactiva la señalización de cambios de la base de datos
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    #app.config.from_object('config_dev')
    #os.environ.get('FLASK_ENV') == 'dev'

    db.init_app(app)
    return app