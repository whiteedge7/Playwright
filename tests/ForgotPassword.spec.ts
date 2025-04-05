import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';

test.describe('Forgot Password Tests', () => {

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL!);
});

test.only('Validate Forgot Password process', async ({page}) => {
    const PageTitle = await new LoginPage(page)
    .clickForgotPassword()
    .then(_=>_.fillUsername('abc123'))
    .then(_=>_.clickResetPassword())
    .then(_=>_.getTitle());
expect(PageTitle).toBe('Reset Password link sent successfully');
});
})