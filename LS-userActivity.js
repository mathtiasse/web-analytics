// expiration time for userID and visitID in milliseconds
var userIDExpirationTime = 13 * 30 * 24 * 60 * 60 * 1000;
var visitIDExpirationTime = 30 * 60 * 1000;
var referrerPage = document.referrer;
var landingPage = window.location.href;
var searchParams = new URLSearchParams(new URL(landingPage).search);

var source = {
    referrer: referrerPage,
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_id: searchParams.get("utm_id") || "",
    utm_term: searchParams.get("utm_term") || "",
    utm_content: searchParams.get("utm_content") || ""
};

// get current userID
var currentUserID = JSON.parse(localStorage.getItem("userActivity"));

// check if userActivity is expired
if (isExpired(currentUserID, userIDExpirationTime)) {
    // generate new userActivity
    var newUserID = {
        id: generateUUID(),
        expirationDate: Date.now() + userIDExpirationTime,
        lastActivity: Date.now(),
        landingPage: landingPage,
        source: source,
        visit: {
            id: generateUUID(),
            expirationDate: Date.now() + visitIDExpirationTime,
            landingPage: landingPage,
            source: source,
            count: 1
        }
    };
    // set new userActivity
    localStorage.setItem("userActivity", JSON.stringify(newUserID));
} else {
    // check if visit is expired
    if (isExpired(currentUserID.visit, visitIDExpirationTime)) {
        // update visit
        currentUserID.visit = {
            id: generateUUID(),
            expirationDate: Date.now() + visitIDExpirationTime,
            landingPage: landingPage,
            source: source,
            count: currentUserID.visit.count ? currentUserID.visit.count+1 : 1
        };
    }
    currentUserID.lastActivity = Date.now();
    if(isExpired(currentUserID, userIDExpirationTime)){
        currentUserID.landingPage = landingPage;
        currentUserID.source = source;
    }
    localStorage.setItem("userActivity", JSON.stringify(currentUserID));
}

// function to check if userID/visitID is expired
function isExpired(item, expirationTime) {
    return item === null || item.expirationDate < Date.now();
}
// function to generate uuid
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}