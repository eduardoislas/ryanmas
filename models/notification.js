const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let notificationSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    expiration_date: {
        type: Date,
        required: [true, 'La fecha de vigencia es requerida']
    },
    high_priority: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Catalog',
        required: true
    },
    area: [{
        type: Schema.Types.ObjectId,
        ref: 'Catalog',
        required: true
    }],
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});





module.exports = mongoose.model('Notification', notificationSchema)