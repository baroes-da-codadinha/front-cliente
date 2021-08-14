import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';
import IllustrationLogin from '../../assets/illustration-comp.svg';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import Snackbar from '../../components/Snackbar';
import './styles.css';

export default function Login() {
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logar } = useAuth();
  const history = useHistory();

  async function onSubmit(data) {
    try {
      const resposta = await post('login', data);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        return;
      }

      const { token } = await resposta.json();

      logar(token);

      history.push('/produtos');
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  return (
    <div className="img-login">
      <img className="ilustracao" src={IllustrationLogin} alt="" />
      <div className="base login">
        <div className="title-box">
          <span className="titulo pagina">Login</span>
          <div className="barril-logo" />
        </div>
        <form onSubmit ={handleSubmit(onSubmit)}>
          <InputTexto
            label="Email"
            {...register('email', { required: true, minLength: 3, })}
          />
          <InputSenha
            label="Senha"
            {...register('senha', { required: true, minLength: 5, })}
          />
          <div className="button-box">
            <button
              className="aceitar"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="link-box">
            <span>Ainda não tem uma conta? </span>
            <NavLink to="/cadastro"> Cadastre-se</NavLink>
          </div>
        </form>
      </div>
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
