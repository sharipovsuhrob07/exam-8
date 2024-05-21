import axios from "axios";
import "./Carusel.scss";
import { TrendingCoins } from "../../api";
import { CryptoState } from "../../Context";
import { useEffect, useState } from "react";
import AliceCarousel, { Link } from "react-alice-carousel";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carusel = () => {
  const [trend, setTrend] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoinsCarusel = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrend(data);
  };
  // console.log(trend);

  useEffect(() => {
    fetchTrendingCoinsCarusel();
  }, [currency]);

  const items = trend.map((coin, index) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link key={index} className="carusel__item" to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}&nbsp;
          <span style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red"}}>
            {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="carusel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carusel;
