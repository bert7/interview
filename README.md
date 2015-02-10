# interview
N/A

-----
## Requirement :
- [Vagrant](https://docs.vagrantup.com/v2/installation/) is installed
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) is installed

### Installation :
git clone https://github.com/bert7/vagrant_conf_file_interview
cd vagrant_conf_file_interview
vagrant up
vagrant ssh (if password needed : vagrant)
cd interview
npm start

### Browse :
http://localhost:3000
You will find quick informations for each endpoint at the home page above.

### Testing :
npm test

## Why these technologies ?

### NodeJS:
- Efficient
- Time for Dev shorter
Personnal reasons :
- Never worked on NodeJS before and was willing to challenge myself.

#### Express :
- Famous web framework, big community then support, documentation...
-> Restify could have been a better choice since the interview project was an api. Restify is lighter than Express ( no template system... ).

#### Mongoose :
- ODM widely used to interact with mongo databases.

#### MongoDB :
- I knew SQL and was willing to discover a noSQL. It allow you to store quickly any type of data which saved me time.

#### Mocka :
- After research it happened to be the mainly used framework for unit testing.

#### SuperTest :
- I found this project to test my endpoints ( Get and Post request ). It matched my need and a had a large amount of contributors on github so it appear to be serious enough to use it.

#### Vagrant :
- To make the deployment easier for crossplatform environnement.

### Versioning
I implemented a versioning system in the current code. The way it works is pretty straitgh forward.
Your controllers are named depending on their functionalities ( for example myctrl_v1 and myctrl_v2 ).
Your route folder contains your project version ( example v1.js, v2.js... ) and will associate the controllers to use.
The program catch the version in the URL and call the route accordingly ( example : http://address.com/v1/endpoint will use the route for version 1 and call the corresponding endpoint ).
My concern was maintability of the code. The advantage of this versioning system is if you need to correct a bug in version 1.1.0 the fix will also apply in the version 1.1.1 and above.

