
Xpensio is a React Native app that aims to help people keep track of their expenses. It was inspired by the prevailing cost of living crisis in our economy, and we thought it would be a great way to empower people to keep track of their everyday spending and improve their financial health. 

Users can add expenses, scan their receipts, and get a detailed breakdown of their spending through our analysis charts and maps. 

__________________________________________________________________________________

How to Run Xpensio Locally

You will need an Android Device or an emulator, such as provided by Android Studio, to run Xpensio;

✔️ 1. CLONE THE REPO

GitHub

Terminal Commands:

$ git clone https://github.com/zamarz/expense-tracker
$ cd expense-tracker
$ code .

✔️ 2. INSTALL DEPENDENCIES

![image](https://github.com/zamarz/expense-tracker/assets/77305766/ff6e8570-bf72-4138-ae6a-99f51f560e95)


$ npm install

✔️ 3. FIREBASE
Firebase

Follow the steps outlined in the official documentation to set up your own connection to Firebase.

✔️ 4. USAGE

NPM Expo

Start your local server with:

expo start

In the CLI, a prompt will appear to go to http://localhost:19002. 

From the page it opens on, you can select to connect via tunnel. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app. You will be prompted to install Expo Go if you do not already have it on your phone.

Node.js and Expo
NodeJS Expo

This project was created using:

$ node -v | v19.4.0
$ expo -v | 49.0.11

The above commands will also enable you to check your own versions in the terminal. At the time of writing, Expo is not compatible with Node versions later than 18.0.0.

If you have a later version of Node running on your computer, you can alter this:

$ nvm use 18.0

If you do not have this version installed, NVM will prompt you to install it and then rerun the above command.


XPensio

Xpensio is a team comprised of Zach Marzouk, Isabel Popa, Sunil Krishna Yelamanchili, Pedro Ferreira and Beth Hughes.
