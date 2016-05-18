$(function()
{	
	//var puntaje = 0;
	//swal("BIENVENIDO ADMINISTRADOR DE LA CASA ", "Escoge una opción", "");
	$("#start_f").click(function(event)
	{	
		window.location.replace("../Administrar_Casa/index.html");		
	});
	
	$("#start_m").click(function(event)
	{
		window.location.replace("../Administrar_Invitados/index.html");
	});
	
});