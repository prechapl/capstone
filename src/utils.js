generateButtons = user => {
  const buttonsChild = [
    {
      title: 'Events',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 68,
        backgroundColor: '#EF5029'
      }
    },
    {
      title: 'Family',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 66,
        backgroundColor: '#8EB51A'
      }
    },
    {
      title: 'Grades',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#E0BF00'
      }
    },
    {
      title: 'Gratitude',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#AD0978'
      }
    },
    {
      title: 'Goals',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#1500FA'
      }
    },
    {
      title: 'Location',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#3B3200'
      }
    },
    {
      title: 'Mood',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#FF9900'
      }
    },
    {
      title: 'Polls',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 53,
        backgroundColor: '#7DC6CD'
      }
    },
    {
      title: 'Sports',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#BA9E00'
      }
    },
    {
      title: 'Values',
      style: {
        paddingStart: 5,
        paddingTop: 0,
        paddingBottom: 1,
        marginBottom: 1,
        color: 'white',
        fontSize: 20,
        width: 62,
        backgroundColor: '#1463C7'
      }
    }
  ];

  return (
    <View>
      {buttonsChild.map((button, idx) => (
        <ActionButton.Item
          key={idx}
          onPress={() =>
            this.props.navigation.navigate(button.title, {
              user: user
            })
          }
        >
          <Text style={button.style}>Mood</Text>
        </ActionButton.Item>
      ))}
    </View>
  );
};
