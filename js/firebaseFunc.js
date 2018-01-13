// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-Te_PT5kuG1bFOzt9pmzijZZuKFC5_o4",
  authDomain: "moment-plug-in.firebaseapp.com",
  databaseURL: "https://moment-plug-in.firebaseio.com",
  projectId: "moment-plug-in",
  storageBucket: "moment-plug-in.appspot.com",
  messagingSenderId: "194887991985"
};
firebase.initializeApp(config);

var unique_uid;
var momentData = null;

document.getElementById('signInButton').addEventListener('click', startSignIn);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user + " is user currently in initapp");
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
      console.log(unique_uid + " unique id right now");
      plswork(unique_uid);
      plswork(uid);
      plswork(uid);

      // [START_EXCLUDE]
      document.getElementById('signInButton').textContent = 'sign out motherfucker';
      document.getElementById('name').textContent = displayName + ', you\'re fucking retarded';
      // var scope = angular.element(document.getElementById("poop")).scope();
      // scope.$apply();
      // alert(scope.loadMoments());
      //load();
      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('signInButton').textContent = 'sign in motherfucker';
      document.getElementById('name').textContent = 'you\'re fucking retarded';
      unique_uid = null;
      // [END_EXCLUDE]
    }
    document.getElementById('signInButton').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('signInButton').addEventListener('click', startSignIn, false);
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
var fuck;
function startAuth(interactive) {
  console.log("starting auth...........");
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).then(function(result) {
        fuck = result;
        //initApp();
        var uid = result.uid;
        //
        // console.log("loading moments.. with " + unique_uid + " but really with " + uid);
        // var momentData = firebase.database().ref('users/'+ uid);
        // momentData.on('child_added', function(data) {
        //   var newMoment = data.val();
        //   console.log("Moment: " + newMoment.moment + " Type: " + newMoment.type);
        //
        //   var node = document.createElement("P");                     // Create a <p> node
        //   var textnode = document.createTextNode(newMoment.moment);   // Create a text node
        //   node.appendChild(textnode);                                 // Append the text to <li>
        //   document.getElementById("poooop").appendChild(node);        // Append <li> to <ul> with
        // });
        plswork(uid);
      }).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  console.log('sign in button clicked');
  document.getElementById('signInButton').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    unique_uid = null;
  } else {
    startAuth(true);
  }
  //initApp();
}

window.onload = function(){
  initApp();
};

//---------------------------------------------------------------------------------------------------------------------------------------------
//Stores Moments in Histroy

var app = angular.module('data',["ngAlertify"]);

app.controller('dataController', function($scope, alertify) {
  $scope.user_moment = '';

  document.getElementById("hiddenInput")
  .addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {

      if (unique_uid == null) {
        alertify
        .closeLogOnClick(true)
        .error("Please sign in first");
      } else {
        firebase.database().ref('users/'+ unique_uid ).push({
          moment: $scope.user_moment,
          type: "positive"
        });
        console.log($scope.user_moment);
        $scope.user_moment = 'Enter Fav Keijo Episode Here';
      }
    }
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------
//Retrives Moments from history and populates it
var load, array;

app.controller('getDataController', function($scope) {
  $scope.moments = [];

  if(unique_uid == null) {
    $scope.moments = ["Titty Hypnosis", "Kusaki Moi", "Can I pet your titties", "Tiff Li"];
  } //else {

  $scope.loadMoments = function() {
    $scope.moments = [];
    console.log("loading moments..");
    var momentData = firebase.database().ref('users/'+ unique_uid);
    momentData.on('child_added', function(data) {
      var newMoment = data.val();
      console.log("Moment: " + newMoment.moment + " Type: " + newMoment.type);
      $scope.moments.push(newMoment.moment);
    });
  };

  load = $scope.loadMoments;
  array = $scope.moments;
});

var plswork = function(uid) {
  console.log("loading moments.. with " + uid);
  if(momentData == null) {
    momentData = firebase.database().ref('users/'+ uid);
    momentData.on('child_added', function(data) {
      var newMoment = data.val();
      console.log("Moment: " + newMoment.moment + " Type: " + newMoment.type);

      var node = document.createElement("P");                     // Create a <p> node
      var textnode = document.createTextNode(newMoment.moment);   // Create a text node
      node.appendChild(textnode);                                 // Append the text to <li>
      document.getElementById("poooop").appendChild(node);        // Append <li> to <ul> with
    });
  }
};

/*
firebase.database().ref('users/'+ unique_uid).on("child_added", fucntion(data, prevChild){
      var newMoment = data.val();
      console.log(newMoment.moment);
      $scope.moments.push(newMoment.moment);
    });
*/
