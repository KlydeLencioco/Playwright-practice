# Playwright-practice

This repository contains a test automation project for SauceDemo, a website to practice test automation. The project utilizes Playwright, a powerful end-to-end testing framework.

## Installation
To set up and run the this test automation project, please follow the steps below:

1. Prerequisites:
- Ensure that Node.js is installed on your machine. You can download it from the official Node.js website: https://nodejs.org/

2. Clone the repository:

    ```console
    git clone <repository-url>
    ```

3. Navigate to the project directory:

    ```console
    cd Playwright-practice
    ```

4. Install project dependencies:

    ```console
    npm install
    ```

## Running Tests
There are several ways to run this test automation project using the Playwright runner:

1. Run in headless mode:

    ```console
    npx playwright test
    ```
    This will run the test in headless mode.

2. Run in headed mode:

    ```console
    npx playwright test --headed
    ```
    This will run the test in headed mode..

3. Using Playwright GUI:
    ```console
    npx playwright test --ui
    ```
    This will run the test in GUI mode. Then you can which spec file to run.
