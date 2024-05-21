import React from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { CryptoState } from "../Context"; 
const DrawerWatchList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { watchlist, removeFromWatchlist } = CryptoState(); 

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
        style={{ backgroundColor: "#87CEEB" }}
      >
        Watchlist
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="30vw" textAlign="center" role="presentation">
          <Typography variant="h6" component="div" gutterBottom>
            Watchlist
          </Typography>
          {watchlist.length > 0 ? (
            <Grid container spacing={2}>
              {watchlist.map((coin) => (
                <Grid item xs={12} sm={6} key={coin.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, mx: "auto" }}
                      image={coin.image}
                      alt={coin.name}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography component="div" variant="h6">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </Typography>
                      <Typography component="div" variant="body2">
                        Symbol: {coin.symbol.toUpperCase()}
                      </Typography>
                      <Typography component="div" variant="body2">
                        Price: ${coin.current_price.toLocaleString()}
                      </Typography>
                      <Typography component="div" variant="body2">
                        Market Cap: ${coin.market_cap.toLocaleString()}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeFromWatchlist(coin.id)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No items in the watchlist</Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerWatchList;
