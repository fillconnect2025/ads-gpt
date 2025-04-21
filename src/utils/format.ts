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

export function formatDateBr(dateString: string | Date): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return 'Data inválida';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mês começa em 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const getStatusBadge = (status: number) => {
  const statusMap: Record<number, string> = {
    1: 'Ativa',
    2: 'Pendente',
    3: 'Desativada',
    // adicione outros status se precisar
  };

  return statusMap[status] || 'Desconhecido';
};
