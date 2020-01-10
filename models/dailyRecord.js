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
    exit: {
        type: Boolean,
        default: false
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
        time: {
            type: String,
            required: false
        },
        score: {
            type: Number,
            required: false
        }
    }],
    behavior: [{
        name: {
            type: String,
            required: false
        },
        time: {
            type: String,
            required: false
        },
        score: {
            type: Number,
            required: false
        }
    }],
    crisis: [{
        name: {
            type: String,
            required: false
        },
        time: {
            type: String,
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
        time: {
            type: String,
            required: false
        },
        observation: {
            type: String,
            required: false
        }
    }],
    meal: [{
        type: {
            type: String,
            required: false
        },
        performance: {
            type: Number,
            required: false
        },
        quantity: {
            type: String,
            required: false
        },
        foodType: {
            type: String,
            required: false
        },
        independence: {
            type: Number,
            required: false
        },
        functional: {
            type: Number,
            required: false
        },
        chewingPerformance: {
            type: Number,
            required: false
        }
    }]
});


module.exports = mongoose.model('DailyRecord', dailyRecordSchema)