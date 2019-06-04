export const findChoiceText = (id, arr) => {
  const choice = arr.find(item => item.id === id);
  return choice.text;
};
