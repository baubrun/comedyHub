import React from "react";
import { useSelector } from "react-redux";
import PrintIcon from "@mui/icons-material/Print";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TitleBar from "../../shared/TitleBar/TitleBar";
import { EVENTS_PAGE } from "../../shared/constants/navigation";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const Receipt = () => {
  const history = useHistory();
  const { receipt } = useSelector((s) => s.cart);

  const handlePrint = () => {
    window.print();
  };

  if (receipt?.total < 1) {
    history.replace(EVENTS_PAGE.path);
  }

  return (
    <>
      <TitleBar text="receipt" />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item my={2}>
          <IconButton onClick={() => handlePrint()}>
            <PrintIcon sx={{ fontSize: 32, cursor: "pointer" }} />
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Performer</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipt?.items?.map((item, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{item?.title}</TableCell>
                  <TableCell>{item?.performer}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {item?.venue?.name}
                  </TableCell>
                  <TableCell>{item?.startDate}</TableCell>
                  <TableCell>{item?.startTime}</TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid item>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            order #:&nbsp; {receipt?.orderNumber}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Total Paid:&nbsp;${receipt?.total}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Receipt;
