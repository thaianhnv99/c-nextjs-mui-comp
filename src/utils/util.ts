export const DATE_FORMAT_SLASH = "yyyy-MM-dd";

export const formatDate = (
  date: number | Date,
  format: string,
  fallback?: string
) => {
  if (!date) return fallback ?? "";
  if (!format) format = DATE_FORMAT_SLASH;
  const newDate = typeof date === "number" ? new Date(date) : date;

  const year = newDate.getFullYear();

  if (year === 1 || year === 1970) return fallback ?? "";
  const day = `0${newDate.getDate()}`.slice(-2);
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const hours = `0${newDate.getHours()}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);
  const seconds = `0${newDate.getSeconds()}`.slice(-2);
  const milliseconds = `${newDate.getMilliseconds()}`.slice(-2);
  let dateFormat = format.replace("yyyy", year.toString());
  dateFormat = dateFormat.replace("MM", month);
  dateFormat = dateFormat.replace("dd", day);
  dateFormat = dateFormat.replace("HH", hours);
  dateFormat = dateFormat.replace("mm", minutes);
  dateFormat = dateFormat.replace("ss", seconds);
  dateFormat = dateFormat.replace("ms", milliseconds);
  return dateFormat;
};

export const sleep = async (ms: number): Promise<void> => {
  console.log("Kindly remember to remove `sleep`");
  return new Promise((resolve, result) => setTimeout(resolve, ms));
};
