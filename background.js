chrome.action.onClicked.addListener(async (tab) => {
    console.log(tab);
});

// chrome.tabs.getSelected(null,function(tab) {
//     var tablink = tab.url;
//     console.log(tablink);
// });


// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     let url = tabs[0].url;
//     console.log(url);
//     // use `url` here inside the callback because it's asynchronous!
// });







// chrome.runtime.onInstalled.addListener(() => {

// });

// // Listen for the 'activated' event to know when the extension has loaded
// chrome.runtime.onInstalled.addListener(function() {
//     // Register a listener for the 'tabs.onActivated' event
//     chrome.tabs.onActivated.addListener(function(activeInfo) {
//       // Get the current tab's details
//       chrome.tabs.get(activeInfo.tabId, function(tab) {
//         // Log a message to the console with the new tab's URL
//         console.log("New tab activated:", tab.url);
//       });
//     });
//   });


// Listen for the 'activated' event to know when the extension has loaded
chrome.runtime.onInstalled.addListener(function() {
    chrome.action.setBadgeText({
        text: "Wait...",
    });
    // Register a listener for the 'tabs.onUpdated' event
    chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
        // Only log a message if the URL has changed
        if (changeInfo.url) {
            console.log("Hi");
            const response = await fetch('https://phishing-detection.onrender.com/predict', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            // .then((res) => res.json())
            // .then((ans) => {
            //     console.log(ans);
            //     if (ans.prediction === "phishing") {
            //         chrome.action.setBadgeText({
            //             text: "Risk",
            //         });
            //         chrome.action.setBadgeBackgroundColor({
            //             color: [255, 0, 0, 255] // Set the color to red
            //         });
            //     }
            //     else {
            //         chrome.action.setBadgeText({
            //             text: "Safe",
            //         });
            //         chrome.action.setBadgeBackgroundColor({
            //             color: [0, 128, 0, 255] // Set the color to green
            //         });
            //     }
            // });

            const json = await response.json();
            console.log(json);

            // await chrome.browserAction.openPopup();

            // Getting the URL
            const URL = changeInfo.url;












            // Manipulating it
            const URLSplitArray = URL.split('/');



            // Defining the final features
            const length_url = URL.length;
            const length_hostname = URLSplitArray[2]
            // console.log(length_url);

            console.log("New URL loaded:", URL);
        }
    });
});