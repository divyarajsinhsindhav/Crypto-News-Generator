const mongoose = require('mongoose');

const dataStoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    crypto: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const DataStore = mongoose.model('DataStore', dataStoreSchema);

module.exports = DataStore;
