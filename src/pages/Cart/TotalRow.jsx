import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { setOrderNumber, clearCart } from "../../redux/cartSlice";
import NumberFormat from "react-number-format";
import { CHECKOUT_PAGE } from "../../shared/constants/navigation";

const TotalRow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { total } = useSelector((s) => s.cart);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        direction="row"
        alignItems="center"
        sx={{ margin: 1 }}
      >
        <Grid item mx={8}>
          <Button
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bolder",
            }}
            disabled={total === 0}
            variant="contained"
            onClick={() => dispatch(clearCart())}
          >
            CLEAR CART
          </Button>
        </Grid>

        <Grid item mx={8}>
          <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
            Total $ &nbsp; &nbsp;
            <NumberFormat thousandSeparator displayType="text" value={total} />
          </Typography>
        </Grid>

        <Grid item mx={8}>
          <Button
            color="primary"
            disabled={total === 0}
            variant="contained"
            onClick={() => {
              dispatch(setOrderNumber());
              history.push(CHECKOUT_PAGE.path);
            }}
          >
            CHECKOUT
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TotalRow;
