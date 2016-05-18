import {nom_div} from "./utils";
let opcFoto = {
                    ejecuta 	: false,
                    reproduce 	: false,
                    video 		: nom_div("video"),
                    canvas 		: nom_div("canvas"),
                    width 		: 200,
                    height 		: 150
            };

let configurePhoto = () =>
{
    //Guardará la foto que s eha tomando el usuario desde el navegador...
    let fotoUser = {img : "", tomada : false}
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
    navigator.getMedia(
    {
        video: true,
        audio: false
    },
    function(fuente)//URL blog
    {
        if(navigator.mozGetUserMedia)
        {
            opcFoto.video.mozSrcObject = fuente;
        }
        else
        {
            var URL = window.URL || window.webkitURL;
            opcFoto.video.src = URL.createObjectURL(fuente);
        }
        opcFoto.video.play();
    },
    function(err)
    {
        //alert("El navegador no soporta getMedia");
        console.log("El navegador no soporta getUserMedia");
    });
    opcFoto.video.addEventListener('canplay', function(ev)
    {
        if (!opcFoto.ejecutaVideo)
        {
            console.log("ejecuta el vídeo");
            opcFoto.ejecutaVideo = true;
        }
    });
};

let takePhoto = () =>
{
    console.log(opcFoto);

    opcFoto.canvas.width = opcFoto.width;
	opcFoto.canvas.height = opcFoto.height;
	let c = opcFoto.canvas.getContext('2d');
	c.drawImage(opcFoto.video, 0, 0, opcFoto.width, opcFoto.height);
	//fotoUser.img = opcFoto.canvas.toDataURL();
	//fotoUser.tomada = true;
    return opcFoto.canvas.toDataURL();
};

/*
nom_div("fperfil").addEventListener('click', (event) =>
{
    opcFoto.canvas.width = opcFoto.width;
	opcFoto.canvas.height = opcFoto.height;
	let c = opcFoto.canvas.getContext('2d');
	c.drawImage(opcFoto.video, 0, 0, opcFoto.width, opcFoto.height);
	fotoUser.img = opcFoto.canvas.toDataURL();
	fotoUser.tomada = true;
	//$(this).attr("src", fotoUser.img);
});
*/

module.exports = {
                    configurePhoto,
                    takePhoto
                 };
