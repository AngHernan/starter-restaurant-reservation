import React, { Fragment } from "react";

import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import CreateReservation from "./CreateReservations";
import SeatReservation from "./SeatReservation";
import UpdateReservation from "./UpdateReservation"

export default function ReservationRoutes() {
    return (
    <Fragment>   
      <Switch>
        <Route exact={true} path={`/reservations/new`}>
            <CreateReservation />
        </Route>
        <Route exact={true} path={`/reservations/:reservation_id/seat`}>
            <SeatReservation />
        </Route>
        <Route exact={true} path={`/reservations/:reservation_id/status`}>
            <UpdateReservation />
        </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
    </Fragment> 
  );
}