import { useEffect, useState } from "react";
import { CryptoState } from "../Context";
import { CoinChart } from "../api";
import axios from "axios";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import ApexCharts from "react-apexcharts";
import "./CoinInfo.scss";
import Buttons from "./Buttons";

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const CoinInfo = ({ coin }) => {
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get(CoinChart(coin.id, days, currency));
      setCoinData(data.prices);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency, days, coin]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const chartOptions = {
    chart: {
      type: "line",
      height: 500,
      foreColor: "#fff",
      background: "transparent", // Set the chart background to transparent
    },
    theme: {
      mode: "dark",
    },
    xaxis: {
      categories: coinData
        ? coinData.map((coin) => {
            let date = new Date(coin[0]);
            return days === 1
              ? `${date.getHours()}:${date.getMinutes()}`
              : date.toLocaleDateString();
          })
        : [],
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: days === 1 ? "HH:mm" : "dd MMM yyyy",
      },
    },
  };

  const chartSeries = [
    {
      name: `Price ( Past ${days} Days ) in ${currency}`,
      data: coinData ? coinData.map((coin) => coin[1]) : [],
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coinInfo__container">
        {!coinData ? (
          <CircularProgress
            style={{ color: "#87CEEB" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={500}
              style={{ width: "100%" }}
            />
            <div className="coinInfo__buttons">
              {chartDays.map((day) => (
                <Buttons
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={days === day.value}
                >
                  {day.label}
                </Buttons>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
