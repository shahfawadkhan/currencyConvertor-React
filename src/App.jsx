import React, { useState, useEffect } from 'react';
import InputBox from './components/InputBox';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [data, setData] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.rates);
        
      })
      .catch((err) => console.error("Error fetching currency data:", err));
  }, [from]);

 
  
  const convertCurrency = () => {
    if (data[to]) {
      const rate = data[to];
     
      const converted = amount * rate;
      
      setConvertedAmount(converted);
    }
  };



  const currencyOptions = Object.keys(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-600 text-center">Currency Converter</h1>

        <InputBox
          label="From"
          amount={amount}
          onAmountChange={(newAmount) => setAmount(newAmount)}
          currency={from}
          onCurrencyChange={(newCurrency) => setFrom(newCurrency)}
          options={currencyOptions}
        />

        <InputBox
          label="To"
          amount={convertedAmount}
          disabled={true}
          currency={to}
          onCurrencyChange={(newCurrency) => setTo(newCurrency)}
          options={currencyOptions}
        />

        <button
          onClick={convertCurrency}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Convert Amount
        </button>
      </div>
    </div>
  );
}

export default App;
