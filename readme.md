<p align="center"><img src="https://github.com/jgrantprog1993/project_PWA_test1/blob/main/public/images/playstore.png"  width="20%" height="10%"></p>

# Title: Loyalty App 


## Description
This project is a prototype of a loyalty rewards progressive web application (PWA), which uses a CMS to manage the backend. The app benefits both consumer and business.
The consumer can search for a nearby business, checkout the Opening hours, gain loyalty points from there and store them via the app.
The business can promoter their store via special offers, and gets insights from the number of user interactions i.e.

## Associated Back End Proj. 
https://github.com/jgrantprog1993/project_loyaltyApp_backend
## Getting Started
First open the link above and run the backend server.
Open your terminal and then type (This clones the repo)<br/>
`git clone {the url to the GitHub repo}`

cd into the new folder and type<br/>
`npm install`

This installs the required dependencies.
To run project.<br/>
`npm start`


## Technologies
This project uses technologies such as:
- Next.js
- Tailwind
- react-qr-reader
- Strapi v4
- chart.js
- LeafLet.js
- Font Awesome
- Toastify

## UI
The UI was developed in Tailwind, the below image is a taste of the general style that the project was developed in.
The app is fully responsive and has different navigation headers depending on what the size of the screen is.

![alt text](https://github.com/jgrantprog1993/project_PWA_test1/blob/dev_finalUpdates/public/images/12430732.jpg)

Most of the images are inspired from my love of coffee !
## Scope of functionalities 
The functionalites are broken into two categories:
- Consumer
- Business

### In short summary Consumer can:
- Register / Login
- View Offers
- View Business Details incl. Location, Descrip, Opening Hours
- Scan QRCode in business to gain loyalty points
- View Loyalty Points Gain
- Redeem loyalty Points for Reward
- etc

### In short summary Business can:
- Register / Login
- Create, Read, Update, Delete Locations
- Create, Read, Update, Delete Offers
- View Dashboard for the business
- View user Profile Info
- etc

'Admin' logs directly into the backend on the backend project to update from there.

## Project status 
- Phase 1 Prototype - ✅
- Phase 2 Prototype - ⬜️ (To be started soon)
- https://github.com/jgrantprog1993/project_loyaltyApp/issues I would love If others could contribute ! Lets grow this together.
- I have started to create an issue log with possible updates that can be completed by contributers, why not have a look and have a go !
- What do you think should be included in Phase 2? I would love to hear your ideas.
## References
Common Header in Next.js -> https://stackoverflow.com/questions/57918626/have-a-common-header-layout-in-nextjs <br />
Router -> https://nextjs.org/docs/api-reference/next/router <br />
tailwind radio buttonss -> https://flowbite.com/docs/forms/radio/ <br />
Tailwind reference -> https://flowbite.com/docs/ <br />
Auto Slug in Stripe v4 -> https://strapi.io/blog/how-to-create-a-slug-system-in-strapi-v4 <br />
Create a slug system with Strapi v4 -> https://dev.to/elchiconube/create-a-slug-system-with-strapi-v4-1abm <br />
Strapi v4 Crash Course -> https://www.youtube.com/watch?v=vcopLqUq594&t=4336s <br />
Cannot set headers after they are sent to the client  -> https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client<br />
Strapi v4 Register new users -> https://www.youtube.com/watch?v=sVrUk3zaaqQ
Enabling the Microphone/Camera in Chrome for (Local) Unsecure Origins -> https://medium.com/@Carmichaelize/enabling-the-microphone-camera-in-chrome-for-local-unsecure-origins-9c90c3149339#:~:text=Chrome's%20security%20policy%20will%20only,(for%20when%20in%20development).
QRCode scanner -> https://github.com/Musawirkhann/react_qrcode_generation_scanner/blob/main/src/App.js
-> https://github.com/react-qr-reader/react-qr-reader
QRScanner overlay on camera -> https://github.com/react-qr-reader/react-qr-reader/issues/265
Strapi v4 update Entry -> https://docs.strapi.io/dev-docs/plugins/i18n#updating-an-entry
Strapi v4 issue with put -> https://stackoverflow.com/questions/71187083/problem-with-post-action-on-strapi-via-postman
https://forum.strapi.io/t/post-url-is-not-working/18749
How to count certain elements in array? -> https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array
Charts & Graphs -> Chart.js https://www.chartjs.org/
Demo -> https://codesandbox.io/s/l6qs1
How to count certain elements in array? -> https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array
Grouping dates in JSON -> https://stackoverflow.com/questions/62654005/transform-json-by-grouping-by-date-and-thereafter-by-datetime-in-nodejs
STRAPI - How to count in REST API V4 -> https://forum.strapi.io/t/how-to-count-in-rest-api-in-v4/14765/2
STRAPI - Issues with photo upload -> https://stackoverflow.com/questions/74798548/strapi-upload-files-to-a-specific-media-library-folder-using-strapi-upload-api