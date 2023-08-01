//Remove all phonetic symbols
//Remove all spaces
//Remove all special characters
export function removePhoneticSymbolAndSpaces(fullName: string) {
  return (
    fullName
      .replace(/\s+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9 ]/g, '') || ''
  );
}
