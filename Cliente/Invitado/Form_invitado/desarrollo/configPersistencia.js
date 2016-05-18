
    let config = {
                    nombre : "userPhoto",
                    tipo   : "WebSQL",
                    schema : {
                                nombre    : "usuarios",
                                registros : [
                                                "guid",
                                                "identificacion",
                                                "primernombre",
                                                "primerapellido",
                                                "email",
                                                "fechanacimiento",
                                                "foto"
                                            ]
                            }
                };

module.exports = {config};
