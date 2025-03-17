import React, { useEffect, useState } from 'react';
import Llamadosform from '../services/Llamadosform';
import '../style/home.css'
import { Link } from 'react-router-dom';
function Form() {
  const [tareaPendiente, setTareaPendiente] = useState('');
  const [Formulario, setFormulario] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    async function mostrar() {
      try {
        const datos = await Llamadosform.getUsers();
        console.log("Datos obtenidos:", datos); // Verifica en la consola
        setFormulario(datos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    mostrar();
  }, []);

  const Click = async () => {
    if (editandoId) {
      console.log(editandoId);
      //Para devolver los datos al input y Actualizarlos
      await Llamadosform.updateUsers(tareaPendiente, editandoId);
      setEditandoId(null);
    } else {
      await Llamadosform.postUsers(tareaPendiente);
    }
    actualizarLista();
  };

  const eliminar = async (id) => {
    await Llamadosform.deleteUser(id);
    actualizarLista();
  };

  const editar = (usuario) => {
    setTareaPendiente(usuario.tareaPendiente);
    setEditandoId(usuario.id);
  };

  const actualizarLista = async () => {
    try {
      const datos = await Llamadosform.getUsers();
      setFormulario(datos);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  return (
    <div>
      <h1>Tareas Pendientes</h1>
      <label>Tareas Pendiente:</label>
      <input type="text" value={tareaPendiente} onChange={(e) => setTareaPendiente(e.target.value)} />
      <div className='divButton'>
        <button onClick={Click}>{editandoId ? 'Actualizar' : 'Enviar'}</button>
     
    
      </div>
      <div className='divRest'>
        {Formulario.length > 0 ? (
          Formulario.map((usuario) => (
            <div key={usuario.id}>
            <p>Tarea Pendiente: {usuario.nombre}</p>
             <button onClick={() => editar(usuario)}>Editar</button>
             <button onClick={() => eliminar(usuario.id)}>Eliminar</button>
             
              
    
            </div>
            
          ))
        ) : (
          <p>No hay datos disponibles</p>
          
        )}
      </div>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Form;