const qrcode = require('qrcode-terminal');
var qr = require('qr-image');
const fs = require('fs');
const { Client,LegacySessionAuth,LocalAuth } = require('whatsapp-web.js');
var express = require('express');

//express client
var app = express();
app.set('port', (process.env.PORT || 5000))

// whatsapp Client
const client = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]}
});





var load_message = {
    "from": "" ,
    "body": "",
}


// var heroku = " dosb.oi80.3@gmail.com";



client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
    //save qr code to file
    var qr_svg = qr.image(qr, { type: 'svg' });
    qr_svg.pipe(require('fs').createWriteStream('auth.svg'));

});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',message => {
    //save the message to json file
    load_message.body = message.body;
    load_message.from = message.from;
    console.log(load_message);      
})
//send png
app.get('/authmandy',function(req,res){
    res.sendFile('./auth.svg');
    });

app.get('/message', function (req, res) {
    res.json(load_message);
 })



var server = app.listen(app.get('port'), function () {
    var host = server.address().address
    console.log("Node app is running at localhost:"+host + app.get('port'))
 })
client.initialize();
