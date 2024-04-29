from ..services.RecomendacionesServices import RecomendacionesServices
from ..services.AI_LLM import AI_LLM_Services
from flask import Blueprint, jsonify, request
recomendacion = Blueprint('Recomendacion_blueprint', __name__)


@recomendacion.route('buscar', methods=['GET'])
def buscar():
    all = RecomendacionesServices.allRecomendaciones()
    print(all)
    jsn = jsonify({'recomendaciones':all})
    if all!=0:
        return jsn,200
    return '{mensaje:error base de datos}',500