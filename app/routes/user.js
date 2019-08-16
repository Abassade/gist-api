const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const user = (app)=>{
    
    app.post('/register', (req, res)=>{
        userController.signUp(req, res);
    });

    app.get('/login', (req, res)=>{
        userController.signIn(req, res);
    });

    app.get('/all-user', (req, res)=>{
        userController.allUser(req, res);
    });

    app.delete('/remove-user', auth, (req, res)=>{
        userController.removeUser(req, res);
    });
      
}

module.exports = user;