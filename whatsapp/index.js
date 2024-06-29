const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
var clientes = {}
const configPath = 'mensajesEnviar.json'

const configInicial = {
    tareas: []
};

fs.writeFileSync(configPath, JSON.stringify(configInicial, null, 2))
async function revisarSincronizacion(){
    var sincronizaciones = await leerSyncronizador();
    var horaMilisegundos = Date.now();
    for(var i=0;i<sincronizaciones.length;i++){
        var horaS = sincronizaciones[i].milisegundos
        var repetidor = sincronizaciones[i].repetidor
        var minutos = sincronizaciones[i].minutos
        var estudiantes= sincronizaciones[i].estudiantes
        var mensaje= sincronizaciones[i].mensaje
        var idusuario= sincronizaciones[i].idusuario
        if(horaMilisegundos>horaS){
            if(repetidor==1){
                sincronizaciones[i].milisegundos =horaMilisegundos+ (minutos*60*1000)
                sincronizaciones.splice(i, 1)
            }else{
                sincronizaciones[i].milisegundos =horaMilisegundos+ (minutos*60*1000)
                sincronizaciones[i].repetidor = repetidor-1;
            }
            for(var j = 0 ;j<estudiantes.length;j++){
                var celular = estudiantes[j]+"@c.us"
                if(estudiantes[j].length==8){
                    celular='591'+celular
                }
                var estado = await enviarMensajeDesdeCliente(idusuario, celular, mensaje);
                console.log(estado)
            }
        }
    }
    fs.writeFileSync(configPath, JSON.stringify(sincronizaciones, null, 2))
}
async function ejecutarRevisarTareasCadaMinuto() {
    while (true) {
        await revisarSincronizacion();
        await new Promise(resolve => setTimeout(resolve, 30000)); // Esperar 1 minuto
    }
}
ejecutarRevisarTareasCadaMinuto();
async function guardarSyncronizador(estudiantes, repetidor, minutos,mensaje,idusuario){
    var horaSuma = Date.now();
    var milisegundosAAgregar = minutos * 60 * 1000;
    horaSuma +=milisegundosAAgregar;
    var json = {'repetidor':repetidor, 'estudiantes':estudiantes, 'milisegundos':horaSuma,'minutos':minutos, 'mensaje':mensaje, 'idusuario':idusuario}
    var data = await leerSyncronizador();
    var dataOrdenado = await ordenarSyncronizador(data, json)
    fs.writeFileSync(configPath, JSON.stringify(dataOrdenado, null, 2))
}
async function leerSyncronizador(){
    const data = fs.readFileSync(configPath);
    return JSON.parse(data)
}
async function ordenarSyncronizador(sincronizaciones, nuevoJson){
    var nuevaLista=[]
    var flag = false;
    for(var i=0;i<sincronizaciones.length;i++){
        var horaS = sincronizaciones[i].milisegundos
        var horaNueva = nuevoJson.milisegundos
        if(horaS<horaNueva){
                nuevaLista.push(sincronizaciones[i])
        }else{
                nuevaLista.push(nuevoJson)
                nuevaLista.push(sincronizaciones[i])
                flag =true;
        }
    }
    if(!flag){
        nuevaLista.push(nuevoJson)
    }
    return nuevaLista
}
async function enviarMensajeDesdeCliente(idCliente, numeroDestino, mensaje) {
    try {
        var cliente = clientes[idCliente];
    
        await cliente.sendMessage(numeroDestino, mensaje);
        return true;
    } catch (error) {
       
        return false; 
    }
}
app.get('/repetir',async(req,res)=>{
    var idusuario = req.query.idusuario;
    var estudiantes= req.query.celulares
    var mensaje =  req.query.mensaje
    var repetidor =  req.query.repetidor
    var tiempo =  req.query.tiempo
    var res = await guardarSyncronizador(estudiantes,repetidor,tiempo,mensaje,idusuario)
})
app.get('/conectar',async(req,res)=>{
    res.sendStatus(200)
    
    var cliente = new Client({
        puppeteer: {
            headless: false
        },
        webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', },
        authStrategy: new LocalAuth({
            clientId: 'cliente_' + req.query.id
        })
    });

    cliente.on('qr', (qr) => {
       
            console.log(`Escanea este código QR`, qr);
    
    });

    cliente.on('ready', () => {
        console.log(`Cliente de WhatsApp`);
    });

    await cliente.initialize();
    clientes[req.query.id]=cliente

})
app.get('/' , async(req, res) => {
    res.send({'hola':'hola'},status=200);
}
)
app.get('/login', async (req, res) => {
    idUsuario = req.query.idusuario;
    res.sendStatus(200)
    if (clientes[idUsuario] == undefined) {
        var cliente = new Client({
            puppeteer: {
                headless: false
            },
            webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', },
            authStrategy: new LocalAuth({
                clientId: 'cliente_' + idUsuario
            })
        });

        cliente.on('qr', (qr) => {
           
                console.log(`Escanea este código QR`, qr);
        
        });

        cliente.on('ready', () => {
            console.log(`Cliente de WhatsApp`);
        });

        await cliente.initialize();

        clientes[idUsuario] = cliente;
    }
    
});
app.get('/enviarMensaje', async (req, res) => {
   
    var mensaje = req.query.mensaje;
    var idusuario = req.query.idusuario;
    var celulares = req.query.celulares;
    var numerosNoEnviados=[] ;
    for(var i =0;i<celulares.length;i++){
        var celular = celulares[i]+"@c.us"
        if(celulares[i].length==8){
            celular='591'+celular
        }
      
        var estado = await enviarMensajeDesdeCliente(idusuario, celular, mensaje);
    
        if(!estado){
            numerosNoEnviados.push(celulares[i])
        }
    }   
  
    res.send(numerosNoEnviados);
    }
)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});