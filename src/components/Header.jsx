import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import { CryptoState } from "../Context";
import DrawerWatchList from "./DrawerWatchList";

const Header = () => {
  const { currency, setCurrency } = CryptoState();
  // console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar className="header__toolbar">
            <Link to="/">
              <Typography className="header__logo_title" variant="h6">
                CRYPTOFOLIO
              </Typography>
            </Link>

            <Typography>
              <Select
                variant="outlined"
                style={{ width: 100, height: 40, marginRight: 15 }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"RUB"}>RUB</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
              <DrawerWatchList />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
