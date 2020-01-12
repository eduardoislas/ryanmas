const express = require('express');
const _ = require('underscore');
const Patient = require('../models/patient');

const app = express();


//Obtener todos los pacientes activos
app.get('/patient', (req, res) => {
    //El parámetro status solicita los pacientes activos
    Patient.find({ status: true })
        .exec((err, patients) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }
            Patient.countDocuments({ status: true }, (err, conteo) => {
                res.json({
                    success: true,
                    count: conteo,
                    patients
                });
            })
        })
})

//Obtener todos los pacientes activos por fase
app.get('/patient/:fase', (req, res) => {
    let fase = req.params.fase;
    let regex = new RegExp(fase, 'i');
    //El parámetro status solicita los pacientes activos
    Patient.find({ status: true, phase: regex })
        .exec((err, patients) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }
            Patient.countDocuments({ status: true, phase: regex }, (err, conteo) => {
                res.json({
                    success: true,
                    count: conteo,
                    patients
                });
            })
        })
})

//Agregar un Paciente a la BD
app.post('/patient', (req, res) => {
    let body = req.body;
    let fecha = new Date();
    let ts = body.technicalSupport;
    let temp = [];
    Patient.countDocuments({}, (err, conteo) => {
        let patient = new Patient({
            name: body.name,
            lastName: body.lastName,
            lastNameSecond: body.lastNameSecond,
            birthdate: Date.parse(body.birthdate),
            registerdate: Date.parse(body.registerdate),
            phase: body.phase,
            img: body.img,
        });
        let ph = {
            phase: body.phase,
            date: fecha.setHours(fecha.getHours() - 7)
        };
        patient.phaseHistory = [ph];
        for (let x of ts) {
            let a = { name: x };
            temp.push(a);
        }
        patient.technicalSupport = temp;
        patient.diagnosis = body.diagnosis;
        patient.allergies = body.allergies;
        patient.medicines = body.medicines;
        patient.physicalLimitations = body.physicalLimitations;
        patient.expedient = conteo + 1;
        patient.save((err, patientDB) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }
            res.json({
                success: true,
                patient: patientDB
            });
        })
    });
});

//Editar un paciente, actualizando su historial de Fase
app.put('/patient/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let fecha = new Date();
    Patient.findById(id, (err, patientDB) => {
        if (err) {
            return res.status(500).json({
                success: false,
                err
            });
        }
        if (!patientDB) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'Paciente no encontrado'
                }
            });
        }
        let faseAnterior = patientDB.phase;
        patientDB.name = body.name;
        patientDB.lastName = body.lastName;
        patientDB.lastNameSecond = body.lastNameSecond;
        patientDB.birthdate = body.birthdate;
        patientDB.registerdate = body.registerdate;
        patientDB.img = body.img;
        patientDB.phase = body.phase;
        // Si hubo cambios de Fase, se busca la fase activa del paciente y se cambia status a falso
        if (String(faseAnterior) !== String(patientDB.phase)) {
            for (let x of patientDB.phaseHistory) {
                if (x.status == true) {
                    x.status = false;
                }
            };
            let ph = {
                phase: patientDB.phase,
                date: fecha.setHours(fecha.getHours() - 7)
            };
            patientDB.phaseHistory.push(ph);
        }
        patientDB.technicalSupport = [{ name: "Andadera" }, { name: "Lentes" }];
        patientDB.diagnosis = body.diagnosis;
        patientDB.allergies = body.allergies;
        patientDB.medicines = body.medicines;
        patientDB.physicalLimitations = body.physicalLimitations;
        //Se manda a guardar el objeto Paciente con sus nuevos campos
        patientDB.save((err, patientSaved) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    err
                });
            }
            res.json({
                success: true,
                patient: patientSaved
            })
        })
    })
})

//Eliminar un paciente
app.delete('/patient/:id', (req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    }
    Patient.findByIdAndUpdate(id, changeStatus, { new: true }, (err, patientDeleted) => {
        if (err) {
            return res.status(500).json({
                sucess: false,
                err
            });
        };
        if (!patientDeleted) {
            return res.status(400).json({
                success: false,
                err: {
                    message: 'Paciente no encontrado'
                }
            })
        }
        res.json({
            success: true,
            patient: patientDeleted
        })
    })
});


module.exports = app;