"use strict";

// Client ID and API key from the Developer Console
var CLIENT_ID = '940763317903-3ci2q0rf6266ckfchredmjaiubc8onjg.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        $('#authModal').modal('hide');
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
        console.log("Breakpoint 1");
    } else {
        $('#authModal').modal('show');
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function displayReminder(name, time, location, when) {
    console.log("Breakpoint 4");
    $("#reminderModal").modal('show');
    console.log("Breakpoint 5");
    var audio = document.getElementById("audio");
    audio.play();
    console.log("Breakpoint 6");
    $("#table-content").append('<tr><td>' + name + '</td><td>' + location + '</td><td>' + time + '</td></tr>');
    setTimeout(function () {
        $("#reminderModal").modal('hide');
    }, 15 * 1000);
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    console.log("Breakpoint 2");
    console.log(new Date(new Date().getTime() + 60 * 60 * 1000))
    gapi.client.calendar.events.list({
        'calendarId': 'ilearntraining@gmail.com',
        'timeMin': (new Date()).toISOString(),
        'timeMax': (new Date(new Date().getTime() + 60 * 60 * 1000)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        console.log(response);
        if (events.length > 0) {
            console.log("Breakpoint 3.5");
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var rawTime = event.start.dateTime;
                var hours = parseInt(rawTime.slice(11, 13));
                var minutes = parseInt(rawTime.slice(14, 16));
                var when = (hours * 60 + minutes) - (new Date().getHours() * 60 + new Date().getMinutes());
                var name = event.summary;
                var time = rawTime.slice(11, 16);
                var location = event.location;
                if (when >= 0) {
                    displayReminder(name, time, location, when);
                }
            }
        } else {
            console.log("No events");
        }
    });
}