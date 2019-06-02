import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

class SingleEvent extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const event = this.props.navigation.getParam('event')
        return (
            <Card
                title={event.title}
                subtitle={event.category}
            >
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
