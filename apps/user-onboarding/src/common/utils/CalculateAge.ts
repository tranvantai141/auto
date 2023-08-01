export function calculateAge(birthDate: any) {
  // Split the date string into day, month, and year
  const [day, month, year] = birthDate.split('/');

  // Create a new Date object with the year, month (0-indexed), and day
  const birthDateObj = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDateObj.getFullYear();

  if (
    today.getMonth() < birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() &&
      today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  return age;
}
