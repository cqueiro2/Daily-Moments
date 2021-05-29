export function formateDate(isoString: string) {
    return new Date(isoString).toLocaleDateString('pt-BR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }