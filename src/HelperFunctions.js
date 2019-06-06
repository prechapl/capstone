export const findChoiceText = (id, arr) => {
  const choice = arr.find(item => item.id === id);
  return choice.text;
};

export const findMoodColor = value => {
  const colors = {
    0.0: "#FF2A00",
    0.25: "#E68200",
    0.5: "#FAD400",
    0.75: "#80E600",
    1.0: "#00FF53"
  };
  return colors[value];
};

export const findMoodText = value => {
  const feelings = {
    0.0: "horrible",
    0.25: "bad",
    0.5: "neutral",
    0.75: "good",
    1.0: "excellent"
  };
  return feelings[value];
};
