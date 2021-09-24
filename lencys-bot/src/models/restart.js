const { Schema, model } = require('mongoose');

module.exports = model('restart', new Schema({ status: { type: Boolean } }));