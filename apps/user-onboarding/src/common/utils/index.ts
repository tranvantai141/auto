export const checkIsOutOfOfficeHours=():boolean=> {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // Check if it's a weekend
  if (currentDay === 0 || currentDay === 6) {
    return true;
  }
  // Check if it's before 7:30am or after 6:00pm
  if (currentHour < 7 || (currentHour === 7 && currentMinute < 30) || currentHour >= 18) {
    return true;
  }
  // Otherwise, it's within business hours
  return false;
}

export const forceMockCardReaderStep = ():boolean=>{
 return __DEV__ ? true : false
}