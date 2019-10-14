const gistController = require('../controllers/gist');
const auth = require('../middlewares/auth');
const gist = (app)=>{
    
    app.all('/', (req, res)=>{
        res.send({
            error: false,
            message: 'Welcome to the Gist app'
        });
    })
    
    app.post('/create-gist', auth, (req, res)=>{
        gistController.createGist(req, res);
    });

    app.get('/all-gist', (req, res)=>{
        gistController.getAllGist(req, res);
    });

    app.get('/gist/:id', (req, res)=>{
        gistController.getGist(req, res);
    });

    app.get('/gist', (req, res)=>{
        gistController.getGistsByUserId(req, res);
    });
      
}

module.exports = gist;