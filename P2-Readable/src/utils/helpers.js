export const capitalize = str =>
  (!str || typeof str !== 'string')
    ? ''
    : str[0].toUpperCase() + str.slice(1)