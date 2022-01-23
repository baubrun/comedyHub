import React from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import clsx from "clsx";
import TitleBar from "../../shared/TitleBar/TitleBar";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import NumberFormat from "react-number-format";
import { useTheme } from "@mui/material";

const stripePromise = loadStripe(process.env.REACT_APP_PK_STRIPE);

const useStyles = makeStyles((theme) => ({
  cards: { height: "100vh" },
  purchaseCard: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    margin: "0 16px",
    height: "100vh",
  },
  info: {
    color: "white",
    fontFamily: "Courier Prime",
  },
  summaryCard: {
    borderRadius: "5px",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    fontFamily: "Courier Prime",
    color: "white",
    letterSpacing: "3px",
    padding: "16px",
    textAlign: "center",
  },
  summaryCardText: {
    fontFamily: "Courier Prime",
    color: "white",
    letterSpacing: "3px",
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { items, total } = useSelector((s) => s.cart);

  const numTickets = () => {
    return items.map((t) => t.quantity).reduce((acc, curr) => acc + curr, 0);
  };

  if (total < 1) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            CART EMPTY
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <TitleBar text="checkout" />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
        sx={{ mt: 4 }}
      >
        <Grid item xs={12} md={6}>
          <Card className={clsx([classes.purchaseCard])} raised>
            <CardHeader className={classes.info}>
              <Typography
                className={classes.info}
                variant="h4"
                sx={{ textTransform: "uppercase" }}
              >
                card detail
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography className={classes.info} variant="h6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm total={total} items={items} />
                </Elements>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card raised>
            <CardContent
              sx={{
                textAlign: "center",
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <Box className={classes.summaryCard}>
                <Typography
                  sx={{
                    fontFamily: "Courier Prime",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                  variant="h6"
                >
                  total
                </Typography>

                <Typography variant="h5" className={classes.summaryCardText}>
                  $
                  <NumberFormat
                    thousandSeparator
                    displayType="text"
                    value={total}
                  />
                </Typography>
              </Box>

              <Box>
                <Typography
                  className={classes.summaryCardText}
                  color="secondary"
                  variant="h5"
                >
                  SUMMARY
                </Typography>

                <Typography variant="h5" className={classes.summaryCardText}>
                  {`${numTickets()} ticket${numTickets() > 1 ? "s" : ""} `}
                </Typography>

                {items?.map((item, idx) => (
                  <List key={idx}>
                    <ListItemText>
                      <Typography color="primary" variant="h5">
                        {item.title}
                      </Typography>
                    </ListItemText>
                  </List>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
