import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationsView from "./DashboardReservationsView"
import DashboardTablesView from "./DashboardTablesView"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations('', abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
        
    return () => abortController.abort();
  }

  const displayReservations = reservations.map((reservation) => DashboardReservationsView({...reservation}))
  const displayTables = tables.map((table) => DashboardTablesView({...table}))

{/*
  <div className="d-md-flex mb-12">
        
      

 </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <div class="container-fluid">
      {displayTables}
      </div>
*/}

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <h1 className="m-5 pl-3">Dashboard</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <h4 className="m-3 pl-5">Reservations for {date}</h4>
          </div>
          </div>
        <div className="row justify-content-center">
          <div className="col-1.5">
            <button type="button" class="btn btn-primary btn-sm m-2">Previous</button>
          </div>
          <div className="col-1.5">
            <button type="button" class="btn btn-primary btn-sm m-2">Today</button>
          </div>
          <div className="col-1.5">
            <button type="button" class="btn btn-primary btn-sm m-2">Next</button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">
            <input type="date" className="form-control m-2" name="reservation_date" id="reservation_date" placeholder="Date of Reservation"/>
          </div>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
      <table class="table caption-top">
  <caption>Reservations</caption>
  <thead>
    <tr>
      <th scope="col">ID #</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Seat?</th>
    </tr>
  </thead>
  <tbody>
    {displayReservations}
  </tbody>
</table>
     </div>
    </main>
  );
}

export default Dashboard;
