import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Llamados from '../services/Llamados';

function Login() {
  const [nombreUsuario, SetNombreUsuario] = useState('');
  const [passwordUsuario, SetPasswordUsuario] = useState('');
  const [usuarios, SetUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDataUsers() {
      const datos = await Llamados.getUsers();
      SetUsuarios(datos);
    }
    fetchDataUsers();
  }, []);

  function nombre(evento) {
    SetNombreUsuario(evento.target.value);
  }

  function password(evento) {
    SetPasswordUsuario(evento.target.value);
  }

  function validar() {
    const usuarioValido = usuarios.find(
      (usuario) =>
        usuario.nombre === nombreUsuario && usuario.password === passwordUsuario
    );

    if (usuarioValido) {
      navigate('/home');
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }

    console.log(nombreUsuario, passwordUsuario);
    console.log(usuarios);
  }

  return (
    <div>
      <label htmlFor="">Nombre</label>
      <input value={nombreUsuario} onChange={nombre} type="text" />
      <label htmlFor="">Contraseña</label>
      <input value={passwordUsuario} onChange={password} type="password" />
      <button onClick={validar}>Iniciar</button>

      <p>
        ¿No tienes una cuenta? <Link to={"/register"}> Registrarme </Link>
      </p>
    </div>
  );
}

export default Login;