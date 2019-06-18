import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Calendar } from 'react-native-calendars';
import Arrow from 'react-native-arrow';

const EventList = props => {
  const events = props.eventlist;
  const id = props.id;

  const eventsWithDeadlines = events.filter(evt => evt.deadline);

  const datesObj = eventsWithDeadlines.reduce((acc, event) => {
    const date = event.deadline.slice(0, 10);
    if (event.ownerId === id) {
      acc[date] = { marked: true, dotColor: 'green' };
    } else {
      acc[date] = { marked: true };
    }
    return acc;
  }, {});

  return (
    <View>
      <Calendar
        onDayPress={day => {
          const evt = eventsWithDeadlines.find(event =>
            event.deadline.includes(day.dateString)
          );
          if (evt) {
            props.navigation.navigate('Event', {
              event: evt
            });
          }
        }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={true}
        showWeekNumbers={true}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={datesObj}
      />
    </View>
  );
};

export default withNavigation(EventList);
