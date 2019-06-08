import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    goUpdateAssigned,
} from './store/events';

const SingleEventAssigned = (props) => {
    const event = props.assignedEvents.find(ev => ev.id === props.navigation.getParam('event').id);
    const deadline = new Date(event.deadline);
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
            <TouchableOpacity
                onPress={() => props.completeAssignedTask(event.id, { status: 'completed-pending' })}
                style={styles.button}>
                <Text>complete</Text>
            </TouchableOpacity>
        </Card>
    )
}

const mapStateToProps = ({ assignedEvents }) => {
    return {
        assignedEvents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeAssignedTask: (id, updates) => dispatch(goUpdateAssigned(id, updates))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    buttonSmall: {
        backgroundColor: "#448AE6",
        padding: 10,
        width: 100,
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventAssigned);

