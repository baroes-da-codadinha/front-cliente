import React, { useState } from 'react';
import './styles.css';

export default function InputBusca({
   placeholder, value, setValue,
}){

  const [drop, setDrop] = useState(false);

  function ativarDrop() {
    setDrop(!drop);
  }

  function selecionarCategoria(item) {
    setValue(item);
    setDrop(false);
  }
  return (
    <div className="flex-column input-search">
      <input
        id="text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="search-box">
      { ['um', 'dois', 'tres', 'quatro'].map(item => (
       <div className="search-item">
         item
       </div>
     ))
      }
      </div>
    </div>
  );
}
