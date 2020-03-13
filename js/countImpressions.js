/**
 * @Author: Jack Woods
 * @Date:   2020-03-13T12:46:11-07:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: countImpressions.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2020-03-13T13:00:18-07:00
 */

/*
 * This script counts button impressions on the sustainability kiosks by firing
 * an AJAX API call before retirecting the user to the href target.
 * A lambda function makes a database entry for each request, with date/time and
 * other meta information.
 */

let buttons = document.getElementsByClassName('myBtn');
Object.keys(buttons).forEach(key => {
  buttons[key].addEventListener('click', e => {
    let buttonText = e.target.textContent;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.sustainability.oregonstate.edu/v2/kiosks/impression?buttonText=' + encodeURI(buttonText));
    request.send();
    request.onload = () => {
      if (request.status == 200) {
        window.location = e.target.getAttribute('ref');
      } else {
        console.log("Error: " + e.target.getAttribute('ref'));
      }
    }
  })
})
