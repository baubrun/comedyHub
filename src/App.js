import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/Spinner/Spinner";
import { PAGES } from "./shared/constants/navigation";
import { showToaster } from "./redux/layoutSlice";
import { STATUS_ERROR } from "./shared/constants/status";
import { getVenues } from "./redux/venuesSlice";

const App = () => {
  const dispatch = useDispatch();

  const fetchVenues = () => {
    try {
      dispatch(getVenues());
    } catch (err) {
      dispatch(
        showToaster({
          message: err?.response ? err?.response.data : err?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const routes = (
    <Suspense fallback={<Spinner show />}>
      <Switch>
        {PAGES.map((page) => (
          <Route
            key={page.path}
            exact
            path={page.path}
            render={(p) => <page.render {...p} />}
          />
        ))}

        <Redirect to="/" />
      </Switch>
    </Suspense>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
