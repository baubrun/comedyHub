import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Spinner from "../../shared/components/Spinner/Spinner";
import Toaster from "../../shared/components/Toaster/Toaster";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Layout = (props) => {
  const { toasterVisible, toasterMessage, toasterStatus, isLoading } =
    useSelector((s) => s.layout);

  return (
    <>
      <Header />
      <Offset />
      <Box id="main">{props.children}</Box>
      <Toaster
        show={toasterVisible}
        message={toasterMessage}
        status={toasterStatus}
      />
      <Spinner show={isLoading} />
    </>
  );
};

export default Layout;
