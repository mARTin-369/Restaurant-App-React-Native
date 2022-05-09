export function formatTime(time) {
  const timeFormat = {};
  const dayShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayFull = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  timeFormat.day = dayFull[time.day];
  timeFormat.start = convertTime(time.start);
  timeFormat.end = convertTime(time.end);

  return timeFormat;
}

export function convertTime(time) {
  let formatTime;
  let hour = parseInt(time.slice(0, 2));
  let minute = time.slice(2, 4);

  if (hour < 12) {
    formatTime = `${hour}:${minute}am`;
  } else {
    hour = (hour % 12) + 1;
    formatTime = `${hour}:${minute}pm`;
  }

  return formatTime;
}
