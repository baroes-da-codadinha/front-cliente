import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import './styles.css';
import Avatar from '../../assets/avatar.png';
import Illustration from '../../assets/illustration-3.svg';
import Snackbar from '../Snackbar';

export default function Cabecalho() {
  const history = useHistory();
  const { token, deslogar } = useAuth();

  const [dadosUsuario, setDadosUsuario] = useState('');
  // const [usuarioEditado, setUsuarioEditado] = useState(null);

  const [erro, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  function logout() {
    history.push('/');
    deslogar();
  }

  async function onLoad() {
    try {
      const resposta = await get('usuarios', token);
      setDadosUsuario(await resposta.json());
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <div
        className="imagem-cabecalho"
      />
      <img className="dash-ilustracao" src={Illustration} alt="" />
      <div className="avatar-borda">
        <img
          className="avatar"
          src={Avatar}
          alt="avatar"
        />
      </div>
      <div className="localizar-titulo">
        <span className="titulo sombreado">
          Título sombreado
        </span>
        <button
          className="botao-logout sombreado"
          type="button"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      )
      <Snackbar
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
