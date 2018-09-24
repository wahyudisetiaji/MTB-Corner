var chai = require('chai');
var chaiHttp = require('chai-http');
var User = require('../models/user');
var Article = require('../models/article');
var server = 'http://localhost:3000';
var mongoose = require('mongoose');
var bcryptjs = require("bcryptjs");
var expect = chai.expect

chai.use(chaiHttp);
require('dotenv').config()

describe('Article', function(){
    let idUser = ''
    let token = ''
    let idArticle = ''
    this.timeout(2000000)
    let self = this
    before(function(done) {
        mongoose.connect(process.env.DB_TESTING, { useNewUrlParser: true }).then (function () {
            const salt = bcryptjs.genSaltSync(8);
            const hashedPassword = bcryptjs.hashSync('12345', salt);

            User.create({
              username: 'testing',
              email : 'testing@mail.com',
              password : hashedPassword
            })
            .then ( function (result) {
                console.log("=======> start-article");
                chai.request(server)
                    .post('/users/login')
                    .send({email: 'testing@mail.com', password: '12345'})
                    .end(function(err, res) {
                        idUser = result._id
                        token = res.body.data.token
                        done();
                    })
            })
            .catch (function (err) {
                done()
            })
        })
    })
    
    it('expect create a ARTICLE on /articles/create POST', function(done) {
        chai.request(server)
        .post('/articles/create')
        .set('token', token)
        .send({
            articleTitle: 'New Article Title',
            image: 'https://goo.gl/NG5J2E',
            article: 'New Content Article',
            category: 'Bike',
        })
        .end(function(err, res) {
            idArticle = res.body.result._id
            console.log(idArticle)
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('article successfully created');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('object');
            expect(res.body.result).have.property('_id');
            expect(res.body.result).have.property('userId');
            expect(res.body.result).have.property('articleTitle');
            expect(res.body.result).have.property('image');
            expect(res.body.result).have.property('article');
            expect(res.body.result).have.property('category');
            expect(res.body.result).have.property('comments');
            expect(res.body.result.articleTitle).equal('New Article Title');
            expect(res.body.result.articleTitle).be.a('string');
            expect(res.body.result.image).equal('https://goo.gl/NG5J2E');
            expect(res.body.result.image).be.a('string');
            expect(res.body.result.article).equal('New Content Article');
            expect(res.body.result.article).be.a('string')
            expect(res.body.result.category).equal('Bike');
            expect(res.body.result.category).be.a('string')
          done();
        })
    })

    it('expect update a ARTICLE on /articles/update/:id PUT', function(done) {
        chai.request(server)
        .put(`/articles/update/${idArticle}`)
        .set('token', token)
        .send({
            articleTitle: 'Update Article Title',
            image: 'https://goo.gl/NG5J2E',
            article: 'Update Content Article',
            category: 'Bike',
        })
        .end(function(err, res) {
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('article successfully update');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('object');
            expect(res.body.result).have.property('n');
            expect(res.body.result).have.property('nModified');
            expect(res.body.result).have.property('opTime');
            expect(res.body.result).have.property('electionId');
            expect(res.body.result).have.property('ok');
            expect(res.body.result).have.property('operationTime');
            expect(res.body.result.n).be.a('number');
            expect(res.body.result.nModified).be.a('number');
            expect(res.body.result.opTime).be.a('object');
            expect(res.body.result.electionId).be.a('string')
            expect(res.body.result.ok).be.a('number');
            expect(res.body.result.operationTime).be.a('string')
            done();
        })
    })


    it('expect comment a ARTICLE on /articles/comment/:id PUT', function(done) {
        chai.request(server)
        .put(`/articles/comment/${idArticle}`)
        .set('token', token)
        .send({
            comment: 'New Comment',
        })
        .end(function(err, res) {
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('comment successfully update');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('object');
            expect(res.body.result).have.property('n');
            expect(res.body.result).have.property('nModified');
            expect(res.body.result).have.property('opTime');
            expect(res.body.result).have.property('electionId');
            expect(res.body.result).have.property('ok');
            expect(res.body.result).have.property('operationTime');
            expect(res.body.result.n).be.a('number');
            expect(res.body.result.nModified).be.a('number');
            expect(res.body.result.opTime).be.a('object');
            expect(res.body.result.electionId).be.a('string')
            expect(res.body.result.ok).be.a('number');
            expect(res.body.result.operationTime).be.a('string')
            done();
        })
    })

    it('expect delete comment a ARTICLE on /articles/comment/delete/:id PUT', function(done) {
        chai.request(server)
        .put(`/articles/comment/delete/${idArticle}`)
        .set('token', token)
        .end(function(err, res) {
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('comment successfully deleted');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('object');
            expect(res.body.result).have.property('n');
            expect(res.body.result).have.property('nModified');
            expect(res.body.result).have.property('opTime');
            expect(res.body.result).have.property('electionId');
            expect(res.body.result).have.property('ok');
            expect(res.body.result).have.property('operationTime');
            expect(res.body.result.n).be.a('number');
            expect(res.body.result.nModified).be.a('number');
            expect(res.body.result.opTime).be.a('object');
            expect(res.body.result.electionId).be.a('string')
            expect(res.body.result.ok).be.a('number');
            expect(res.body.result.operationTime).be.a('string')
            done();
        })
    })

    it('expect get all ARTICLE on /articles GET', function(done) {
        chai.request(server)
        .get(`/articles`)
        .end(function(err, res) {
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('data all article');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('array');
            expect(res.body.result[0]).have.property('_id');
            expect(res.body.result[0]).have.property('userId');
            expect(res.body.result[0]).have.property('articleTitle');
            expect(res.body.result[0]).have.property('image');
            expect(res.body.result[0]).have.property('article');
            expect(res.body.result[0]).have.property('category');
            expect(res.body.result[0]).have.property('comments');
            expect(res.body.result[0].articleTitle).equal('Update Article Title');
            expect(res.body.result[0].articleTitle).be.a('string');
            expect(res.body.result[0].image).equal('https://goo.gl/NG5J2E');
            expect(res.body.result[0].image).be.a('string');
            expect(res.body.result[0].article).equal('Update Content Article');
            expect(res.body.result[0].article).be.a('string')
            expect(res.body.result[0].category).equal('Bike');
            expect(res.body.result[0].category).be.a('string')
            done();
        })

    })


    it('expect get category ARTICLE on /articles/category/:category GET', function(done) {
        chai.request(server)
        .get(`/articles/category/Bike`)
        .end(function(err, res) {
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('data category article');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('array');
            expect(res.body.result[0]).have.property('_id');
            expect(res.body.result[0]).have.property('userId');
            expect(res.body.result[0]).have.property('articleTitle');
            expect(res.body.result[0]).have.property('image');
            expect(res.body.result[0]).have.property('article');
            expect(res.body.result[0]).have.property('category');
            expect(res.body.result[0]).have.property('comments');
            expect(res.body.result[0].articleTitle).equal('Update Article Title');
            expect(res.body.result[0].articleTitle).be.a('string');
            expect(res.body.result[0].image).equal('https://goo.gl/NG5J2E');
            expect(res.body.result[0].image).be.a('string');
            expect(res.body.result[0].article).equal('Update Content Article');
            expect(res.body.result[0].article).be.a('string')
            expect(res.body.result[0].category).equal('Bike');
            expect(res.body.result[0].category).be.a('string')
            done();
        })

    })

    it('expect get my ARTICLE on /articles/myarticle GET', function(done) {
            chai.request(server)
            .get(`/articles/myarticle`)
            .set('token', token)
            .end(function(err, res) {
                expect(res).to.have.status(200)  
                expect(res).be.json;
                expect(res.body).be.a('object');
                expect(res.body).have.property('message');
                expect(res.body.message).equal('data my article');
                expect(res.body.message).be.a('string');
                expect(res.body).have.property('result');
                expect(res.body.result).be.a('array');
                expect(res.body.result[0]).have.property('_id');
                expect(res.body.result[0]).have.property('userId');
                expect(res.body.result[0]).have.property('articleTitle');
                expect(res.body.result[0]).have.property('image');
                expect(res.body.result[0]).have.property('article');
                expect(res.body.result[0]).have.property('category');
                expect(res.body.result[0]).have.property('comments');
                expect(res.body.result[0].articleTitle).equal('Update Article Title');
                expect(res.body.result[0].articleTitle).be.a('string');
                expect(res.body.result[0].image).equal('https://goo.gl/NG5J2E');
                expect(res.body.result[0].image).be.a('string');
                expect(res.body.result[0].article).equal('Update Content Article');
                expect(res.body.result[0].article).be.a('string')
                expect(res.body.result[0].category).equal('Bike');
                expect(res.body.result[0].category).be.a('string')
                done();
            })
    })


    it('expect delete a ARTICLE on /articles/delete/:id DELETE', function(done) {
        chai.request(server)
        .delete(`/articles/delete/${idArticle}`)
        .set('token', token)
        .end(function(err, res) {
            expect(res).to.have.status(200)  
            expect(res).be.json;
            expect(res.body).be.a('object');
            expect(res.body).have.property('message');
            expect(res.body.message).equal('article successfully deleted');
            expect(res.body.message).be.a('string');
            expect(res.body).have.property('result');
            expect(res.body.result).be.a('object');
            expect(res.body.result).have.property('n');
            expect(res.body.result).have.property('opTime');
            expect(res.body.result).have.property('electionId');
            expect(res.body.result).have.property('ok');
            expect(res.body.result).have.property('operationTime');
            expect(res.body.result.n).be.a('number');
            expect(res.body.result.opTime).be.a('object');
            expect(res.body.result.electionId).be.a('string')
            expect(res.body.result.ok).be.a('number');
            expect(res.body.result.operationTime).be.a('string')
            done();
        })
    })


    after(function (done) {
        mongoose.connect('mongodb://mtbcorner-test:sportident17@ds159772.mlab.com:59772/mtbcorner-test', { useNewUrlParser: true })
                .then (function () {
                    User.collection.drop()
                        .then (function () {
                            mongoose.connect('mongodb://mtbcorner-test:sportident17@ds159772.mlab.com:59772/mtbcorner-test', { useNewUrlParser: true })
                                    .then((result) => {
                                    Article.collection.drop()
                                            .then((result) => {
                                                console.log("=======> finish-article");
                                                done()
                                            })
                                            .catch((err) => {
                                                done()
                                            });
                                    })
                                    .catch (function (err) {
                                        done()
                                    })
                        })
                        .catch (function (err) {
                            done()
                        })
                }) 
                .catch (function (err) {
                    done()
                })   
    })

}) 