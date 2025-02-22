export const getFormattedTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const time = `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`

  return { mins, secs, time };
};
