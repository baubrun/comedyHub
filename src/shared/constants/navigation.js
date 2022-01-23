import { lazy } from "react";

export const HOME_PAGE = {
  path: "/",
  render: lazy(() => import("../../pages/Home/Home")),
};

export const EVENT_PAGE = {
  path: "/events/:id",
  render: lazy(() => import("../../pages/Events/EventDetail")),
};

export const EVENTS_PAGE = {
  path: "/events",
  render: lazy(() => import("../../pages/Events/Events")),
};

export const CART_PAGE = {
  path: "/cart",
  render: lazy(() => import("../../pages/Cart/Cart")),
};

export const CHECKOUT_PAGE = {
  path: "/Checkout",
  render: lazy(() => import("../../pages/Checkout/Checkout")),
};

export const RECEIPT_PAGE = {
  path: "/receipt",
  render: lazy(() => import("../../pages/Receipt/Receipt")),
};

export const PAGES = [
  EVENT_PAGE,
  HOME_PAGE,
  EVENTS_PAGE,
  CART_PAGE,
  CHECKOUT_PAGE,
  RECEIPT_PAGE,
];
