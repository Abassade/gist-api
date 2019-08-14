const gistController = require('../controllers/gist');
const routes = (app)=>{
    
    app.all('/', (req, res)=>{
        res.send({
            error: false,
            message: 'Welcome to the Gist app'
        });
    })
    
    app.post('/create-gist', (req, res)=>{
        gistController.createGist(req, res);
    });

    app.get('/all-gist', (req, res)=>{
        gistController.getAllGist(req, res);
    });

    app.get('/gist/:id', (req, res)=>{
        gistController.getGist(req, res);
    });
      
}

module.exports = routes;