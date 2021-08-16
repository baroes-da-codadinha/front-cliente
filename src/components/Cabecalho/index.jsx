import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './styles.css';
import Avatar from '../../assets/avatar.png';
import Illustration from '../../assets/illustration-3.svg';
import BarriLogo from '../../assets/barril-logo.png';
import Snackbar from '../Snackbar';

export default function Cabecalho() {
  const history = useHistory();
  const { token, deslogar } = useAuth();

  const [erro, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  function logout() {
    deslogar();
  }
  return (
    <div>
      <div
        className="imagem-cabecalho"
      />
      <img className="dash-ilustracao" src={Illustration} alt="" />
      <img className="dash-barril-logo" src={BarriLogo} alt="" />
      <div className="avatar-borda">
        <img
          className="avatar"
          src={Avatar}
          alt="avatar"
        />
      </div>
      <div className="localizar-titulo">
        <span className="titulo sombreado">
          Restaurantes
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
