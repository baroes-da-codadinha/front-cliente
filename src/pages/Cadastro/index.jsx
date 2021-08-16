/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post } from '../../services/ApiClient';
import './styles.css';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import Snackbar from '../../components/Snackbar';

export default function Cadastro() {
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm();
  const history = useHistory();

  useEffect(() => {
    const { nome, email, telefone, senha, senhaRepetida } = formState.errors;
    if (nome) {
      setMensagem({ texto: nome.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }
    if (email) {
      setMensagem({ texto: email.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }
    if (telefone) {
      setMensagem({ texto: telefone.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }
    if (senha) {
      setMensagem({ texto: senha.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }
    if (senhaRepetida) {
      setMensagem({ texto: senhaRepetida.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }
  }, [formState])

  async function onSubmit(data) {
    try {
      const resposta = await post('consumidor', data);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        return;
      }

      history.push('/');
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  return (
    <div className="img-cadastro">
      <div className="base cadastro">
        <div className="title-box">
          <span className="titulo pagina">Cadastro</span>
        </div>
        <form
          className="formulario"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-um">
            <InputTexto
              label="Nome do usuário"
              {...register('nome', 
              { required: 'Nome é um campo obrigatório' })}
            />
            <InputTexto
              label="Email"
              {...register('email', 
              { required: 'Email é um campo obrigatório', 
              minLength: { value: 3, message: 'Email inválido'},})}
            />
            <InputTexto
              label="Telefone"
              {...register('telefone', 
              { required: 'Telefone é um campo obrigatório', 
              minLength: { value: 8, message: 'A senha deverá ter ao menos 8 caracteres'},})}
            />
            <InputSenha
              label="Senha"
              {...register('senha', 
              { required: 'Senha é um campo obrigatório', 
              minLength: { value: 5, message: 'A senha deverá ter ao menos 5 caracteres'},})}
            />
            <InputSenha
              label="Repita a senha"
              {...register('senhaRepetida', 
              { validate: v => v === getValues("senha") || "As senhas devem ser iguais" })}
            />
          </div>
          <div className="button-box">
            <button
              className="aceitar"
              type="submit"
            >
              Criar conta
            </button>
          </div>
          <div className="link-box">
            <span>Já tem uma conta? </span>
            <NavLink to="/"> Login</NavLink>
          </div>
        </form>
      </div>
      <div className="ilustracao" />
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
