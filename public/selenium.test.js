const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Configure Chrome WebDriver
const options = new chrome.Options();
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function runTest() {
  try {
    await driver.get('http://localhost:3000/static/index.html');

    const usernameInput = await driver.findElement(By.id('username'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));

    // Assert that the inputs are mounted
    assert(await usernameInput.isDisplayed(), 'Username input is not displayed');
    assert(await passwordInput.isDisplayed(), 'Password input is not displayed');

    // Enter login credentials
    await usernameInput.sendKeys('user1');
    await passwordInput.sendKeys('password1');

    // Assert that the form is posted to the correct URL
    const form = await driver.findElement(By.id('loginForm'));
    
    const formAction = await form.getAttribute('action')
    const formMethod = await form.getAttribute('method')

    // checking if form attributes are correct.
    assert.strictEqual(formAction, 'http://localhost:3000/login', 'Form is not posted to the expected endpoint');
    assert.strictEqual(formMethod, 'post', 'Form is not posted to the expected endpoint');

    // Submit the form by clicking the login button
    await loginButton.click();

    // Wait for the response or perform assertions
    await driver.wait(until.urlIs('http://localhost:3000/login'), 5000);

    console.log('All assertions passed!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    
  } finally {
    await driver.quit();
    
  }
}

runTest();
