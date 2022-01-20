import { lazy } from "react";

export const HOME_PAGE = {
  path: "/",
  render: lazy(() => import("../../pages/Home/Home")),
};

export const PAGES = [HOME_PAGE];
