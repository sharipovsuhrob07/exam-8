import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import "../src/App.scss";
// import { makeStyles } from "@mui/material";

const App = () => {
  // const useStyles = makeStyles(() => ({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color: "white",
  //     minHeight: "100vh",
  //   },
  // }));

  // const classes = useStyles();

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
