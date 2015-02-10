var mongoose = require('mongoose');
var User = mongoose.model('User');

// Init database with some data to play around
var names = ['Luke', 'Superman','Batman','Vador','Spiderman','Donatelo','Freeman','Mario','Koopa','Bart','Stan'];
var cities = ['Tatouin', 'Los Angeles','Los Angeles','Los Angeles','Los Angeles','San Diego','San Diego','San Diego','San Diego','Las Vegas','Las Vegas'];
var profession = ['Jedi', 'Programmer','Medic','Programmer','Fireman','Programmer','Marines','Programmer','Programmer','Programmer','Programmer'];
var password = ['123', '1234','1234','123','abc','abcd','abc','123','1234','123','123'];

var aUser;

console.log("Check database init...");

User.find().exec(function (err, res){

if (res.length < 10) {
    for (var i = 0; i < 10; i++) {

      aUser = new User({
        firstname:  names[i],
        city:       cities[i],
        profession: profession[i],
        password:   password[i]
      });


      aUser.save(function (err, user) {
       if (err) {
          console.log(err);
        }
      });

    }
    console.log("Database initialized - OK");
  }
else {
  console.log("Database exist - OK");
}
});

