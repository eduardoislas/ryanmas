const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dailyRecordSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'La fecha de Asistencia es requerida']
    },
    exitHour: {
        type: Date,
        required: false
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'El paciente es requerido']
    },
    vitalSigns: [{
        vitalSign: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: [true, 'La fecha de lectura es requerida']
        },
        value: {
            type: Number,
            required: true
        },
        valueB: {
            type: Number,
            required: false
        }
    }],
    technicalSupport: [{
        name: {
            type: String,
            required: false
        }
    }],
    attitude: [{
        name: {
            type: String,
            required: false
        },
        hour: {
            type: Date,
            required: false
        },
        performance: {
            type: Number,
            required: false
        }
    }],
    behavior: [{
        name: {
            type: String,
            required: false
        },
        hour: {
            type: Date,
            required: false
        },
        performance: {
            type: Number,
            required: false
        }
    }],
    crisis: [{
        name: {
            type: String,
            required: false
        },
        hour: {
            type: Date,
            required: false
        },
        observation: {
            type: String,
            required: false
        }
    }],
    hygiene: [{
        name: {
            type: String,
            required: false
        },
        hour: {
            type: Date,
            required: false
        },
        reason: {
            type: String,
            required: false
        }
    }],
});


module.exports = mongoose.model('DailyRecord', dailyRecordSchema)