/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Card from '../../components/Card';
import Snackbar from '../../components/Snackbar';
import InputBusca from '../../components/InputBusca';

export default function Dashboard() {
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { token } = useAuth();

  const [produtos, setProdutos] = useState('');

  useEffect(() => {

    try {
      get('restaurantes', busca).then(data => {
        
      })
      
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }

  }, [busca])


  return (
    <div>
      <Cabecalho />
      <div className={`sub-cabecalho ${!produtos && 'vazio'}`}>
        <div>
          <span>
            Bem vindo!<br />
            Vamos pedir um ranguinho?
          </span>
        </div>
        <form>
          <InputBusca
          value={busca}
          setValue={setBusca}
              />
        </form>
      </div>
        {produtos && (
          <div className="container-produtos">
            {
              produtos.map((produto) => (
                <Card key={produto.id} produto={produto} />
              ))
            }
          </div>
        )}
        <Snackbar
          mensagem={mensagem}
          openSnack={openSnack}
          setOpenSnack={setOpenSnack}
        />
      </div>
      );
}
