/**
 * Formatea los minutos totales a un string de horas y minutos (ej: 1h 15min).
 * @param {number} totalMinutes - El total de minutos.
 * @returns {string} El texto formateado.
 */
function formatDuration(totalMinutes) {
    if (isNaN(totalMinutes) || totalMinutes < 0) {
        return '0min';
    }
    if (totalMinutes < 60) {
        return `${totalMinutes}min`;
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${minutes}min`;
}
export { formatDuration };