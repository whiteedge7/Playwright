import {LoginPage } from '.';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  async init(): Promise<this> {
    await this.page.waitForSelector('.oxd-userdropdown-name');
    return this;
  }

  async getUserPP(): Promise<boolean> {
    const profilePic = this.page.locator('[alt="profile picture"]').nth(0);
    await profilePic.waitFor({ state: 'visible' });
    return await profilePic.isVisible();
  }

  async openUserDropdown(): Promise<this> {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.oxd-userdropdown-name').click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.page.locator('[role=\"menuitem\"]', { hasText: 'Logout' }).click();
    return new LoginPage(this.page).init();
  }
}
