const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const app = require('../index');
const expect = chai.expect;
const filePath = './sample.jpg';
let tokenGotten = '';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Gist app API', () => {

    beforeEach( ()=>{
      
    })

  it('should return bad request error true as file is not in request', done => {
    chai.request(app)
      .post('/create-gist')
      .type('form')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.error)
          .to
          .be
          .equal(true);
        expect(res.body)
          .to
          .have
          .property('message');
        expect(res.body.message)
          .to
          .be
          .equal('ensure you upload file from formdata');
        done();
      });

  });

  it('should return bad request error true as the required fields (title, description) are not passed', done =>{
      chai.request(app)
      .post('/create-gist')
      .type('form')
      .attach(filePath)
      .end( (err, res)=>{
          if(err) console.error(err);
          expect(res.body.error)
          .to
          .be
          .equal(true);
          expect(res.body.message)
          .to
          .be
          .equal('oga pass the required fields');
        done();
      })
      
  })

it('should return a successfull message with token and userId on login', done =>{
    chai.request(app)
    .post('/create-gist')
    .send({fullname: 'makinde abass', email: 'test@test.com', password: 'test12345'})
    .end( (err, res)=>{
        if(err) console.error(err);
        tokenGotten = res.body.token;
        expect(res.body.error)
        .to
        .be
        .equal(false);
        expect(res.body.response)
        .to
        .have('userId')
        expect(res.body.response)
        .to
        .have('token')
        expect(res.body.message)
        .to
        .be
        .equal('gist created');
      done();
    })

})

it('should return a successfull message with server error body false', done =>{
    chai.request(app)
    .post('/create-gist')
    .type('form')
    .attach(filePath)
    .header({authorization: tokenGotten})
    .send({title: 'a new gist', description: 'some new gists are  yet to b created'})
    .end( (err, res)=>{
        if(err) console.error(err);
        expect(res.body.error)
        .to
        .be
        .equal(false);
        expect(res.body.response)
        .to
        .have('_id')
        expect(res.body.message)
        .to
        .be
        .equal('gist created');
      done();
    })
    
})

});
