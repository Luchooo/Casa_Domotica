var io 			= require("socket.io").listen(8089, {log: false});
var five 		= require("johnny-five");
var board 		= new five.Board();


var leds		= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var numLeds		= [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
var estadoLeds	= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Todos los leds están apagados...


/*
LED Baño --> 13
LED Cocina --> 12
LED Comedor --> 11
LED Habitación 1 --> 10
LED Habitación 2 --> 9
LED Habitación 3 --> 8

LED Rojo Baño --> 7
LED Rojo Cocina --> 6
LED Rojo Comedor --> 5
LED Rojo Habitación 1 --> 4
LED Rojo Habitación 2 --> 3
LED Rojo Habitación 1 --> 2

*/



//Conexión con la tarjeta de Arduino y asignación de valores...
board.on("ready", function()
{ 
	console.log("Johnny5 listo y escuchando!!");
	for(var i in leds)
	{
		leds[i] = new five.Led(numLeds[i]);
	}
});

//UID -> Dispostivo...
io.on("connection", function(socket)
{
	socket.on("conecta", function(data)
	{
		console.log("Se ha conectado el usuario: " + data.id);
	});



	socket.on("enciendeApaga", function(data)
	{
		
		if(data.estado) //1 -> Encendido...
		{
			leds[data.led].on(); // -> Encender...
			
		}



		else
		{
			leds[data.led].off();	
			
		}

		estadoLeds[data.led] = data.estado;
	});





	
});
console.log("Servidor arriba a través del puerto 8089");