import { DashboardPage, ForgotPasswordPage } from '.';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async init(): Promise<this> {
    await this.page.waitForSelector('input[name="username"]');
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('input[name="username"]').fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.page.locator('input[name="password"]').fill(password);
    return this;
  }

  async clickLoginButton(): Promise<DashboardPage> {
    await this.page.getByRole('button', { name: 'Login' }).click();
    return new DashboardPage(this.page);
  }

  async loginToWebsite(): Promise<DashboardPage> {
    await this.fillUsername(process.env.web_username!);
    await this.fillPassword(process.env.web_password!);
    await this.clickLoginButton();
    return new DashboardPage(this.page).init();
  }

  async getTitle(): Promise<string> {
    return await this.page.locator('h5').innerText();
  }

  async clickForgotPassword(): Promise<ForgotPasswordPage> {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.orangehrm-login-forgot-header').click();
    return new ForgotPasswordPage(this.page).init();
  }
}
