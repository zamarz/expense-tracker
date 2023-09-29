
**Xpensio**

Xpensio is a React Native app that aims to help people keep track of their expenses. It was inspired by the prevailing cost of living crisis in our economy, and we thought it would be a great way to empower people to keep track of their everyday spending and improve their financial health. 

Users can add expenses, scan their receipts, and get a detailed breakdown of their spending through our analysis charts and maps. 

__________________________________________________________________________________

How to Run Xpensio Locally

You will need an Android Device or an emulator, such as provided by Android Studio, to run Xpensio;

✔️ **1. CLONE THE REPO**

![image](https://github.com/zamarz/expense-tracker/assets/77305766/b46c0ca6-7276-4e9e-a578-0d8533292371)

Terminal Commands:

```
$ git clone https://github.com/zamarz/expense-tracker
$ cd expense-tracker
$ code .
```


✔️ **2. INSTALL DEPENDENCIES**

![image](https://github.com/zamarz/expense-tracker/assets/77305766/ff6e8570-bf72-4138-ae6a-99f51f560e95)

```
$ npm install
```


✔️ **3. FIREBASE**

![image](https://github.com/zamarz/expense-tracker/assets/77305766/4e48575b-1323-4bd8-9b91-7c1e7901fe28)


Follow the steps outlined in the official documentation to set up your own connection to Firebase.

✔️ **4. USAGE**

![image](https://github.com/zamarz/expense-tracker/assets/77305766/cc554db3-6a69-482a-aab7-6535f99cfc6e)   ![image](https://github.com/zamarz/expense-tracker/assets/77305766/f0cc3c3c-9b9e-4584-9779-b0f6903be2d9)



Start your local server with:

```
expo start
```

In the CLI, a prompt will appear to go to http://localhost:19002. 

From the page it opens on, you can select to connect via tunnel. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app. You will be prompted to install Expo Go if you do not already have it on your phone.

**Node.js and Expo**

![image](https://github.com/zamarz/expense-tracker/assets/77305766/a754f00e-ebf4-4739-8fb6-416575562b97)  ![image](https://github.com/zamarz/expense-tracker/assets/77305766/c2c8f10b-a116-4162-a57a-16e5ac45c044)


This project was created using:

```
$ node -v | v19.4.0
$ expo -v | 49.0.11
```

The above commands will also enable you to check your own versions in the terminal. At the time of writing, Expo is not compatible with Node versions later than 18.0.0.

If you have a later version of Node running on your computer, you can alter this with the following command:

```
$ nvm use 18.0
```

If you do not have this version installed, NVM will prompt you to install it and then rerun the above command.


**Xpensio**

Xpensio is a team comprised of Zach Marzouk, Isabel Popa, Pedro Ferreira, Sunil Krishna Yelamanchili and Beth Hughes.
