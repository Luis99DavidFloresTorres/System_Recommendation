import init
from ..services.StudentServices import StudentServices
class AI_LLM_Services():
    @classmethod
    def generarAlumnos(cls, word):
        wordTokenize = init.tokenizer(word, padding='max_length', return_tensors='pt')
        model = init.model.generate(wordTokenize.input_ids, generation_config=init.generation_config)
        return init.tokenizer.decode(model[0])

    @classmethod
    def obtener_respuesta(cls, word):
        input= ("<humano> Dame una recomendacion de "
                "este curso <nombre> "+word['nombrecurso'] +" <monto> "+str(word['monto'])
                +" <costo> "+str(word['costo'])+ " <asistente> ")
        print(input)
        respuesta = cls.generarAlumnos(input)
        print(respuesta)
        #tipo_alumno = cls.tipo_estudiante_recomendado(respuesta.split())
        tipo_alumno = cls.tipo_estudiante_recomendado2(respuesta.split())
        titulo = " ".join(tipo_alumno['titulo'])
        area = " ".join(tipo_alumno['area'])
        universidad = " ".join(tipo_alumno['universidad'])
        rango_titulacion = " ".join(tipo_alumno['rango_ano_titulacion'])
        rango_edad=" ".join(tipo_alumno['rango_edad'])
        tipo_alumno['titulo'] = titulo
        tipo_alumno['area'] = area
        tipo_alumno['universidad'] = universidad
        tipo_alumno['rango_ano_titulacion'] = rango_titulacion
        tipo_alumno['rango_edad'] = rango_edad
        print(tipo_alumno)
        listEstudiantes = StudentServices.getStudentsRecommendation(titulo, area, universidad,rango_titulacion, rango_edad)
        return listEstudiantes, tipo_alumno

    def tipo_estudiante_recomendado(palabraV):
        alumno = {'titulo': 0, 'area': 0, 'universidad': 0, 'rango_ano_titulacion': 0}
        i = 0
        keys = list(alumno.keys())
        idxK = 0
        idxS = 0
        while i < len(palabraV):
            palabra = palabraV[i]
            etiqueta = keys[idxK]
            etiquetaComienzo = '<' + etiqueta + '>'
            etiquetaCierre = '</' + etiqueta + '>'
            if etiquetaComienzo == palabra:
                idxS = i
            if etiquetaCierre == palabra:
                idxK = idxK + 1
                alumno[etiqueta] = palabraV[idxS + 1:i]
            if etiqueta == 'rango_ano_titulacion':
                    break
            i = i + 1
        return alumno

    def tipo_estudiante_recomendado2(palabraV):
        i = 0
        alumno = {'titulo': 0, 'area': 0, 'universidad': 0, 'rango_ano_titulacion': 0, 'rango_edad': 0}
        keys = list(alumno.keys())
        idxK = -1
        idxS = 0
        countEtiqueta = 0
        flagEtiqueta = False
        etiqueta = keys[0]
        while i < len(palabraV):
            palabra = palabraV[i]
            if flagEtiqueta and palabra[0] == '<':
                countEtiqueta = countEtiqueta + 1
                idxK = idxK + 1
                etiqueta = keys[idxK]
            if countEtiqueta == 1:
                alumno[etiqueta] = palabraV[idxS:i]
                idxS = i + 1
                countEtiqueta = 0
                if palabra == '<final>':
                    alumno[keys[-1]] = palabraV[i + 1:i + 2]
                    break
            if palabra == '<titulo>':
                idxS = i + 1
                flagEtiqueta = True
            i = i + 1
        return alumno