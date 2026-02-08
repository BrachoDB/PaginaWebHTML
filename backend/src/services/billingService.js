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

    // Safety check for negative duration
    if (durationMinutes < 0) {
        return {
            durationMinutes: 0,
            tariffApplied: tariff.billingType,
            subtotal: 0,
            discount: 0,
            total: 0
        };
    }

    // 1. Calculate Subtotal
    let subtotal = 0;
    const cost = parseFloat(tariff.cost);

    switch (tariff.billingType) {
        case 'PER_MINUTE':
            subtotal = durationMinutes * cost;
            break;
        case 'PER_HOUR':
            subtotal = Math.ceil(durationMinutes / 60) * cost;
            break;
        case 'PER_DAY':
            subtotal = Math.ceil(durationMinutes / (60 * 24)) * cost;
            break;
        case 'FRACTION':
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
            tariffApplied: tariff.billingType,
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
        tariffApplied: tariff.billingType,
        subtotal: parseFloat(subtotal.toFixed(2)),
        discount: parseFloat(discountAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
};
