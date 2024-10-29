export enum DateFormat {
  FullDate12Hour = "FullDate12Hour",
  FullDate24Hour = "FullDate24Hour",
}

export const formatDate = (date: Date, format?: DateFormat): string => {
  switch (format) {
    case DateFormat.FullDate24Hour:
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      } as Intl.DateTimeFormatOptions;
      const formattedDate = date.toLocaleString("en-GB", options);
      return formattedDate.replace(/ at /, " ").trim();
    case DateFormat.FullDate12Hour:
      const defaultOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      } as Intl.DateTimeFormatOptions;
      const isAM = date.getHours() < 12;
      const defaultFormattedDate = date.toLocaleString("en-GB", defaultOptions);
      return defaultFormattedDate
        .replace(/ at /, " ")
        .trim()
        .replace(/am|pm/, isAM ? "AM" : "PM");
    default:
      return date.toLocaleDateString("en-GB");
  }
};