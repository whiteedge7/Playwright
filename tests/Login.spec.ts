import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';

test.describe('Login & Logout Tests', () => {

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL!);
});

test('Valid login test', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername(process.env.web_username!);
  await loginPage.fillPassword(process.env.web_password!);
  await loginPage.clickLoginButton();
  await expect(page.locator('h6')).toContainText('Dashboard');
});

test('validate successful login [fluent example]', async ({page}) => {
  const ProfPic = await new LoginPage(page)
      .fillUsername(process.env.web_username!)
      .then(_=>_.fillPassword(process.env.web_password!))
      .then(_=>_.clickLoginButton())
      .then(_=>_.getUserPP());
  expect(ProfPic).toBe(true);
});


test('validate successful logout', async ({page}) => {
  const Title = await new LoginPage(page)
      .loginToWebsite()
      .then(_=>_.openUserDropdown())
      .then(_=>_.clickLogout())
      .then(_=>_.getTitle())
  expect(Title).toBe('Login');
})});