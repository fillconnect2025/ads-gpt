export const formatPhone = (value) => {
  if (!value) return '';

  let cleaned = value.replace(/\D/g, '');

  if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

  if (cleaned.length >= 7) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
  } else if (cleaned.length >= 3) {
    return cleaned.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  } else {
    return cleaned;
  }
};
