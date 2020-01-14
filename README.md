# Cheaply #

<p float="left">
  <img src="/Screenshots/2.png" width="200px" />
  <img src="/Screenshots/4.png" width="200px" />
  <img src="/Screenshots/7.png" width="200px" />
  <img src="/Screenshots/6.png" width="200px" />
</p>

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
