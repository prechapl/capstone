import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header, ListItem, Badge, Button } from 'react-native-elements';
import { connect } from 'react-redux';

const myEvents = [
    {
        title: 'Dog Vet Appointment',
        description: 'Dog needs updates on rabies & bordatella vaccines',
        status: 'upcoming',
        category: 'appointment',
        deadline: new Date('2019-12-17T03:24:00'),
    }, {
        title: 'Vacuum',
        description: 'Must vaccuum floors AND couches',
        status: 'upcoming',
        category: 'chore',
        deadline: new Date('2019-09-17T03:24:00')
    }
]

const assignedEvents = [
    {
        title: "Timmy's choir recital",
        status: 'upcoming',
        category: 'event',
        deadline: new Date('2019-07-09T16:30:00')
    },
    {
        title: 'Walk the Dog',
        description: 'Dog must have a minimum of thirty minutes exercise!',
        status: 'upcoming',
        category: 'chore',
        deadline: new Date('2019-06-15T17:00:00')
    }
]

class Events extends Component {
    constructor() {
        super();
        this.state = {
            selection: 'MY EVENTS'
        };
    }
    componentDidMount() {
        //must fetch events
    }
    render() {
        let events;
        this.state.selection === 'MY EVENTS' ? events = myEvents : events = assignedEvents;
        const colorMap = {
            chore: '#AA8EB7',
            event: '#9BB8D5',
            appointment: '#BCD59B',
            errand: '#D79963'
        }
        return (
            <View>
                <Header
                    leftComponent={<Button type='clear' title='MY EVENTS' titleStyle={{ color: 'white' }} onPress={() => this.setState({ selection: 'MY EVENTS' })} />}
                    centerComponent={<Button type='clear' title='ASSIGNED' titleStyle={{ color: 'white' }} onPress={() => this.setState({ selection: 'ASSIGNED' })} />}
                    rightComponent={<Button type='clear' title='ADD' titleStyle={{ color: 'white' }} onPress={this.props.navigation.navigate('AddEvent')} />}
                />
                {events.map((event, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                this.props.navigation.navigate('Event', event = { event })
                            }} >
                            <ListItem
                                key={i}
                                title={event.title}
                                subtitle={`${event.deadline.getMonth()}/${event.deadline.getDate()}`}
                                badge={{ value: event.category, badgeStyle: { backgroundColor: colorMap[event.category] } }}
                            />
                        </TouchableOpacity>
                    )
                })}



            </View>
        )
    }
}

export default Events;
