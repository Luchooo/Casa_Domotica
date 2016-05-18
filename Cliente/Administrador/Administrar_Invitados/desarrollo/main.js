import {getData} from "./persistencia"
import clasePersona from "./Persona";
import clasePersonas from "./Personas";
import utils from "./utils";
import photo from "./photo";

//Se invoca la clase de tipo Personas...
let personas    = new clasePersonas.Personas(),
    guidEdita   = "",
    photoUser   = "";


$("#actualizar").click(function(event) 
{
   location.reload();
});


$("#atras").click(function(event) 
{
   //Ingresa a la página del administrador
   
   window.location.replace("../Principal/index.html");
});



//Los elementos del formulario...
const elementos = ["identificacion", "primernombre", "primerapellido", "email", "fechanacimiento"];
//Para las acciones a realizar....
let accionesEventos = div =>
{
    //Editar..
    utils.nom_div("e_" + div).addEventListener('click', function(event)
    {
        let guid = utils.nom_div(`p_${event.target.id.split("_")[1]}`).getAttribute("data");
        //Para Traer al usuario a buscar...
        let {indice, busca} = personas.buscaPersona(guid);
        if(indice >= 0)
        {
            for(let i = 0; i < elementos.length; i++)
            {
                utils.nom_div(elementos[i]).value = busca[elementos[i]];
            }
            guidEdita = guid;
        }
        else
        {
            alert("La persona no existe");
        }
    });

    //Eliminar...
    utils.nom_div("d_" + div).addEventListener('click', function(event)
    {
        let guid = utils.nom_div(`p_${event.target.id.split("_")[1]}`).getAttribute("data");
        if(confirm("¿Está segur@ de realizar está acción?"))
        {
            personas.eliminaPersona(guid, error =>
            {
                if(error)
                {
                    alert("La persona no existe");
                }
                limpiarCampos();
                imprimeUsuarios();
            });
        }
    });
};

//Imprimir los usuarios...
let imprimeUsuarios = () =>
{
    let listadoPersonas = personas.getListado();
    let txt = `<table class = 'table-fill'>
                <thead><tr>
                <th>&nbsp</th>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Fecha</th>
                <th>Aceptar</th>
                <th>Rechazar</th></tr></thead>
                <tbody class = 'table-hover'>`;
    for(let veces = 1; veces <= 2; veces++)
    {
        for(let i = 0; i < listadoPersonas.length; i++)
        {
            if(veces === 1)
            {
                var datosPersona = listadoPersonas[i].getPersona();
                txt += `<tr id = 'p_${i}' data = ${datosPersona[0]}>`;
                for (let i = 1; i < datosPersona.length; i++)
                {
                    txt += `<td><center>${datosPersona[i]}</center></td>`;
                }
                //Editar/Eliminar...
                txt += `<td>
                            <center>
                                <img src = 'img/permitir.png' border = '0' id = 'e_${i}'/>
                            </center>
                        </td>
                        <td>
                            <center>
                                <img src = 'img/rechazar.png' border = '0' id = 'd_${i}'/>
                            </center>
                        </td>
                    </tr>`;
            }
            else
            {
                accionesEventos(i);
            }
        }
        if(veces === 1)
        {
            txt += `</tbody></table>`;
            utils.nom_div("imprime").innerHTML = txt;
        }
    }
};

//Para guardar los datos de un nuevo usuario...
//Acciones sobre el botón guardar...
utils.nom_div("guarda").addEventListener('click', function(event)
{
    let correcto     = true,
        nuevaPersona = {};
    for(let i = 0; i < elementos.length; i++)
    {
        if(utils.nom_div(elementos[i]).value === "")
        {
            alert(`Por favor digite ${elementos[i]}`);
            utils.nom_div(elementos[i]).focus();
            correcto = false;
            break;
        }
        else
        {
            nuevaPersona[elementos[i]] = utils.nom_div(elementos[i]).value;
        }
    }
    //Si correcto es verdadero...
    if(correcto)
    {
        let existeDatos = personas.existePersona(
                        {
                            guid            : guidEdita,
                            identificacion  : nuevaPersona.identificacion,
                            email           : nuevaPersona.email
                        });



        if(existeDatos === 0) //No existe...
        {
            if(utils.ValidaEmail(nuevaPersona.email))
            {
                //No se estaba editando...
                nuevaPersona.foto = photoUser;
                //debugger;
                if(guidEdita === "")
                {
                   personas.adicionaPersona(
                                                new clasePersona.Persona(nuevaPersona),
                                                error =>
                                                {
                                                    if(error)
                                                    {
                                                        alert("Error al guardar los datos...");
                                                    }
                                                    imprimeUsuarios();
                                                    limpiarCampos();
                                                    swal("Guardado!", "A la espera de aprobación del adminsitrador de la casa!", "success")
                                                    //Ir a otra página
                                                }
                                            );
                }
                else
                {
                    personas.editaPersona(
                                            guidEdita,
                                            new clasePersona.Persona(nuevaPersona),
                                            error =>
                                            {
                                                if(error)
                                                {
                                                    alert("Usuario no existe");
                                                }
                                                imprimeUsuarios();
                                                limpiarCampos();

                                            });
                }
            }
            else
            {
                alert("El correo no es válido");
                utils.nom_div(elementos[3]).focus();
            }
        }
        else
        {
            if(existeDatos == 1)
            {
                alert(`El usuario con la cédula: ${nuevaPersona.identificacion} ya existe`);
                utils.nom_div(elementos[0]).focus();
            }
            else
            {
                alert(`El correo : ${nuevaPersona.email}, ya existe`);
                utils.nom_div(elementos[3]).focus();
            }
        }
    }


});

//Para traer la información que está en la persistencia...
getData((data) =>
{
    for(let i = 0; i < data.length; i++)
    {
        personas.setListado(new clasePersona.Persona(data[i]));
    }
    imprimeUsuarios();
    photo.configurePhoto();
});


utils.nom_div("fperfil").addEventListener('click', (event) =>
{
    photoUser = photo.takePhoto();
    utils.nom_div("fperfil").src = photoUser;
    //console.log(photo.takePhoto());
    //console.log("Foto");
	//$(this).attr("src", fotoUser.img);
});

//Limpiar los campos del formulario...
let limpiarCampos = () =>
{
    guidEdita = "";
    photoUser = "";
    for(let i = 0; i < elementos.length; i++)
    {
        utils.nom_div(elementos[i]).value = "";
    }
};
