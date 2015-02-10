var request = require('supertest');
var should = require('should');
var express = require('express');


var app = request("http://localhost:3000");


describe('Endpoint v0', function(){

  describe('status', function(){

    it('should be known', function(done){

      var states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

      app
      .get('/v0/status')
      .expect(function(res) {

        if (states.indexOf(res.body.mongodb.status) > -1) {
            return (null);
          }
          throw new Error("Unknown state : " + res.body.mongodb.status);
      })
      .end(done);
    });

  });

  describe('Auth', function() {
    it('should connect', function(done) {
      app
      .post('/v0/auth')
      .send({
        username : "Luke",
        password : "123"
      })
      .expect(200)
      .end(done);
    });

    it('should not connect', function(done) {
      app
      .post('/v0/auth')
      .send({
        username : "homer",
        password : "supercochon"
      })
      .expect(401)
      .end(done);
    });
  });

  describe('Folder', function() {
    it('should not be treated', function(done) {
      app
      .get('/v0/folder?target=wrongpath')
      .expect(403)
      .end(done);
    });

    it('should not allow access', function(done) {
      app
      .get('/v0/folder?target=../')
      .expect(403)
      .end(done);
    });

    it('should found readme.txt only', function(done) {
      app
      .get('/v0/folder')
      .expect(["downloads\\readme.txt"])
      .end(done);
    });

    it('should found files and folders', function(done) {
      app
      .get('/v0/folder?showfolders=true')
      .expect([ "downloads\\Doc",
                "downloads\\Images",
                "downloads\\readme.txt"])
      .end(done);
    });

    it('should found files in subfolder', function(done) {
      app
      .get('/v0/folder?showfolders=false&target=images')
      .expect([ "downloads\\images\\image.jpg"])
      .end(done);
    });

    it('should found files and folders in subfolder', function(done) {
      app
      .get('/v0/folder?showfolders=true&target=images')
      .expect([ "downloads\\images\\empty_subfolder",
                "downloads\\images\\image.jpg"])
      .end(done);
    });
  });

  describe('Users', function() {
    it('should find user from city and group them', function(done) {
      app
      .get('/v0/users?group=profession&city=San%20Diego')
      .expect({
                Programmer: [
                {
                firstname: "Donatelo",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Mario",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Koopa",
                city: "San Diego",
                profession: "Programmer",
                }
                ],
                Marines: [
                {
                firstname: "Freeman",
                city: "San Diego",
                profession: "Marines",
                }
                ]
                })
      .end(done);
    });

    it('should find user from city and group them and not consider limit', function(done) {
      app
      .get('/v0/users?city=San%20Diego&group=profession&limit=2')
      .expect({
                Programmer: [
                {
                firstname: "Donatelo",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Mario",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Koopa",
                city: "San Diego",
                profession: "Programmer",
                }
                ],
                Marines: [
                {
                firstname: "Freeman",
                city: "San Diego",
                profession: "Marines",
                }
                ]
                })
      .end(done);
    });

  });


});

describe('Endpoint v1', function(){

  describe('Users', function() {
    it('should find user from city and group them', function(done) {
      app
      .get('/v1/users?city=San%20Diego&group=profession')
      .expect({
                Programmer: [
                {
                firstname: "Donatelo",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Mario",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Koopa",
                city: "San Diego",
                profession: "Programmer",
                }
                ],
                Marines: [
                {
                firstname: "Freeman",
                city: "San Diego",
                profession: "Marines",
                }
                ]
              })
      .end(done);
    });

    it('should find user from city, group them and consider limit', function(done) {
      app
      .get('/v1/users?city=San%20Diego&group=profession&limit=3')
      .expect({
                Programmer: [
                {
                firstname: "Donatelo",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Mario",
                city: "San Diego",
                profession: "Programmer",
                }
                ],
                Marines: [
                {
                firstname: "Freeman",
                city: "San Diego",
                profession: "Marines",
                }
                ]
              })
      .end(done);
    });

    it('should find user from city, group them consider limit and skip', function(done) {
      app
      .get('/v1/users?city=San%20Diego&group=profession&limit=3&skip=2')
      .expect({
                Programmer: [
                {
                firstname: "Mario",
                city: "San Diego",
                profession: "Programmer",
                },
                {
                firstname: "Koopa",
                city: "San Diego",
                profession: "Programmer",
                }
                ]
              })
      .end(done);
    });

  });

});
