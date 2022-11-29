import React, { useEffect, useState } from 'react';
import { CurrencyEntity } from '../types/countries';
import '../App.css';

interface Props {
  currencies: CurrencyEntity[],
  currency: CurrencyEntity,
  select: (currency: CurrencyEntity) => void,
}

export const CurrencySelector = ({ 
  currencies, 
  currency,
  select, 
}: Props) => {
  const initialSearch = `${currency.name} - ${currency.code}`;
  const [search, setSearch] = useState<string>(initialSearch);
  const [currencyVal, setCurrencyVal] = useState(currency);
  const [displayDropdown, setDisplayDropdown] = useState(false);

  useEffect(() => {
    setSearch(`${currency.name} - ${currency.code}`);
  }, [currencyVal, currency])

  return (
    <div className=''>
      <input 
        className='input'
        type="text" 
        placeholder="Search for a currency"
        value={search}
        // tabIndex={0}
        onKeyPress={e => {
          if(e.key == 'Enter') {
            setDisplayDropdown(!displayDropdown)
          }
        }}
        onChange={e => {
          setSearch(e.target.value)
          setDisplayDropdown(true)
        }}
      />
      <div className='' style={ displayDropdown ?  
        {visibility: 'visible', opacity: '1', display: 'block'} : 
        {visibility: 'hidden', opacity: '0', display: 'none'}
      }>
        {currencies.map((currency: CurrencyEntity) => 
        (currency.name + currency.code).toLowerCase()
          .includes(search.toLowerCase()) ?
            <option
              className=''
              key={currency.code}
              onClick={() => {
                select(currency)
                setCurrencyVal(currency)
                setSearch(`${currency.name} - ${currency.code}`)
                setDisplayDropdown(false)
              }}
            >
              {`${currency.name} - ${currency.code}`}
            </option> : null
        )}
      </div>
    </div>
  );
}