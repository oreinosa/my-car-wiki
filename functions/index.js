const api = require('./src/app');
const { updateTypes } = require('./src/callables/types.callable');
const { updateMakes } = require('./src/callables/makes.callable');
const { updateYears } = require('./src/callables/years.callable');

module.exports = {
  api,
  updateTypes,
  updateMakes,
  updateYears
};