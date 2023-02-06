import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { BallTriangle } from "react-loader-spinner";
import Typography from "@mui/material/Typography";
import { clearCart, createPayment, createReceipt } from "../../redux/cartSlice";
import { showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import { useFormik } from "formik";
import { RECEIPT_PAGE } from "../../shared/constants/navigation";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "black",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "24px",
      color: "#391300",
      "::placeholder": {
        color: "#ffffff",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const cardOnFile = "4000 0012 4000 0000";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#fff",
    margin: "8px 0",
    fontSize: "24px",
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    textAlign: "center",
    padding: "10px",
  },
  purchase: {
    padding: "8px 0",
    fontSize: "24px",
  },
  row: {
    margin: "50px 0",
  },
}));

const CheckoutForm = (props) => {
  const { items, total } = props;
  const classes = useStyles();
  const stripe = useStripe();
  const { payPending, orderNumber, paySuccess } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const elements = useElements();
  const [anchorEl, setAnchorEl] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (evt, text) => {
    navigator.clipboard.writeText(text);
    setAnchorEl(evt.currentTarget);
  };

  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (paySuccess) {
      dispatch(createReceipt());
      dispatch(clearCart());
      history.replace(RECEIPT_PAGE.path);
    }
  }, [paySuccess]);

  const filterItems = () => {
    const filteredItems = items.map((i) => {
      return {
        event: i?._id,
        quantity: i?.quantity,
      };
    });
    return filteredItems;
  };

  const fetchPayment = async (total, id) => {
    const data = {
      paymentId: id,
      order: orderNumber,
      customer: formik.values,
      items: filterItems(),
      total: total * 100,
    };
    try {
      dispatch(createPayment(data));
    } catch (err) {
      dispatch(
        showToaster({
          message: err?.response ? err?.response.data : err?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  const handleSubmit = async (values) => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: values.name,
        email: values.email,
      },
    });
    if (!error) {
      const { id } = paymentMethod;
      fetchPayment(total, id, orderNumber);
    } else {
      dispatch(
        showToaster({
          message: error?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  return (
    <Grid container direction="column">
      <form onSubmit={formik.handleSubmit}>
        <Grid item>
          <Box className={classes.row}>
            <TextField
              error={formik.touched.name && Boolean(formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                className: classes.input,
              }}
              name="name"
              onChange={formik.handleChange}
              placeholder="Name on card"
              required={true}
              value={formik.values.name}
            />
          </Box>
        </Grid>

        <Grid item>
          <Box className={classes.row}>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              InputProps={{
                className: classes.input,
              }}
              onChange={formik.handleChange}
              placeholder="Email"
              name="email"
              required={true}
              value={formik.values.email}
            />
          </Box>
        </Grid>

        {<CardElement options={CARD_OPTIONS} />}

        <Grid item>
          <Box className={classes.row}>
            <Button
              className={classes.purchase}
              color="secondary"
              fullWidth
              text="PURCHASE"
              type="submit"
              disabled={!stripe || !elements || payPending}
              variant="contained"
            >
              Purchase &nbsp; &nbsp;
              <span>
                <BallTriangle
                  color="white"
                  height={40}
                  width={40}
                  visible={payPending}
                />
              </span>
            </Button>
          </Box>
        </Grid>
      </form>

      <Grid container item direction="column">
        <Grid item xs={1} sx={{ width: 200, cursor: "pointer" }}>
          <Tooltip
            title="copy to clipboard"
            onClick={(evt) => handleCopy(evt, cardOnFile)}
            placement="top"
          >
            <Typography aria-describedby={id} variant="h6">
              {cardOnFile}
            </Typography>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                padding: 0.5,
                fontSize: 11,
              }}
            >
              Copied!
            </Typography>
          </Popover>
        </Grid>

        <Grid item>
          <Typography variant="h6">EXP: enter date</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">CVC: 424</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Enter your postal code</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutForm;
