import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";

export class ForgotPasswordPage extends BasePage {
  async init(): Promise<this> {
    // optional: wait for login form to load
    await this.page.waitForURL('**/requestPasswordResetCode');
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('input[name="username"]').fill(username);
    return this;
  }

  async clickResetPassword(): Promise<this> {
    await this.page.getByRole('button', { name: 'Reset Password' }).click();
    return this;
  }

  async clickCancel(): Promise<LoginPage> {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    return new LoginPage(this.page).init();
  }

  async getTitle(): Promise<string> {
    return await this.page.locator('h6').innerText();
  }
}