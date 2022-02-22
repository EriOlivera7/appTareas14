const fs = require('fs')//modulo nativo de node
const tareas = require('./tareas.json')
const guardarJSON = (tareas) => {
    fs.writeFileSync('./tareas.json',JSON.stringify(tareas,null,3));//los parametros son donde queremos guardar y con stringify (que soporta 3 parametros) que queremos guardar
}
const mostrarTareas = (tareas) =>{
    tareas.forEach((tarea,index) => {
        console.log(`${index + 1} - ${tarea.descripcion} - estado: ${tarea.estado} - ID: ${tarea.id}`);
    });
}
module.exports = {

    listarTareas: () => {
        mostrarTareas(tareas)
        return null
    },
    agregarTarea : (tarea) => {

        tareas.push(tarea);//metodo de array 
        guardarJSON(tareas)

        return console.log('Tarea agregada!')
    },
     actualizarTarea : (id) => {

         let check = tareas.filter(tarea => tarea.id === id);

         if(check.length === 0){
             return console.log('ID inexistente!');
         }
         let tareasActualizadas = tareas.map(tarea => {
             if(tarea.id === id){
                 tarea.estado = 'Completado';
                 return tarea
             }
             return tarea
         })

        guardarJSON(tareasActualizadas)

         return console.log('Tareas actualizadas')
    },

    eliminarTarea : (id) => {
        let tareasFiltradas = tareas.filter(tarea => {
            return tarea.id !== id
        })
        
        guardarJSON(tareasFiltradas)

        return console.log('Tarea eliminada')
    },
    filtrarTareas : (estado) => {
        let estadosValidos = ['Completado', 'En proceso', 'Pendiente'];
        if(!estadosValidos.includes(estado)){
            return console.log('Estado no valido', estadosValidos);
        }
        let tareasFiltradas = tareas.filter((tarea) => {
            return tarea.estado === estado
        });
        mostrarTareas(tareasFiltradas)
    }, 
    buscarTarea : (keyword) => {
        let resultado = tareas.filter(tarea =>{
            return tarea.descripcion.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        })
        mostrarTareas(resultado);
        return null
    }
}