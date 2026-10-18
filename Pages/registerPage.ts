import { Page, expect } from "@playwright/test";
import { userData } from "../userdata/userData";

export class RegisterPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickTheSignInBtn() {
        const signInLink = this.page.locator('[data-test="nav-sign-in"]');
        await signInLink.click();
    }

    async clickTheRegisterLink() {
        const registerLink = this.page.locator('[data-test="register-link"]');
        await registerLink.click();
        await expect(this.page).toHaveURL(/auth\/register/);
    }

    async enterRegistrationDetails() {
        const firstNameInput = this.page.locator('[data-test="first-name"]');
        await firstNameInput.clear();
        await firstNameInput.fill(userData.firstName);

        const lastNameInput = this.page.locator('[data-test="last-name"]');
        await lastNameInput.clear();
        await lastNameInput.fill(userData.lastName);

        const dobInput = this.page.locator('[data-test="dob"]');
        await dobInput.clear();
        await dobInput.fill(userData.dob);

        const countryDropdown = this.page.locator('[data-test="country"]');
        await countryDropdown.selectOption(userData.country);

        const postalCodeInput = this.page.locator('[data-test="postal_code"]');
        await postalCodeInput.clear();
        await postalCodeInput.fill(userData.postalCode);

        const houseNumberInput = this.page.locator('[data-test="house_number"]');
        await houseNumberInput.clear();
        await houseNumberInput.fill(userData.houseNumber);

        const streetInput = this.page.locator('[data-test="street"]');
        await streetInput.clear();
        await streetInput.fill(userData.street);

        const cityInput = this.page.locator('[data-test="city"]');
        await cityInput.clear();
        await cityInput.fill(userData.city);

        const stateInput = this.page.locator('[data-test="state"]');
        await stateInput.clear();
        await stateInput.fill(userData.state);

        const phoneInput = this.page.locator('[data-test="phone"]');
        await phoneInput.clear();
        await phoneInput.fill(userData.phone);

        const emailInput = this.page.locator('[data-test="email"]');
        await emailInput.clear();
        await emailInput.fill(userData.email);

        const passwordInput = this.page.locator('[data-test="password"]');
        await passwordInput.clear();
        await passwordInput.fill(userData.password);
    }

    async clickTheRegisterBtn() {
        const registerBtn = this.page.locator('[data-test="register-submit"]');
        await registerBtn.click();
    }

    async verifyRegistrationSuccess() {
        await this.page.waitForURL(/auth\/login/);
        const loginHeading = this.page.getByRole('heading', { name: 'Login' });
        await expect(loginHeading).toBeVisible();
    }

    async verifyRequiredFieldErrors() {
        
        await expect(this.page).toHaveURL(/auth\/register/);
        const firstNameError = this.page.locator('[data-test="first-name-error"]');
        await expect(firstNameError).toBeVisible();
    }
        async clearField(dataTest: string) {
        const field = this.page.locator('[data-test="' + dataTest + '"]');
        await field.clear();
    }

    async verifyFieldError(dataTest: string) {
        await expect(this.page).toHaveURL(/auth\/register/);
        const error = this.page.locator('[data-test="' + dataTest + '-error"]');
        await expect(error).toBeVisible();
    }

        async enterDateOfBirth(dob: string) {
        const dobInput = this.page.locator('[data-test="dob"]');
        await dobInput.clear();
        await dobInput.fill(dob);
        
    }

     async Under18Birthday(dob: string) {
        const dobInput =  this.page.locator('[data-test="dob"]');
        await dobInput.clear();
        await dobInput.fill(dob);


     }
    async verifyUnder18Error() {
        await expect(this.page).toHaveURL(/auth\/register/);
        const ageError = this.page.getByText("Customer must be 18 years old");
        await expect(ageError).toBeVisible();
    }


    async invalidEmailformat(email: string) {
        const emailInput = this.page.locator('[data-test="email"]');
        await emailInput.clear();
        await emailInput.fill(email);
    }

    async verifyInvalidEmailFormat() {
        await expect(this.page).toHaveURL(/auth\/register/);
        const emailError = this.page.getByText("Email format is invalid");
        await expect(emailError).toBeVisible();
    }

    async enterExcistingEmail(email: string) {
        const emailInput = this.page.locator('[data-test="email"]');
        await emailInput.clear();
        await emailInput.fill(email);
    }

    async verifyDuplicateEmailError() {
        await expect(this.page).toHaveURL(/auth\/register/);
        const duplicateError = this.page.getByText("A customer with this email address already exists");
        await expect(duplicateError).toBeVisible();
    }

        async enterPassword(password: string) {
        const passwordInput = this.page.locator('[data-test="password"]');
        await passwordInput.clear();
        await passwordInput.fill(password);
    }

    async verifyPasswordRejected() {
        await expect(this.page).toHaveURL(/auth\/register/);
        const passwordError = this.page.locator('[data-test="password-error"]');
        await expect(passwordError).toBeVisible();
    }

        async enterPhone(phone: string) {
        const phoneInput = this.page.locator('[data-test="phone"]');
        await phoneInput.clear();
        await phoneInput.fill(phone);
    }

    async verifyPhoneRejected() {
        await expect(this.page).toHaveURL(/auth\/register/);
        const phoneError = this.page.locator('[data-test="phone-error"]');
        await expect(phoneError).toBeVisible();
    }
   
}