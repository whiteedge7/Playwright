import {Page} from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract init(): Promise<this>;
}


export type Open = <T extends BasePage>(type: {
    new (page: Page): T;
  }) => Promise<T>;
  
export const openFactory =
    (page: Page) =>
      async <T extends BasePage>(type: {new (page: Page): T}): Promise<T> =>
        await new type(page).init();
