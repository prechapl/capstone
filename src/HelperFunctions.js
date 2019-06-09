export const findChoiceText = (id, arr) => {
  const choice = arr.find(item => item.id === id);
  if (choice) {
    return choice.text;
  }
};

export const findMoodColor = value => {
  const colors = {
    0.0: '#FF2A00',
    0.25: '#E68200',
    0.5: '#d4b21f',
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
