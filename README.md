# Cheaply #

### React Native application that used: ###

* Axios for work with the network
* Redux for work with state of the application
* Redux Form for work with forms using Redux and React
* Moment for manipulate and display dates
* ESLint for tooling of style and conventions

### Setup the application before run: ###

* Create a Firebase project
* Create records in Cloud Firestore
![Records](/Resources/1.png)
* Add ```category (ascending)``` and ```time (descending)``` indexes for ```expenses``` collection id
* Replace ```PROJECT_ID``` and ```API_KEY``` in the file ```app/constants/firebaseConfigs.js``` with yours
