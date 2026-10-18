import { Page, expect } from "@playwright/test";

export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openLoginPage() {
        await this.page.goto("https://practicesoftwaretesting.com/");
        const signInLink = this.page.locator('[data-test="nav-sign-in"]');
        await signInLink.click();
        await expect(this.page).toHaveURL(/auth\/login/);
    }

    async enterEmail(email: string) {
        const emailInput = this.page.locator('[data-test="email"]');
        await emailInput.clear();
        await emailInput.fill(email);
    }

    async enterPassword(password: string) {
        const passwordInput = this.page.locator('[data-test="password"]');
        await passwordInput.clear();
        await passwordInput.fill(password);
    }

    async clickTheLoginBtn() {
        const loginBtn = this.page.locator('[data-test="login-submit"]');
        await loginBtn.click();
        await this.page.waitForTimeout(1000);

    console.log("Current URL:", this.page.url());
    }

    async verifyLoginSuccess() {
         await expect(this.page).toHaveURL(/\/account\/?$/);

    const heading = this.page.getByRole('heading', {
        name: 'My account'
    });

    await expect(heading).toBeVisible();
    }

    async verifyLoginError() {
        await expect(this.page).toHaveURL(/auth\/login/);
        const loginError = this.page.locator('[data-test="login-error"]');
        await expect(loginError).toBeVisible();
    }

    async verifyEmailError() {
        await expect(this.page).toHaveURL(/auth\/login/);
        const emailError = this.page.locator('[data-test="email-error"]');
        await expect(emailError).toBeVisible();
    }

    async verifyPasswordError() {
        await expect(this.page).toHaveURL(/auth\/login/);
        const passwordError = this.page.locator('[data-test="password-error"]');
        await expect(passwordError).toBeVisible();
    }

        async pressEnterOnPassword() {
        const passwordInput = this.page.locator('[data-test="password"]');
        await passwordInput.press("Enter");
    }

    
}