export const COMPONENT_CATEGORIES = [
  "Processor",
  "RAM",
  "Storage",
  "Graphics Card",
  "Display",
  "Battery",
  "Keyboard",
  "Operating System"
];

export const calculateTotal = (items = []) =>
  items.reduce(
    (sum, item) =>
      sum + Number(item?.price || 0),
    0
  );