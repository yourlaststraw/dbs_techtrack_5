import mongoose from 'mongoose'

const outstandingRequestSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyAccount'
    },
    requestorCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companyAccount'
    },
    carbonUnitPrice: {
        type: Number,
        default: 0
    },
    carbonQuantity: {
        type: Number,
        default: 0
    },

    requestReason: {
        type: String
    },

    requestStatus: {
        type: String
    },

    requestType: {
        type: String
    },

    createdDatetime: {
        type: Date,
        default: Date.now
    },

    updatedDatetime: {
        type: Date,
        default: Date.now
    }
});

const outstandingRequest = mongoose.model('outstandingRequest', outstandingRequestSchema)

export default outstandingRequest;