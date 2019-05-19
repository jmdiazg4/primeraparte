const {cursos,listarCursos} = require ('./DatosCurso.js');
const fs = require('fs');

const opciones = {
	id:{
		demand: true,
		alias: 'i'
	},
	nombre:{
		demand: true,
		alias: 'n'
	},
	cedula:{
		demand: true,
		alias: 'c'
	}
}


const argv = require('yargs')
			 .command ('inscribir','Formato de Inscripcion',opciones)
			 .argv

let crearArchivo = codigo => {
	
	let indice=cursos.findIndex(cursos => codigo == cursos.id);
	texto ='El estudiante '+argv.nombre+'\n'+
		 	' con cedula '+argv.cedula+'\n'+
		 	' se ha matriculado satisfactoriamente en el curso '+cursos[indice].nombre+'\n'+
		 	' de codigo ['+cursos[indice].id+'] duracion '+cursos[indice].duracion+' y valor '+cursos[indice].valor+'.'

	fs.writeFile('inscripcion.txt', texto, (err) => {
		if (err) throw (err);
		console.log("Se ha creado el archivo correctamente!");
	});		

}


let verificarID = (cursos) => {

	mensaje = 'Inscripcion exitosa!'+'\n'+
			'Creando Archivo...'
	let codigo = argv.id
	if(cursos.find(cursos => cursos.id == codigo)){
		console.log(mensaje);
		crearArchivo(codigo);
	}
	else if(codigo !=null )
		{ 
			console.log('Codigo inexistente');
			listarCursos(cursos);
		}
		else{
			listarCursos(cursos);
		}	
}

verificarID(cursos);






