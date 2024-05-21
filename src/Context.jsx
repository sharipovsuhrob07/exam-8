import React, { createContext, useContext, useEffect, useState } from "react";

const CryptoContext = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    try {
      const parsedWatchlist = JSON.parse(storedWatchlist);
      return Array.isArray(parsedWatchlist) ? parsedWatchlist : [];
    } catch (error) {
      console.error("Error parsing watchlist from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "RUB") setSymbol("₽");
    else if (currency === "INR") setSymbol("₹");
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (coin) => {
    const isCoinInWatchlist = watchlist.some((item) => item.id === coin.id);

    if (!isCoinInWatchlist) {
      setWatchlist((prevWatchlist) => {
        if (Array.isArray(prevWatchlist)) {
          return [...prevWatchlist, coin];
        } else {
          console.error("prevWatchlist is not an array");
          return prevWatchlist;
        }
      });
    }
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist((prevWatchlist) => {
      if (Array.isArray(prevWatchlist)) {
        return prevWatchlist.filter((coin) => coin.id !== coinId);
      } else {
        console.error("prevWatchlist is not an array");
        return prevWatchlist;
      }
    });
  };

  return (
    <CryptoContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default Context;

export const CryptoState = () => {
  return useContext(CryptoContext);
};
