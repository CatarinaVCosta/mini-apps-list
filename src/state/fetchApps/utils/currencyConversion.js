export const numberFormat = value =>
    new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);

export const applyPrecision = value => {
    const precision = 2;
    return value/(Math.pow(10, precision)).toFixed(precision);
}
