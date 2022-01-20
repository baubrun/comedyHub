import { lazy } from "react";

export const HOME_PAGE = {
  path: "/",
  render: lazy(() => import("../../pages/Home/Home")),
};

export const EVENTS_PAGE = {
  path: "/events",
  render: lazy(() => import("../../pages/Events/Events")),
};
export const CART_PAGE = {
  path: "/cart",
  render: lazy(() => import("../../pages/Cart/Cart")),
};

export const PAGES = [HOME_PAGE, EVENTS_PAGE, CART_PAGE];
