import React from 'react';
import './styles.css';

export default function InputBusca({
  placeholder, value, setValue, array, selecionarItem
}) {
  return (
    <div className="flex-column input-search">
      <input
        id="text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {array.length > 0 && (
        <div className="search-box">
          {array.map(item => (
            <div
              className="search-itens"
              onClick={() => selecionarItem(item)}
            >
              {item.nome}
            </div>
          ))}
        </div>)
      }
    </div>
  );
}
