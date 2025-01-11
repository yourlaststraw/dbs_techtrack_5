const mongoose = require('mongoose')

const companyAccountSchema = new mongoose.Schema({
    companyId: {
        type: Number,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    carbonBalance: {
        type: Number,
        default: 0,
    },

    cashBalance: {
        type: Number,
        default: 0,
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

const CompanyAccount = mongoose.model('companyAccount', companyAccountSchema)

module.exports = CompanyAccount;