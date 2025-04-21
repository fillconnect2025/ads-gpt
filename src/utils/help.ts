export const isDateInThePast = (date: string | Date): boolean => {
  const currentDate = new Date(); 
  const targetDate = new Date(date);
  
  return targetDate < currentDate; 
};
