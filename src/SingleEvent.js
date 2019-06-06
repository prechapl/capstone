import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    goUpdateAssigned,
    goDeleteEvent,
    fetchAssignees
} from './store/events';


class SingleEvent extends Component {
    constructor() {
        super();
        this.state = {}
    }
    delete = (id) => {
        this.props.deleteEvent(id);
        this.props.navigation.navigate('Events');
    }
    render() {
        const event = this.props.navigation.getParam('event');
        const deadline = new Date(event.deadline);
        const type = this.props.navigation.getParam('type');
        const badgeStatusMap = {
            upcoming: 'primary',
            completed: 'success',
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
                containerStyle={{ borderColor: colorMap[event.category], flex: 1, justifyContent: 'space-between' }}
            >
                <Badge
                    value={event.status}
                    status={badgeStatusMap[event.status]}
                />
                <Text>
                    DATE: {deadline.getMonth()}/{deadline.getDate()}/{deadline.getFullYear()}
                </Text>
                <Text>
                    TIME: {deadline.getHours()}:{('0' + deadline.getMinutes()).slice(-2)}
                </Text>
                <Text>
                    {event.description}
                </Text>

                {this.props.assignees.length ? (
                    <Text>Assigned to: {this.props.assignees.join(', ')}</Text>) :
                    (<Text> Not yet assigned</Text>)}

                {type === 'ASSIGNED' ? (<TouchableOpacity
                    onPress={() => this.props.completeAssignedTask(event.id, { status: 'completed-pending' })}
                    style={styles.button}>
                    <Text>complete</Text>
                </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            onPress={() => this.delete(event.id)}
                            style={styles.button}>
                            <Text>delete</Text>
                        </TouchableOpacity>
                    )}
            </Card>
        )
    }
}

const mapStateToProps = ({ assignees }) => {
    return {
        assignees
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeAssignedTask: (id, updates) => dispatch(goUpdateAssigned(id, updates)),
        deleteEvent: (id) => dispatch(goDeleteEvent(id)),
        fetchAssignees: (id) => dispatch(fetchAssignees(id))
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: "#D3D3D4",
        marginBottom: 20,
        width: 300,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: "#448AE6",
        padding: 10,
        width: 300,
        margin: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF"
    },
    header: {
        padding: 10,
        marginBottom: 30,
        fontSize: 35
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent);
