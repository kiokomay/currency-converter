import React, { useEffect, useState } from 'react';
import { Rates } from './types/exchangeRates';
import { Input } from './Input/Input';
import { Country } from './types/countries';
import { CurrencyEntity } from './types/countries';
import { CurrencySelector } from './currencySelector/currencySelector';
import './App.css';

const ExchangeBaseURL = 'https://v6.exchangerate-api.com/v6';
const key = process.env.REACT_APP_API_KEY;

function App() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [rates, setRates] = useState<Map<string, number>>(new Map());
  const [currencies, setCurrencies] = useState<CurrencyEntity[]>([]);
  const [conversion, setConversion] = useState<number>(1);
  const [convert, setConvert] = useState({ 
    first: {
      "code": "CAD",
      "name": "Canadian dollar",
      "symbol": "$"
    }, 
    second: {
      "code": "KRW",
      "name": "South Korean Won",
      "symbol": "₩"
    },
  });

  //rest countries api
   useEffect(() => {
     fetch('https://restcountries.com/v3.1/all')
       .then(res => res.json())
       .then(data => {
         let newCurrencies = new Set()
         let filtered = data
           .flatMap(({currencies}: Country) => currencies)
           .filter(({code}: CurrencyEntity) => {
             if (rates.has(code) && !newCurrencies.has(code)) {
               newCurrencies.add(code);
               return true;
             }
             return false;
           });
         setCurrencies(filtered);
       });
   }, [rates])

 //exchange rate api
  useEffect(() => {
    fetch(`${ExchangeBaseURL}/${key}/latest/CAD`)
      .then(res => res.json())
      .then(({conversion_rates}: Rates) =>
        setRates(new Map<string, number>(
          Object.entries(conversion_rates))
        )
      );
  }, [])
  
 //converts input to output
  useEffect(() => {
    let val: number = parseFloat(input);
    const firstCurr = rates.get(convert.first.code);
    const secondCurr = rates.get(convert.second.code);
    if(firstCurr && secondCurr) {
      val = val * secondCurr / firstCurr;
      setConversion(secondCurr / firstCurr);
    }

    if(isNaN(val)) setOutput('');
    else if (Number.isInteger(val)) setOutput(String(val));
    else setOutput(val.toFixed(2));
  }, [input, rates, convert])

  const swapCurr = () => {
    setConvert({ first: convert.second, second: convert.first });
  }

  return (
    <div className='appContainer'>
      <h1>Kioko's Currency Converter for Her Future Trip to Seoul</h1>
      <p className='rate'>
        {`1 ${convert.first.name} =
        ${conversion.toFixed(2)} ${convert.second.name}`}
      </p>
      <div className='input'>
        <div className='input'>
          <Input 
            value={input} 
            adjustedValue={(val: string) => setInput(val)}
          />
          <CurrencySelector 
            currencies={currencies} 
            currency={convert.first}
            select={(currency: CurrencyEntity) => {
              setConvert({...convert, first: currency});
            }}
          />
        </div>
        <p className='convertArrow'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgb(44, 33, 241)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
        </p>
        <div className='input'>
          <input readOnly
            className='resultInput'
            placeholder='Converted Currency'
            value={output} 
          />
          <CurrencySelector 
            currencies={currencies} 
            currency={convert.second}
            select={(currency: CurrencyEntity) => {
              setConvert({...convert, second: currency});
            }}
          />
        </div>
        <button>
        <div className='buttonTitle'>swap currencies</div>
        <div className='swap' onClick={swapCurr}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill='none' stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5"/></svg>
        </div>
        </button>
      </div>
    </div>
  );
}

export default App;
