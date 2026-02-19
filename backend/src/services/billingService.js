/**
 * Calculates the parking cost based on tariff, duration, and optional discounts.
 * 
 * @param {Date} entryTime - Vehicle entry time
 * @param {Date} exitTime - Vehicle exit time
 * @param {Object} tariff - Tariff model instance (billingType, cost)
 * @param {Object} options - Optional settings { discountType, discountValue, isCourtesy }
 * @returns {Object} { durationMinutes, tariffApplied, subtotal, discount, total }
 */
exports.calculateCost = (entryTime, exitTime, tariff, options = {}) => {
    const durationMs = new Date(exitTime) - new Date(entryTime);
    const durationMinutes = Math.ceil(durationMs / (1000 * 60)); // Total minutes rounded up

    // Detectar campos en español (DB) o inglés (Modelo) para compatibilidad
    const billingType = tariff.billingType || tariff.tipo_cobro;
    const cost = parseFloat(tariff.cost || tariff.valor);

    // Safety check for negative duration
    if (durationMinutes < 0) {
        return {
            durationMinutes: 0,
            tariffApplied: billingType,
            subtotal: 0,
            discount: 0,
            total: 0
        };
    }

    // 1. Calculate Subtotal
    let subtotal = 0;

    switch (billingType) {
        case 'PER_MINUTE':
        case 'MINUTO':
            subtotal = durationMinutes * cost;
            break;
        case 'PER_HOUR':
        case 'HORA':
            subtotal = Math.ceil(durationMinutes / 60) * cost;
            break;
        case 'PER_DAY':
        case 'DIA':
            subtotal = Math.ceil(durationMinutes / (60 * 24)) * cost;
            break;
        case 'FRACTION':
        case 'FRACCION':
            // Assuming fraction is 15 mins blocks as requested previously
            subtotal = Math.ceil(durationMinutes / 15) * cost;
            break;
        default:
            subtotal = durationMinutes * cost;
    }

    // 2. Apply Courtesy (Override)
    if (options.isCourtesy) {
        return {
            durationMinutes,
            tariffApplied: billingType,
            subtotal: parseFloat(subtotal.toFixed(2)),
            discount: parseFloat(subtotal.toFixed(2)), // Discount is full amount
            total: 0,
            isCourtesy: true
        };
    }

    // 3. Apply Discounts
    let discountAmount = 0;
    if (options.discountType === 'PERCENTAGE' && options.discountValue) {
        const percent = parseFloat(options.discountValue);
        discountAmount = (subtotal * percent) / 100;
    } else if (options.discountType === 'FIXED' && options.discountValue) {
        discountAmount = parseFloat(options.discountValue);
    }

    // Start with subtotal, subtract discount, ensure not below 0
    let total = subtotal - discountAmount;
    if (total < 0) total = 0;

    return {
        durationMinutes,
        tariffApplied: billingType,
        subtotal: parseFloat(subtotal.toFixed(2)),
        discount: parseFloat(discountAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
};
