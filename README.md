This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

## Login

`test@mail.ru`

## Password

`TestPassword123_`

### Description

SPA must contain the following elements:

1. Login form with field validation (email verification, password verification (at least 7 characters containing only latin upper and lower case letters and numbers, but without special characters).
2. The "Currency Rates" tab with the ability to add any currency pair / s to your "Favorites". Such a currency pair / s should get to the top of the list in rial time.
3. The "Converter" tab with the ability to calculate how much of one currency you can buy for another.
4. The "History" tab according to the criteria specified below.
      At the entrance gets 50 deals. 50 need to be broken down into dozens. In every ten should be:
      - no more than 2 losing trades;
      - deals are sorted by closing date and time (at the top the closest deal is to the current date and time, and so on)
      - at least 1-2 transactions with profitability of more than \$ 100
      - no more than two identical assets
   The application should be responsive and have the maximum speed (both when downloading the application, and when converting currencies).
   At the end, you need to write how much time it took to complete this test task.

The attached TEST SPA app.psd file contains the design, and the SPA-test.API.pdf contains the description of the API and test user for checking the login.
API URL for sending requests http://35.195.25.70/api.php
