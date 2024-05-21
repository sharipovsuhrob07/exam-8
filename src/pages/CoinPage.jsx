import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../Context";
import axios from "axios";
import { SingleCoin } from "../api";
import "./CoinPage.scss";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../components/Banner/Carusel";

const CoinPage = () => {
  const [coin, setCoin] = useState();
  const { id } = useParams();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  // console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "#87CEEB" }} />;

  return (
    <div className="coinpage__container">
      <div className="coinpage__sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="coinpage__title">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="coinpage__subtitle">
          {coin?.description.en.split(". ")[0]}
        </Typography>
        <div className="coinpage__data">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="coinpage__data-title">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="coinpage__data-title">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="coinpage__data-title">
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
