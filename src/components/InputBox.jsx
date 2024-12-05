import React, { useId } from 'react';

function InputBox({
  label,
  amount,
  disabled = false,
  options = [],
  currency,
  onAmountChange,
  onCurrencyChange
}) {
  const inputId = useId();

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex space-x-4">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
        >
          {options.map((currencyOption) => (
            <option key={currencyOption} value={currencyOption}>
              {currencyOption}
            </option>
          ))}
        </select>

        <input
          id={inputId}
          type="number"
          value={amount}
          disabled={disabled}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className={`w-2/3 bg-gray-50 border ${
            disabled ? 'border-gray-300' : 'border-blue-300'
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>
    </div>
  );
}

export default InputBox;
