from flask import Blueprint, jsonify, request
from ..services.StudentServices import StudentServices
from ..services.AI_LLM import AI_LLM_Services
main = Blueprint('alumnos_blueprint', __name__)


@main.route('buscar', methods=['POST'])
def buscar():
    body = request.json
    print(body)
    listaEstudiantes= AI_LLM_Services.obtener_respuesta(word=body)
    #StudentServices.getStudentsRecommendation(body)
    jsn = jsonify({'estudiantes': listaEstudiantes})
    return jsn, 200
