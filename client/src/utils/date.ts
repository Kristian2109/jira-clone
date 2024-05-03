const dateFormatter = Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return dateFormatter.format(date).replace(/\//g, "-");
};
