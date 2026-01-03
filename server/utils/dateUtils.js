// server/utils/dateUtils.js

// Convertit une date ISO ou string en date au format 'YYYY-MM-DD'
export const parseDate = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0];
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Date invalide');
    }
    return date.toISOString().split('T')[0];
  };
  
  // Retourne le début et la fin d'une journée en UTC
  export const getDayRange = (dateString) => {
    const dateStr = parseDate(dateString);
    const start = `${dateStr}T00:00:00Z`;
    const end = `${dateStr}T23:59:59Z`;
    return { start, end };
  };