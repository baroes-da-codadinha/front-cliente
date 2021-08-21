/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { get, post } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';
import './styles.css';
import Card from '../../components/Card';
import InputBusca from '../../components/InputBusca';
import Cabecalho from '../../components/Cabecalho';
import Snackbar from '../../components/Snackbar';

export default function Dashboard() {
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { token } = useAuth()
  const [produtos, setProdutos] = useState('');
  const [restaurantes, setRestaurantes] = useState('');

  async function buscarRestaurantes(busca) {
    try {
      const resposta = await post('restaurantes', { busca }, token);

      const lista = await resposta.json();

      setRestaurantes(lista);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  useEffect(() => {
    buscarRestaurantes();
    console.log(restaurantes)
  }, [])

  useEffect(() => {
    buscarRestaurantes(busca);
  }, [busca])


  async function selecionarItem(item) {
    try {
      const resposta = await get(`restaurantes/${item.id}`);

      setBusca('')
      setRestaurantes([]);

      if (resposta) {
        const arrayProdutos = await resposta.json();

        if (arrayProdutos.length === 0) {
          setMensagem({ texto: "Não foram encontrador produtos para este restaurante.",
           status: 'erro' });
          setOpenSnack(true);
          setProdutos();
          return;
        }
        setProdutos(arrayProdutos);
        return;
      }

    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }


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
      <div className="container-produtos">
      {restaurantes && 
            restaurantes.map((restaurante) => (
              <Card key={restaurante.id} restaurante={restaurante} />
            ))
      }
      </div>
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
