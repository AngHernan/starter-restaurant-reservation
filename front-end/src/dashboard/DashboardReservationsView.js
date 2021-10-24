import React from "react";
import { useRouteMatch } from "react-router";


export default function DashboardReservationsView({reservations}){
  const { path } = useRouteMatch();
   const displayReservations = reservations.map(({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, status}) => {
    
        return (
            <tr>
                <th scope="row">{reservation_id}</th>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_date}</td>
                <td>{reservation_time}</td>
                <td>{status}</td>
                <td>{status ===
                "seated" ? null : (
                <>
                  <a
                    href={`/reservations/${reservation_id}/seat`}
                    className="btn btn-outline-primary"
                  >
                    Seat
                  </a>
                  </>)}</td>

            </tr>)
})


        return (<>
            <table className="table caption-top">
  <caption>Reservations</caption>
  <thead>
    <tr>
      <th scope="col">ID #</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {displayReservations}
  </tbody>
</table>
       </> )
    }