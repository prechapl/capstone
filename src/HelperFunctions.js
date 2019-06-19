export const findChoiceText = (id, arr) => {
  const choice = arr.find(item => item.id === id);
  if (choice) {
    return choice.text;
  }
};

export const findMoodColor = value => {
  const colors = {
    0.0: '#FF2A00',
    0.25: '#ff9900',
    0.5: '#e3d025',
    0.75: '#64c300',
    1.0: '#009510'
  };
  return colors[value];
};

export const findMoodText = value => {
  const feelings = {
    0.0: 'horrible',
    0.25: 'bad',
    0.5: 'neutral',
    0.75: 'good',
    1.0: 'excellent'
  };
  return feelings[value];
};

export const findStatus = value => {
  const statusValues = {
    0.0: { color: '#FF2A00', text: 'horrible' },
    0.25: { color: '#E68200', text: 'bad' },
    0.5: { color: '#d4b21f', text: 'neutral' },
    0.75: { color: '#64c300', text: 'good' },
    1.0: { color: '#009510', text: 'excellent' }
  };
  return statusValues[value];
};
