import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';


const EventList = (props) => {
    const events = props.eventlist;
    const type = props.type;
    const colorMap = {
        chore: '#AA8EB7',
        event: '#9BB8D5',
        appointment: '#BCD59B',
        errand: '#D79963'
    };
    return (
        <ScrollView style={{ maxHeight: 300 }}>
            {events.map((event, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            if (type === 'MY EVENTS') {
                                props.navigation.navigate('Event', {
                                    event: event
                                });
                            } else {
                                props.navigation.navigate('EventAssigned', {
                                    event: event
                                });
                            }
                        }}
                    >
                        <ListItem
                            key={i}
                            title={event.title}
                            subtitle={`${new Date(
                                event.deadline
                            ).getMonth()}/${new Date(event.deadline).getDate()}`}
                            badge={{
                                value: event.category,
                                badgeStyle: { backgroundColor: colorMap[event.category] }
                            }}
                        />
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    )
}

export default withNavigation(EventList);
