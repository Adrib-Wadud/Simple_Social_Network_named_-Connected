const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator');
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
//GET api/users
//access public
router.get('/',auth, async(req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
// AUTHENTICATE USER AND GET TOKEN
router.post('/',[
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
    //See if user exists
    let user = await User.findOne({email});

    if(!user){
        return res.status(400).json({errors:[{msg: 'User does not exist'}]})
    }
 
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]})
    }
    //Return JSON Web token

    const payload = {
        user:{
            id: user.id
        }
    }

    jwt.sign(payload, 
    config.get('jwtSecret'),
    {expiresIn: 360000},
        (err, token) =>{
            if(err) throw err;
            res.json({token})
        }
    )
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')

    }


});

module.exports = router;