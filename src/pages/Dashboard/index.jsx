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
  const [selecionado, setSelecionado] = useState('');
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
  }, [])

  useEffect(() => {
    buscarRestaurantes(busca);
  }, [busca, buscarRestaurantes])
  


  async function selecionarItem(item) {
    setSelecionado(item);
  }


  return (
    <div>
      <Cabecalho 
      restaurante={selecionado}
      />
      <div className="sub-cabecalho">
        {selecionado ? (
          <span>
            Selecionado
          </span>
        ) :(
        <form>
          <InputBusca
            value={busca}
            setValue={setBusca}
          />
        </form>
        )}
      </div>
      <div className="container-produtos">
      {restaurantes && 
            restaurantes.map((restaurante) => (
              <Card 
              key={restaurante.id} 
              item={restaurante}
              onClick={selecionarItem}
              />
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
