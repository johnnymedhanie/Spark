// Initialize Firebase
var config = {
    apiKey: "AIzaSyC7bHQlc_UMzRqtKvIo7EVUAvWlom8iIzM",
    authDomain: "sparque-36a23.firebaseapp.com",
    databaseURL: "https://sparque-36a23.firebaseio.com",
    projectId: "sparque-36a23",
    storageBucket: "",
    messagingSenderId: "718482521561"
};
firebase.initializeApp(config);

var database = firebase.database();

var id = 1;

var submit = document.getElementById("post");
var user = document.getElementById("username");
var text = document.getElementById("text");
submit.addEventListener('click', function () {
    firebase.database().ref('users/' + id).push({
        username: user.value,
        message: text.value,
        time: Date.now()
    });

    user.value = '';
    text.value = '';
});

var table = document.getElementById("list");
firebase.database().ref('users/' + id).on("child_added", function (data, prevChildKey) {
    var newData = data.val();
    console.log(newData);
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerText = newData.username + " --- " + newData.message + " --- " + newData.time;
    tr.appendChild(td);
    table.appendChild(tr);
});
