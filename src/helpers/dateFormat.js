import { parse, format, isValid } from "date-fns";

const DATE_FORMAT = "hh.mm dd.MM.yyyy";

export const parseDate = (date: string) => {
  const parsed = parse(new Date(date).toISOString(), DATE_FORMAT, Date.now());
  if (!isValid(parsed)) {
    return null;
  }
  return parsed;
};

export const formatDate = (date: Date) => {
  return format(date, DATE_FORMAT);
};
export const formatDateStr = date => {
  return format(new Date(date), DATE_FORMAT);
};
