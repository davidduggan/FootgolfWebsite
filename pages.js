const express = require("express");
const authController = require("../controllers/auth.js");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.get('/', authController.isLoggedIn, userController.getAllUsersWithHandicap, (req, res) => {
    console.log(req.message);
    res.render('index', {
        user: req.user,
        userList: req.userList,
        // message: req.message
    }); 
})

router.get('/register', (req, res) => {
    res.render('register.hbs');
})

router.get('/login', (req, res) => {
    res.render('login.hbs');
})

router.get('/profile', authController.isLoggedIn,   (req, res) => {

    if(req.user){
        res.render('profile.hbs', {
            user: req.user


        });
    }else{
        res.redirect('/login');
    }
    
   
})

router.get('/score', authController.isLoggedIn, (req, res) => {

    if (req.user) {
        res.render('score.hbs', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

})

router.get('/scores', authController.isLoggedIn, (req, res) => {

    if(req.user){
        res.render('scores.hbs', {
            user: req.user
        });
    }else{
        res.redirect('/login');
    }
    
   
})

router.get('/courses', authController.isLoggedIn, (req, res) => {

    if(req.user){
        res.render('courses.hbs', {
            user: req.user
        });
    }else{
        res.redirect('/login');
    }
    
})

router.post("/score", authController.isLoggedIn, userController.uploadScore, (req, res) => {
    // console.log("Posted to /score");
    res.redirect("/");
});



router.get('/details', authController.isLoggedIn,      (req, res) => {

    if(req.user){
        res.render('details.hbs', {


            user: req.user
        });
    }else{
        res.redirect('/login');
    }
    
   
})

router.get('/password', authController.isLoggedIn,      (req, res) => {

    if(req.user){
        res.render('password.hbs', {


            user: req.user
        });
    }else{
        res.redirect('/login');
    }
    
   
})

router.get('/scoreMessage', authController.isLoggedIn,      (req, res) => {

    if(req.user){
        res.render('scoreMessage.hbs', {


            user: req.user
        });
    }else{
        res.redirect('/login');
    }
    
   
})



module.exports = router;


















/*
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null, 'scorecards')
    },
    filename: (req, file, cb) =>{
        console.log(file);
        cb(null, date.now()+path.extname(file.originalname));
    }

})

const upload = multer({storage: storage})

router.get("/upload", (req, res)=>{
    res.render("upload");
});

router.post("/upload", upload.single('scorecard'),(req, res)=>{
    res.send("Scorecard Uploaded!");
});
*/

