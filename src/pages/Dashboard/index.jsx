/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { get, post } from '../../services/ApiClient';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Card from '../../components/Card';
import Snackbar from '../../components/Snackbar';
import InputBusca from '../../components/InputBusca';

export default function Dashboard() {
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const [produtos, setProdutos] = useState('');
  const [restaurantes, setRestaurantes] = useState('');


  useEffect(() => {
    async function buscarRestaurantes() {
      try {
        const resposta = await post('restaurantes', { busca });

        const lista = await resposta.json();

        setRestaurantes(lista);
      } catch (error) {
        setMensagem({ texto: error.message, status: 'erro' });
        setOpenSnack(true);
      }
    }
    buscarRestaurantes();
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
            array={restaurantes}
            selecionarItem={selecionarItem}
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
