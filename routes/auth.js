const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation, create_userValidation } = require('../validation')

router.post('/register', async (req,res) => {

    // lets validate the data before making a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //checking if user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exist')
   
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }); 
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }
    catch(err){
        res.status(400).send(err);
    }
   
});

//the login
router.post ('/login', async (req,res) => {

// lets validate the data before making a user
const {error} = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

//checking if the email exists
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send('Email is not found');

//password check
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('invalid password')

//create and assign a token
const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);

res.send('Logged in!');


});

//new user
router.post ('/create_user', async (req,res) => {

    // lets validate the data before creating a user
    const {error} = create_userValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //equality between passwords
    if (req.body.password !==req.body.confirm_password){
        res.status(400).json({message: "passwords do not match"})   
     }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    //checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Email is taken already');

    //check for number
    const contact_number = await User.findOne({contact_number: req.body.contact_number});
        if (contact_number) return res.status(400).json('number must be 11');  
    
    //create a new user
    const create_user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        contact_number: req.body.contact_number,
        country: req.body.country
    }); 

    try{
        const savedUser = await create_user.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(400).json(err);
    }
    
    });
    

module.exports = router;