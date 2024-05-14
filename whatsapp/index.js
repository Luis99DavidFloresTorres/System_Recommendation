const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
const PORT = process.env.PORT || 3000;
var clientes = {}
async function enviarMensajeDesdeCliente(idCliente, numeroDestino, mensaje) {
    try {
        var cliente = clientes[idCliente];
    
        await cliente.sendMessage(numeroDestino, mensaje);
        return true;
    } catch (error) {
       
        return false; 
    }
}
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