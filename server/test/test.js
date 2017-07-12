'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiMoment = require('chai-moment');
const faker = require('faker');
const mongoose = require('mongoose');


const {Poll} = require('../models');

const {DATABASE_URL, TEST_DATABASE_URL} = require('../config'); 
const {app, runServer, closeServer} = require('../index');

const should = chai.should();
chai.use(chaiHttp);
chai.use(chaiMoment);


function generatePoll() {
  return {
    choices: [{
      choice: faker.lorem.word(),
      vote: faker.lorem.word()
     
    }],
    text: faker.lorem.sentence(),
    title: faker.lorem.sentence(3)
   
      };
}

function seedPoll() {
  console.info('Seeding test data....');
    
  const seedData = [];
  for (let i = 0; i < 10; i++) {
    seedData.push(generatePoll());
  }
  return Poll.insertMany(seedData);
}


function dropTestData() {
  return mongoose.connection.dropDatabase();
}

describe('Posts', function(){
  before(function(){
    return runServer(TEST_DATABASE_URL);
  });
    
  beforeEach(function() {
    return (seedPoll());
  });
    
  afterEach(function() {
    return dropTestData();
  });

  after(function() {
    return closeServer();
  });


        describe('Poll Test', function() {
            describe('GET', function(){
                it('should get the all polls', function(){
                   return chai.request(app) 
                    .get('/api/polls')
                    .then(function(res){
                      res.should.have.status(200);
                      res.should.be.json;
                      res.body.should.be.a('array');
                      const expectedKeys = ['title', 'id','text', 'choices'];
                      res.body.forEach(function(item) {
                        item.should.include.keys(expectedKeys);
                      })
                      const choicesKeys = ['choice', 'vote'];
                      console.log('look at me =====>', res.body)
                      res.body[7].choices.forEach(function (item) {
                        item.should.include.keys(choicesKeys)
                      })
                    })
                })
            })
        })


        describe('GET by ID', function(){
          it.only('should get the Polls information by id', function(){
            let testPoll = {};

            return chai.request(app)
              .get('/api/polls')
              .then(function(res) {
                
                testPoll = res.body[0];
                return chai.request(app)
                  .get(`api/polls/${testPoll.id}`);
              })
              .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array')
                res.body.id.should.equal(testPoll.id);
                res.body.title.should.equal(testPoll.title);
                res.body.text.should.equal(testPoll.text);
                res.body.choices.should.equal(testPoll.choices);
              })
          })
        })
})