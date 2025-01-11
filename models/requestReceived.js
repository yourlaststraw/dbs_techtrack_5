const mongoose = require('mongoose')

const requestReceivedSchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outstandingRequest'
    },

    alertDatetime: {
        type: Date,
        default: Date.now
    },

    alertText: {
        type: String,
    },

    alertStatus: {
        type: String
    },

    alertViewDate: {
        type: Date,
        default: null
    },

    createdDatetime: {
        type: Date,
        default: Date.now
    },

    updatedDatetime: {
        type:Date,
        default:Date.now
    }
});

const requestReceived = mongoose.model('requestReceived', requestReceivedSchema)

module.exports = requestReceived;