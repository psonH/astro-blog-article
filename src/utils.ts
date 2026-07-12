export function formatDate(date?: string | Date | null): string {
  if (!date) return "";

  const d =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  if (Number.isNaN(d.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return d.toLocaleDateString(undefined, options);
}
