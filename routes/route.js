let express = require ('express');
let router = express.Router();
let Patient = require('../models/patient');
let Location = require('../models/location');
let Booking = require('../models/booking');
let Test = require('../models/test');
let Nurse = require('../models/nurse');
let bcrypt = require('bcrypt');
let genInvoiceNo = require('../functions/RandomInvoiceNo');
let Payment = require('../models/payment');

//PATIENT.JS
router.post('add_patient', async (req,res)=>{
    let patient = new Patient (req.body)
    try{
        let saved_patient = await patient.save();
        let location_id = req.body.location_id;
        let location = await Location.findById(location_id);
        if(location){
            location.patients.push(saved_patient._id);
            const updated_location = await location.save();
        }
        res.status(200).json({message: "Patient Added Successfully"})
    } catch(err) {
        console.log(err);
        res.status(204).json({message: err.message});
    }
});
router.get('/patients', async (req, res)=>{
    try{
        let patients = patient.find();
        res.status(200).json(patients)
    }catch(err){
        res.status(204).json({message: err.message});
    }
});


//LOCATION.JS
router.post('/add_location', async (req,res)=>{
    let location = new Location(req.body);
    try{
        let saved_location = await location.save();
        res.status(200).json({message:"Location Added successfully"})
    }catch(err){
        res.status(204).json({message: err.message});
    }
});
router.get('/locations', async (req, res)=>{
    try{
        let locations = Location.find();
        res.status(200).json(locations)
    }catch(err){
        res.status(204).json({message: err.message});
    }
});


//BOOKING.JS
router.post('/add_booking', async(req,res)=>{
    let booking = req.body;
    try{
        let invoice_no = genInvoiceNo();
        booking.invoice_no = invoice_no;
        booking = new Booking (booking);
        let savedBooking = await booking.save();
        
        let total_amount = 0;
        let test_id = booking.test_id;
        let test = await Test.findById(test_id);
        total_amount += test.test_cost;

        let payment = new Pay({
            invoice_no: invoice_no,
            total_amount: total_amount
        });

        let savedPayment = await payment.save();
        res.status(200).json({message: "Booking Made Successfully"})
        
    }catch(err){
        console.log(err);
        res.status(204).json({message: err.message});
    }

});
router.get('/appointments', async (req, res)=>{
    try{
        let bookings = await booking.find().populate("test_id");
        res.status(200).json(bookings)
    }catch(err){
        res.status(204).json({message: err.message});
    }
});



//TEST.JS
router.post('/add_test', async (req,res)=>{
    let test = new Test(req.body);
    try{
        let saved_test = await test.save();
        res.status(200).json({message:"Test Added successfully"})
    }catch(err){
        res.status(204).json({message: err.message});
    }
});
router.get('/tests', async (req, res)=>{
    try{
        let tests = await Test.find();
        res.status(200).json(tests)
    }catch(err){
        res.status(204).json({message: err.message});
    }
});


//NURSE.JS
router.post('/add_nurse', async (req,res)=>{
    let nurse = req.body;
    let hashed_password = await bcrypt.hash("Nurse2024", 10)
    nurse.password = hashed_password;

    nurse = new Nurse(nurse);
    try{
        let savedNurse = await nurse.save();
        res.status(200).json({message:"Nurse Added successfully"})
    }catch(err){
        res.status(204).json({message: err.message});
    }
});
router.get('/view_nurses', async (req, res)=>{
    try{
        let nurses = await Nurse.find({
            surname:1,
            othernames:1,
            gender:1,
            email:1,
            reg_date:1,
            phone:1,
        });
        res.status(200).json(nurses)
    }catch(err){
        console.log(err);
        res.status(204).json({message: err.message});
    }
});



module.exports = router;

