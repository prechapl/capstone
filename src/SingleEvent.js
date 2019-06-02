import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';

class SingleEvent extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const event = this.props.navigation.getParam('event');
        const badgeStatusMap = {
            upcoming: 'primary',
            'completed-approved': 'success',
            'completed-pending': 'warning',
            overdue: 'warning',
            missed: 'error'
        };
        const colorMap = {
            chore: '#AA8EB7',
            event: '#9BB8D5',
            appointment: '#BCD59B',
            errand: '#D79963'
        };
        return (
            <Card
                title={event.title}
                subtitle={event.category}
                containerStyle={{ borderColor: colorMap[event.category], flex: 1 }}
            >
                <Badge
                    value={event.status}
                    status={badgeStatusMap[event.status]}
                />
                <Text>
                    DATE: {event.deadline.toDateString()}

                </Text>
                <Text>
                    TIME: {event.deadline.toTimeString()}
                </Text>
                <Text>
                    {event.description}
                </Text>

            </Card>
        )
    }
}

export default SingleEvent;
