import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import {previous, today, next} from "../utils/date-time";
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
    listReservations({date}, abortController.signal)
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
  const handleDateChange = (event) => {
    event.preventDefault();
    const action = event.target.id;

    if (action.toString() === "previous"){
      console.log("previous works")
      const newDate = previous(date)
    }
    else if (action.toString() === "today"){
      date = today();
      loadDashboard();
      console.log("today works")
    }
    else if (action.toString() === "next"){
      console.log("next works")
      date = next(date);
      loadDashboard();
    } else {
      console.log("none")
    }
  }
   */}
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
      <div className="container p-3 mb-2 bg-secondary text-white">
        <div className="row justify-content-center">
          <div className="col-6 border border-primary p-3 mb-2 bg-dark text-white">
            <h1 className="m-3 pl-3">Reservations Dashboard</h1>
          </div>
        </div>
       
        <div className="row justify-content-center">
          <div className="col-1.5">
            <button id="previous" type="previous"  class="btn btn-primary btn-sm m-2">Previous</button>
          </div>
          <div className="col-1.5">
            <button id="today" type="today"  class="btn btn-primary btn-sm m-2">Today</button>
          </div>
          <div className="col-1.5">
            <button id="next" type="next"  class="btn btn-primary btn-sm m-2">Next</button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2.5">
            <h4 className="m-3">{date}</h4>
          </div>
          </div>
        <div className="row justify-content-center">
          <div className="col-3">
            <input type="date" className="form-control" name="reservation_date" id="reservation_date" placeholder="Date of Reservation"/>
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
