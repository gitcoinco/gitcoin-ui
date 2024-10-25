export enum DateFormat {
  Default = "default",
}

export const formatDate = (date: Date, format: DateFormat): string => {
  switch (format) {
    case DateFormat.Default:
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
    default:
      return date.toISOString(); // Default format
  }
};
