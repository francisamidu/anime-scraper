const daysInMonth = (year: number, month: number) => {
  const isLeap = !(year % 4) && (year % 100 || !(year % 400));

  if (month == 2) return isLeap ? 29 : 28;
  return 30 + (month % 2);
};
export default daysInMonth;
