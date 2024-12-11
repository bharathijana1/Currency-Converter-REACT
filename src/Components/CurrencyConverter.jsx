import React, { useEffect, useState } from 'react';
import axios from 'axios'

const CurrencyConverter = () => {
    const [ amount, setAmount ] = useState(1);
    const [ fromCurrency, setFromCurrency ] = useState("USD");
    const  [ toCurrency, setToCurrency ] = useState("INR");
    const [ convertedAmount, setConvertedAmount ] = useState(null);
    const [ exchangeRate, setExchageRate ] = useState(null)
    useEffect(() => { 
        const getExchangeRate = async() => {
            try{
            let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
            const res = await axios.get(url);
            // console.log(res);
            setExchageRate(res.data.rates[toCurrency])
            }catch(error){
                console.error(error)
            }
        }
        getExchangeRate();

    },[fromCurrency, toCurrency]);
    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value);
    }
    const handlefromcurrency = (e) => {
        setFromCurrency(e.target.value)
    }
    const handletocurrency =(e) => {
        setToCurrency(e.target.value)
    }
    useEffect(() => {
        if(exchangeRate !== null){
            setConvertedAmount((amount * exchangeRate).toFixed(2))
        }
    },[amount, exchangeRate])
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl p-3 font-medium text-amber-700">Currency Converter</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mx-auto w-full ">
            <div className="w-full lg:w-3/5 ">
                <form className="border m-1 shadow-sm shadow-amber-500 md:m-6 my-2 p-4 flex flex-col justify-center items-center">
                    <div className="my-2 flex flex-col md:flex-row gap-2 lg:gap-10 w-full md:text-lg justify-center items-center">
                        <label htmlFor="amount" className="px-1 md:px-2 w-full md:w-1/5 lg:w-1/4 font-medium">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            className="border p-1 md:p-2 w-full md:2/5 lg:w-1/2 text-lg"
                            placeholder='Enter the Amount'
                            value={amount}
                            name='amount'
                            onChange={handleAmountChange}
                        />
                    </div>
                    <div className="my-2 flex flex-col md:flex-row gap-2 lg:gap-10 w-full text-lg justify-center items-center">
                        <label htmlFor="fromcurrency" className="px-1 md:px-2 w-full md:text-lg md:w-1/5 lg:w-1/4 font-medium capitalize">From currency</label>
                        <select id="fromcurrency" className="border capitalize p-1 md:p-2 w-full md:2/5 lg:w-1/2 " value={fromCurrency} onChange={handlefromcurrency}>
                            <option value="USD">USD - United States dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British pound sterling</option>
                            <option value="JPY">JPY - Japanese yen</option>
                            <option value="AUD">AUD - Australian dollar</option>
                            <option value="CAD">CAD - Canadian dollar</option>
                            <option value="CNY">CNY - Chinese yuan</option>
                            <option value="INR">INR - Indian rupee</option>
                            <option value="BRL">BRL - Brazilian real</option>
                            <option value="ZAR">ZAR - South African rand</option>
                        </select>
                    </div>
                    <div className="my-2 flex flex-col md:flex-row gap-2 lg:gap-10 w-full text-lg justify-center items-center">
                        <label htmlFor="tocurrency" className='px-1 md:px-2 w-full md:text-lg md:w-1/5 lg:w-1/4 font-medium capitalize'>To currency</label>
                        <select id="tocurrency" className="border capitalize p-1 md:p-2 w-full md:2/5 lg:w-1/2 " value={toCurrency} onChange={handletocurrency}>
                            <option value="USD">USD - United States dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British pound sterling</option>
                            <option value="JPY">JPY - Japanese yen</option>
                            <option value="AUD">AUD - Australian dollar</option>
                            <option value="CAD">CAD - Canadian dollar</option>
                            <option value="CNY">CNY - Chinese yuan</option>
                            <option value="INR">INR - Indian rupee</option>
                            <option value="BRL">BRL - Brazilian real</option>
                            <option value="ZAR">ZAR - South African rand</option>
                        </select>
                    </div>

                    <div className="mt-3 text-center border-2 border-dotted border-amber-800 px-3 p-2">
                        <p className='text-xl font-medium '>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
                    </div>
                </form>
            </div>

            {/* Image section */}
            <div className="w-full md:w-2/5 flex justify-center items-center p-2 m-2">
                <img
                    src="../src/Components/img/currency.jpg"
                    alt="currency converter"
                    className="object-cover shadow-lg shadow-gray-400"
                />
            </div>
        </div>
    </div>
  )
}

export default CurrencyConverter
