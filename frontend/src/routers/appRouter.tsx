import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Loadable } from "../components";
import history from "./history";
import Header from "../layout/header/Main";
const Booking = Loadable(lazy(() => import("../pages/booking/Main")));
const MyFlights = Loadable(lazy(() => import("../pages/myFlights/Main")));
const Profile = Loadable(lazy(() => import("../pages/profile/Main")));
const AppRouter: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route
            path="/"
            element={
              <Header>
                <Outlet />
              </Header>
            }
          >
            <Route path="" element={<Booking />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-flights" element={<MyFlights />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
