export const formatDateDDMMYYYY = (dateStr: string | Date | undefined) => {
  if (!dateStr) return "";
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы от 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};