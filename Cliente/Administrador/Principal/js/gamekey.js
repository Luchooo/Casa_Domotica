$(function()
{
	$("#puntaje").hide();
	var inicia = false;
	var animateIn = ["bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","slideInUp","slideInDown","slideInLeft","slideInRight","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp"];
	var animateOut = ["bounceOut","bounceOutDown","bounceOutLeft","bounceOutRight","bounceOutUp","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRigt","slideOutUp","slideOutDown","slideOutLeft","slideOutRight","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp"];
	var puntaje = 0;
	//var puntaje = 0;	
	$("#start_f").click(function(event)
	{	
		window.location.replace("administrar.html");
		//window.location.replaceAll('administrar.html');
		/*
			$(this).fadeOut('fast', function() {				
					setInterval(letraMuestra, 2000);
					inicia = true;
					$(start_m).hide();
					$(start_d).hide();		
			});				
		*/
	});
	
	$("#start_m").click(function(event)
	{
		$(this).fadeOut('fast', function() {
			setInterval(letraMuestra, 2000);
			inicia = true;
			$(start_f).hide();
			$(start_d).hide();
		});
	});
	$("#start_d").click(function(event)
	{
		window.location.replace("camara.html");
		/*
			$(this).fadeOut('fast', function() {
				setInterval(letraMuestra, 600);
				inicia = true;
				$(start_m).hide();
				$(start_f).hide();
			});
		*/
	});
	//Para generar letras aleatorias...
	var letraMuestra = function()
	{			
		//Se debe obtener una letra aleatoria del alfabeto y ubicarla en una posición aleatoria...
		var numLetra = Math.floor(Math.random() * 26) + 97;
		var posLetra = {
							left : Math.floor(Math.random() * (screen.width - 200)), 
							top  : Math.floor(Math.random() * (screen.height - 250)),
							bottom  : Math.floor(Math.random() * (screen.height - 100))
						};
		var letraPone = String.fromCharCode(numLetra).toUpperCase();
		var divLetra = "<div class = 'circulo letra_"+(letraPone)+" '" + 
							"style = \"left : "+(posLetra.left)+"px; top : "+(posLetra.top) + 
							"px; background-color: " + randomColor()+"\">" + 
							(String.fromCharCode(numLetra).toUpperCase()) + 
						"</div>";

		$("body").append(divLetra);
		//flash, wobble
		var aleatorio = Math.floor(Math.random()*animateIn.length);
		$("#tabla" + letraPone).addClass("'animated "+animateIn[aleatorio]+"'");//+animateIn[aleatorio]
	};

	//Para detectar eventos de teclado...
	$(document).keypress(function(event)
	{
		//console.log(event.keyCode, txtLetra);
		if(event.keyCode >= 97 && event.keyCode <= 122 && inicia)
		{
			var letraPresiona = String.fromCharCode(event.keyCode).toUpperCase();
			//Número de ocrrencias de la letra...
			var numVeces = $(".letra_" + letraPresiona).size();
			console.log("%c Veces letra presionada:" + numVeces ,"color:blue");
			var random = Math.floor(Math.random()*animateOut.length);
			$(".letra_" + letraPresiona).addClass("animated "+animateOut[random]).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
			{				
  				//var puntos = "<div class = 'puntos'>"+puntaje+" </div>";  			
  				numVeces >1 ? puntaje += Number(numVeces) : puntaje++;
  				$(this).remove();
				$("#puntaje").show();
				$("#puntaje").html("Puntaje: "+puntaje);
				/*
				if(puntaje >= 1)
				{
					swal("Ganaste", "Felicitaciones Puntaje Maximo", "success");
					$(this).fadeOut(slow, function(){
						window.location.assign(".");	
					});
				}*/
			});
		}
	});

	var randomColor = function()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};
});