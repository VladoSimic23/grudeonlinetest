import { format } from "date-fns";
import { hr } from "date-fns/locale"; // Import the Croatian locale

export const formatDateToCroatian = (dateTimeString: any) => {
  const date = new Date(dateTimeString);
  return format(date, "d. MMMM yyyy", { locale: hr });
};
