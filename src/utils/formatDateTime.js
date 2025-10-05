export const formatHour = (time) => {
  return new Date(0, 0, 0, time)
    .toLocaleTimeString(navigator.language, {
      hour: "numeric",
      hour12: true,
    })
    .replace(" ", ""); // Remove space before AM/PM
};
