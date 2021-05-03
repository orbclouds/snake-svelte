const randomInt = (
  min: number,
  max: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min
  );
};

const generateFoodPosition = (): number => {
  return randomInt(0, 19) * 100;
};

export default generateFoodPosition;
