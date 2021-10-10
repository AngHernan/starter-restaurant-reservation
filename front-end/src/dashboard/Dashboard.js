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

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div class="container-fluid">
      {displayReservations}
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <div class="container-fluid">
      {displayTables}
      </div>
    </main>
  );
}

export default Dashboard;
