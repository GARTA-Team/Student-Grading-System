# GARTA Student Grading System

## Requirements to run the app 
* Nodemon: npm install -g nodemon
* Install dependencies
	* npm install on root directory
	* "cd client" and "npm install"
	* "cd ../server" and "npm install"
* In server, rename .env.example to .env and add your own values
* Go back to root directory and run "npm start"

## How to fix errors
* For bcrypt error when running "npm install" from server try running this from administrator powershell:
	* npm install --global --production windows-build-tools@4.0.0 (this version works, the latest one seems to be bugged for some reason)
	* you will also need python 2.7.x (if your version doesn't work try with 2.7.17)
