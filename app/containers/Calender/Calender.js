import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { MDBCard, MDBCardBody } from 'mdbreact';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)


class CalendarPage extends React.Component {


  createEventsObj = (items) => {
    let events = [];
    items.map(item => {
      if(item.due_date) {
        events.push(
          {
            start: item.due_date,
            end: item.due_date,
            // end: new Date(moment().add(1, 'days')),
            title: item.name
          }
        )

      }
    })
    // console.log(events)
    return events
  }

  render() {

    return (
      <MDBCard style={{ marginBottom: '5rem' }}>
        <MDBCardBody>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView='month'
            events={this.props.events? this.createEventsObj(this.props.events): []}
            style={{ height: '100vh' }}
          />
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default CalendarPage;
