import { Container, Typography } from "@mui/material";
import "./Banner.scss";
import Carusel from "./Carusel";
const Banner = () => {
  return (
    <div className="banner">
      <Container className="banner__container">
        <div className="banner__content">
          <Typography variant="h2" className="banner__title">
            CRYPTOFOLIO WATCH LIST
          </Typography>
          <Typography variant="subtitle2" className="banner__text">
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carusel />
      </Container>
    </div>
  );
};

export default Banner;
