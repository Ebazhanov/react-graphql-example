import React, { ChangeEvent, useState } from "react";
import "./App.scss";
import { gql, useQuery } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates({ inputValue }: any) {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates
    .filter(({ currency }: { currency: string }) => {
      console.log(inputValue);
      return currency.toLowerCase().includes(inputValue);
    })
    .map(({ currency, rate }: { currency: string; rate: number }) => (
      <div key={currency}>
        <p>
          {currency}: {rate}
        </p>
      </div>
    ));
}

function App() {
  const [content, setContent] = useState("");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="exchange-container">
      <h2>Currency Exchange Rates</h2>
      <input
        type="text"
        className="search-field"
        autoFocus
        onChange={changeHandler}
        value={content}
        placeholder="Enter currency name"
      />
      <ExchangeRates inputValue={content} />
    </div>
  );
}

export default App;
