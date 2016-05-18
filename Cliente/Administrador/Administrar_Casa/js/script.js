window.onload = function()
{
	inicia();
};
//var debug = "";

function inicia()
{
	var serverBaseUrl = "http://localhost:8089";
    var socket = io.connect(serverBaseUrl);
    var sessionId = '';
      var conStrobe = 0;
    var tiempoAnima = "";
    var velocidadStrobe = 100;
 
    //var nombre = prompt("Por favor digita tu nombre");
    socket.on('connect', function ()
    {
        sessionId = socket.socket.sessionid;
        socket.emit('conecta', {id: sessionId});
    });
	//Para saber el estado de los elementos seleccionados...
	var leds = [
				{
					led : "bano",
					estado : 0
				},
				{
					led : "cocina",
					estado : 0
				},
                {
                    led : "comedor",
                    estado : 0
                },
                {
                    led : "habitacion_1",
                    estado : 0
                },
                {
                    led : "habitacion_2",
                    estado : 0
                },
                {
                    led : "habitacion_3",
                    estado : 0
                },
                {
                    led : "bano_fuego",
                    estado : 0
                },
                {
                    led : "cocina_fuego",
                    estado : 0
                },
                {
                    led : "comedor_fuego",
                    estado : 0
                },
                {
                    led : "habitacion_1_fuego",
                    estado : 0
                },
                {
                    led : "habitacion_2_fuego",
                    estado : 0
                },
				{
					led : "habitacion_3_fuego",
					estado : 0
				}];
	

 var audios = [
                                    {
                                        sonido  :   "apaga_bano.mp3",
                                        label   :   "apaga_bano"
                                    },
                                    {
                                        sonido  :   "enciende_bano.mp3",
                                        label   :   "enciende_bano"
                                    },
                                    {
                                        sonido  :   "apaga_habitacion.mp3",
                                        label   :   "apaga_habitacion"
                                    },
                                    {
                                        sonido  :   "enciende_habitacion.mp3",
                                        label   :   "enciende_habitacion"
                                    },
                                    {
                                        sonido  :   "apaga_parqueadero.mp3",
                                        label   :   "apaga_parqueadero"
                                    },
                                    {
                                        sonido  :   "enciende_parqueadero.mp3",
                                        label   :   "enciende_parqueadero"
                                    },
                                    {
                                        sonido  :   "cocina_off.mp3",
                                        label   :   "cocina_off"
                                    },
                                    {
                                        sonido  :   "cocina_on.mp3",
                                        label   :   "cocina_on"
                                    },
                                    {
                                        sonido  :   "party_on.mp3",
                                        label   :   "party_on"
                                    },
                                    {
                                        sonido  :   "stop_party.mp3",
                                        label   :   "stop_party"
                                    },
                                    {
                                        sonido  :   "tada.mp3",
                                        label   :   "tada"
                                    }
                                ];



                //Para cargar los audios del juego...
                    for(var audio = 0; audio < audios.length; audio++)
                    {
                        createjs.Sound.registerSound("sonidos/" + audios[audio].sonido, audios[audio].label);


                    }


	//Inicializamos la API de reconocimiento de Voz
    //Solo funciona en pocos navegadores
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    //Establecemos el idioma que reconocera
    recognition.lang = "es";

    //Cuando haga hover en el microfono...empezara a escuchar
    var recognition;
  	var recognizing = false;
    $('#microfono').hover(function(event) 
    {
		if (recognizing == false) 
		{
    		recognition.start();
    		recognizing = true;
          	console.log("hablando");
   		} 
   		else 
   		{
    		recognition.stop();
    		recognizing = false
        }
	});


    //Evento que se genera cuando terminamos de hablar...
           recognition.onresult = function (event)
           {
                finalResult = '';
                //event.resultIndex contiene las palabras que reconocio la API
                for (var i = event.resultIndex; i < event.results.length; ++i)
                {
                    //Verificamos todas las palabras reconocidas y las concatenamos para mostrarlas
                    if (event.results[i].isFinal)
                    {
                        finalResult = event.results[i][0].transcript;
                        $('#buscar').val(finalResult);

                    }
                }

                finalResult=finalResult.toLocaleLowerCase();
                

                //BAÑO
                if (finalResult==="encender baño")
                {
                    createjs.Sound.play("enciende_bano");
                    swal({   title: "Encendida",  text:'Luz de Baño' , imageUrl: "img/bombillo_encendido.png", timer: 2000, showconfirmButton: false });
                     encenderApagar(0, 1);
                }

                if (finalResult==="apagar baño")
                {
                  createjs.Sound.stop("enciende_bano");
                createjs.Sound.play("apaga_bano");
                swal({   title: "Apagada",  text:'Luz de Baño' ,  imageUrl: "img/bombillo_apagado.png", timer: 2000, showconfirmButton: false });
                 encenderApagar(0, 0);
                }


                //COCINA

                if (finalResult==="encender cocina")
                {
                  createjs.Sound.play("cocina_on");
                swal({   title: "Encendida",  text:'Luz de Cocina' , imageUrl: "img/bombillo_encendido.png", timer: 2000, showconfirmButton: false });
                      encenderApagar(1, 1);
                }

                if (finalResult==="apagar cocina")
                {createjs.Sound.stop("cocina_on");
                       createjs.Sound.play("cocina_off");
                swal({   title: "Apagada",  text:'Luz de Cocina' ,  imageUrl: "img/bombillo_apagado.png", timer: 2000, showconfirmButton: false });
            
                  encenderApagar(1, 0);
                }


                //COMEDOR

                if (finalResult==="encender comedor")
                {
                  createjs.Sound.play("tada");
                swal({   title: "Cocina Encendida ",  imageUrl: "img/bombillo_encendido.png", timer: 2000, showconfirmButton: false });
                 encenderApagar(2, 1);
                }

                if (finalResult==="apagar comedor")
                {
                  swal({   title: "Se han apagado todas las luces",  imageUrl: "img/bombillo_apagado.png", timer: 2000, showconfirmButton: false });
            encenderApagar(2, 0);
                }


                //HABITACION 1
                if (finalResult==="encender habitación 1")
                {
                 
                        createjs.Sound.play("enciende_habitacion");
                        swal({   title: "Encendida",  text:'Luz de Habitacion 1' , imageUrl: "img/bombillo_encendido.png", timer: 2000, showconfirmButton: false });
                         encenderApagar(3, 1);
                }

                if (finalResult==="apagar habitación 1")
                {
                    createjs.Sound.stop("enciende_habitacion");
                    createjs.Sound.play("apaga_habitacion");
                swal({   title: "Apagada",  text:'Luz de Habitacion 1' ,  imageUrl: "img/bombillo_apagado.png", timer: 2000, showconfirmButton: false });
            



                  encenderApagar(3, 0);
                }


                
                //HABITACION 2
                if (finalResult==="encender habitación 2")
                {
                  
                  createjs.Sound.play("enciende_habitacion");
                swal({   title: "Encendida",  text:'Luz de Habitacion 2' , imageUrl: "img/bombillo_encendido.png", timer: 2000, showconfirmButton: false });
           
                  encenderApagar(4, 1);
                }

                if (finalResult==="apagar habitación 2")
                {
                  createjs.Sound.stop("enciende_habitacion");
                createjs.Sound.play("apaga_habitacion");
                swal({   title: "Apagada",  text:'Luz de Habitacion 2' ,  imageUrl: "img/bombillo_apagado.png", timer: 2000, showconfirmButton: false });
           
                  encenderApagar(4, 0);
                }




                //HABITACION 3
                if (finalResult==="encender habitación 3")
                {
                   createjs.Sound.play("enciende_habitacion");
                swal({   title: "Encendida",  text:'Luz de Habitacion 3' , imageUrl: "img/bombillo_encendido.png", timer: 2000, showconfirmButton: false });
           
                  encenderApagar(5, 1);
                }

                if (finalResult==="apagar habitación 3")
                {
                 
                    createjs.Sound.stop("enciende_habitacion");   
                createjs.Sound.play("apaga_habitacion");
                swal({   title: "Apagada",  text:'Luz de Habitacion 3' ,  imageUrl: "img/bombillo_apagado.png", timer: 2000, showconfirmButton: false });
           
                 
                  encenderApagar(5, 0);
                }



                if (finalResult==="incendio")
                {
                 
                 
                     encenderApagar(6, 1);
                    encenderApagar(7, 1);
                    encenderApagar(8, 1);
                    encenderApagar(9, 1);
                    encenderApagar(10, 1);
                
                }
             

              




              };


/*
		nom_div("checkbox-10-0").addEventListener('change', function(event)
		{
        	encenderApagar(0, Number(this.checked));
    	});
*/	




	var encenderApagar = function(led, estado)
	{
		//Almacenar el valor del led...
		leds[led].estado = estado;
		//Se debe emitir el estado de los leds...
		var enviaSocket = {led: led, estado : estado};
		socket.emit('enciendeApaga', enviaSocket);
	};










	

	//Para acceder a elementos de HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}
