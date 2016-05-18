class Persona
{
    constructor(data)
    {
        //debugger;
        this.guid = data.guid;
        this.identificacion = data.identificacion;
		this.primernombre = data.primernombre;
		this.primerapellido = data.primerapellido;
		this.email = data.email;
		this.fechanacimiento = data.fechanacimiento;
        this.foto = data.foto;
    }
    
    getPersona()
    {
        return [
                  this.guid,
                  `<img src = '${this.foto}' class = 'ftabla'>`,
                  this.identificacion,
                  `${this.primernombre} ${this.primerapellido}`,
                  this.email,
                  this.fechanacimiento
        ];
    }
}
module.exports = {Persona};
