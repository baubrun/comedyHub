import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { toggleAmount, getTotal } from "../../redux/cartSlice";
import TotalRow from "./TotalRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = ["event", "performer", "venue", "qty", "price", "actions"];

const HeaderColumns = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  });

  return (
    <>
      {columns?.map((c, idx) => (
        <StyledTableCell
          align="center"
          key={idx}
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          {c}
        </StyledTableCell>
      ))}
    </>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.cart);

  return (
    <>
      <TotalRow />

      <Grid container justifyContent="center">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <HeaderColumns />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Typography variant="h6">{item?.title}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="h6">{item?.performer}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {item?.venue?.name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="h6">{item?.quantity}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="h6">{item?.price}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Tooltip title="Add">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              dispatch(
                                toggleAmount({
                                  toggle: "inc",
                                  _id: item._id,
                                })
                              );
                            }}
                          >
                            <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                          </IconButton>
                        </Tooltip>
                      </Grid>

                      <Grid item>
                        <Tooltip title="Remove">
                          <IconButton
                            color="secondary"
                            onClick={() => {
                              dispatch(
                                toggleAmount({
                                  toggle: "dec",
                                  _id: item._id,
                                })
                              );
                            }}
                          >
                            <RemoveCircleOutlineIcon sx={{ fontSize: 32 }} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default Cart;
