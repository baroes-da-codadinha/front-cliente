/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/ApiClient';
import IconFechar from '../../assets/x.svg';
import IconCart from '../../assets/carrinho.svg';
import IconChecked from '../../assets/checked.svg';
import './styles.css';
import Snackbar from '../Snackbar';
import InputTexto from '../InputTexto';

export default function ModalEndereco({ abrirEndereco, setAbrirEndereco, setAbrirCart }) {
    const { token } = useAuth();

    const [mensagem, setMensagem] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [enderecoCadastrado, setEnderecoCadastrado] = useState(false)
    const { register, handleSubmit } = useForm();

    async function onSubmit(data) {
        try {
            const resposta = await post('endereco', data, token);

            if (!resposta.ok) {
                const msg = await resposta.json();

                setMensagem({ texto: msg, status: 'erro' });
                setOpenSnack(true);
                return;
            }

            setEnderecoCadastrado(true);
            setAbrirEndereco(true);
            setAbrirCart(true);
        } catch (error) {
            setMensagem({ texto: error.message, status: 'erro' });
            setOpenSnack(true);
            setEnderecoCadastrado(false);
        }
    }

    return (
        <>
            {abrirEndereco && (
                <div className="modal">
                    {enderecoCadastrado ? (
                        <>
                            <IconChecked />
                            <span className="text-endereco">Endereço adicionado com sucesso.</span>
                        </>
                    ) : (
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="base n-produto padded">
                                    <img
                                        className="fechar"
                                        src={IconFechar}
                                        alt='fechar'
                                        onClick={() => setAbrirEndereco(false)} />
                                    <div className="cart-titulo">
                                        <img src={IconCart} alt='carrinho' />
                                        Adicionar Endereço
                                    </div>
                                    <div className="coloca-um-gapizinho topzera">
                                        <InputTexto
                                            label="CEP"
                                            {...register('cep')}
                                        />
                                        <InputTexto
                                            label="Endereco"
                                            {...register('endereco')}
                                        />
                                        <InputTexto
                                            label="Complemento"
                                            {...register('complemento')}
                                        />
                                    </div>
                                    <button
                                        className="aceitar centraliza topzera"
                                        type="submit">
                                        Adicionar endereço</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {mensagem && <Snackbar
                        mensagem={mensagem}
                        openSnack={openSnack}
                        setOpenSnack={setOpenSnack}
                    />}
                </div>
            )}
        </>
    );
}
