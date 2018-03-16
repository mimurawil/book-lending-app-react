# Book Lending App (ReactJs)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the most recent version on how to perform common tasks in the guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

This repo is part of the tiny project/demo/portfolio for a **Super Simple Book Lending App**.

It is responsible for creating the graphical user interface, managing the API calls, and control user access in each action (borrow, reserve, return).

## How to install
Assuming you already have [Create React App](https://github.com/facebookincubator/create-react-app), the following steps will explain how to install this project on your machine.

1. Clone this repo
2. Install the dependent modules
3. Open the file `src/components/dialogs/LoginDialog.js` and update the **urls** of the API call in the methods **handleLogin** and **handleRegister** to the one you created installing the repo [book-lending-app-auth](https://github.com/mimurawil/book-lending-app-auth).
4. Open the file `src/components/dialogs/ItemDetailDialog.js` and update the **url** of the API call in the method **callAPI**
    1. **Don't paste the entire url. This method is dynamically taking the last two path parameters, the first one is the utility (reservations/lendings/returnings), and the second one is  the id of the book.**
5. Open the file `src/components/AppContent.js` and update the **url** of the API call in the method **fetchAllBooks**
6. To execute in local mode run `npm start`.

## How to uninstall
Just delete the entire folder.
