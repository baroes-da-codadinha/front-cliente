/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './styles.css';
import Carrinho from '../../assets/carrinho.svg';
import Snackbar from '../Snackbar';

export default function Modal({ abrirModal, setAbrirModal }) {

    async function onHandleEndereco(e) {

    }

    return (
        <>
            <div className="modal">
                <div>
                    <div>
                        <Carrinho />
                        <h3>Adicionar Endereço</h3>
                    </div>

                    <div>
                        <form onSubmit={(e) => onHandleEndereco}>


                        </form>
                    </div>
                </div>
                <Snackbar
                />
            </div>
        </>
    );
}
