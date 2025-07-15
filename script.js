// --- Tab switching logic ---
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}


// --- Mobile navigation menu logic ---
var nav = document.querySelector("nav");

function openmenu() {
    // Add 'menu-open' class to the nav element to show the menu
    if (nav) {
        nav.classList.add("menu-open");
    }
}

function closemenu() {
    // Remove 'menu-open' class from the nav element to hide the menu
    if (nav) {
        nav.classList.remove("menu-open");
    }
}


// --- Google Sheet form submission logic ---
const scriptURL = 'YOUR_NEW_GOOGLE_SCRIPT_URL_HERE'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            if (response.ok) {
                if (msg) {
                    msg.innerHTML = "Message sent successfully"
                    setTimeout(function(){
                        msg.innerHTML = ""
                    }, 5000)
                }
                form.reset()
            } else {
                response.text().then(text => {
                  console.error('Error from Google Script:', text)
                  if (msg) {
                    msg.innerHTML = "Error sending message."
                  }
                })
            }
        })
        .catch(error => {
            console.error('Error!', error.message)
            if (msg) {
                msg.innerHTML = "Error sending message."
            }
        })
    })
}