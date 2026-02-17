

exports.validatePlate = (plate) => {
    const plateRegex = /^[A-Z]{3}\d{3}$/;
    return plateRegex.test(plate);
};