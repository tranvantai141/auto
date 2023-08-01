import moment from 'moment';

export function fuzzyDateParser(raw: string | number): Date | null {
  // parse raw is number (timestamp)
  if (typeof raw === 'number') {
    return new Date(raw);
  }

  // parse raw is string
  // accept format: dd/mm/yyyy, dd/mm/yyyy hh:mm:ss, MMM dd, yyyy
  const acceptedFormats = [
    'yyyy/mm/dd',
    'YYYY/MM/DD',
    'YYYY/MM/DD HH:mm:ss',
    'DD/MM/YYYY HH:mm:ss',
    'MMM DD, yyyy',
    'MMM D, yyyy',
    'DD/MM/yyyy',
    'dd/mm/yyyy',
    'dd/mm/yyyy hh:mm:ss',
  ];
  const date = moment(raw, acceptedFormats, true);
  if (date.isValid()) {
    return date.toDate();
  }
  return null;
}

export function formatFuzzyDate(raw: string | number, targetFormat: string): string {
  const date = fuzzyDateParser(raw);
  if (date) {
    return moment(date).format(targetFormat);
  }
  return '';
}
