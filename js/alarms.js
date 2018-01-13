// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyC-Te_PT5kuG1bFOzt9pmzijZZuKFC5_o4",
//   authDomain: "moment-plug-in.firebaseapp.com",
//   databaseURL: "https://moment-plug-in.firebaseio.com",
//   projectId: "moment-plug-in",
//   storageBucket: "moment-plug-in.appspot.com",
//   messagingSenderId: "194887991985"
// };
// firebase.initializeApp(config);

function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      unique_uid = uid;

      // [START_EXCLUDE]
      document.getElementById('signInButton').textContent = 'sign out motherfucker';
      document.getElementById('name').textContent = displayName + ', you\'re fucking retarded';
      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('signInButton').textContent = 'sign in motherfucker';
      document.getElementById('name').textContent = 'you\'re fucking retarded';
      // [END_EXCLUDE]
    }
    document.getElementById('signInButton').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('signInButton').addEventListener('click', startSignIn, false);
}

initApp();

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

document.getElementById("myButton").addEventListener("click", notifyMe);

function notifyMe() {
  console.log('clicked');
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Remember The Grind', {
      icon: 'https://s-media-cache-ak0.pinimg.com/originals/77/8b/a4/778ba4aba635a3ac652c8459fc9ed0de.jpg',
      body: "Hey there! You've been notified!",
    });

    notification.onclick = function () {
      window.open("http://www.datpiff.com/");
    };

  }

}
