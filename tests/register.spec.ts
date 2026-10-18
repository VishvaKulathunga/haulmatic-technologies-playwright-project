import { test } from "@playwright/test";
import { RegisterPage } from "../Pages/registerPage";
import { userData } from "../userdata/userData";

test.describe("User Registration", () => {

    test("TC_REG_01 - Register with all valid data", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto("https://practicesoftwaretesting.com/");
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();
        await registerPage.enterRegistrationDetails();
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyRegistrationSuccess();
    });

    test("TC_REG_02 - Register with all fields blank", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto("https://practicesoftwaretesting.com/");
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyRequiredFieldErrors();
    });

    const requiredFields = [
        { name: "First name",    dataTest: "first-name" },
        { name: "Last name",     dataTest: "last-name" },
        { name: "Date of birth", dataTest: "dob" },
        { name: "Postal code",   dataTest: "postal_code" },
        { name: "House number",  dataTest: "house_number" },
        { name: "Phone",         dataTest: "phone" },
        { name: "Email",         dataTest: "email" },
        { name: "Password",      dataTest: "password" },
    ];

    for (const field of requiredFields) {
        test("TC_REG_03 - " + field.name + " left blank", async ({ page }) => {
            const registerPage = new RegisterPage(page);

            await page.goto("https://practicesoftwaretesting.com/");
            await registerPage.clickTheSignInBtn();
            await registerPage.clickTheRegisterLink();
            await registerPage.enterRegistrationDetails();
            await registerPage.clearField(field.dataTest);
            await registerPage.clickTheRegisterBtn();
            await registerPage.verifyFieldError(field.dataTest);
        });
    }

    test("TC_REG_04 - Register with a future date of birth", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto("https://practicesoftwaretesting.com/");
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();
        await registerPage.enterRegistrationDetails();
        await registerPage.enterDateOfBirth(userData.futureDob);   
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyUnder18Error();
    });

    test("TC_REG_05 - Register with a low date of birth", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto("https://practicesoftwaretesting.com/");
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();
        await registerPage.enterRegistrationDetails();
        await registerPage.Under18Birthday(userData.notAdultDob);   
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyUnder18Error();
    });

    test("TC_REG_06 - Register with an invalid email format", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto("https://practicesoftwaretesting.com/");
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();
        await registerPage.enterRegistrationDetails();
        await registerPage.invalidEmailformat(userData.invalidFormatEmail);
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyInvalidEmailFormat();
    });

    test("TC_REG_07 - Register with an already registered email", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await page.goto("https://practicesoftwaretesting.com/");
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();
        await registerPage.enterRegistrationDetails();
        await registerPage.enterExcistingEmail(userData.existingEmail);
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyDuplicateEmailError();
    });

            const passwordTests = [
        { id: "TC_REG_08", name: "7 characters",         password: "Ab@1xyz",   shouldPass: false },
        { id: "TC_REG_09", name: "no uppercase letter",  password: "test@1234", shouldPass: false },
        { id: "TC_REG_10", name: "no number",            password: "Test@abcd", shouldPass: false },
        { id: "TC_REG_11", name: "no special symbol",    password: "Test12345", shouldPass: false },
        { id: "TC_REG_12", name: "exactly 8 characters", password: "Ab@1xyzw",  shouldPass: true },
    ];

    for (const item of passwordTests) {
        test(item.id + " - Password with " + item.name, async ({ page }) => {
            const registerPage = new RegisterPage(page);

            await page.goto("https://practicesoftwaretesting.com/");
            await registerPage.clickTheSignInBtn();
            await registerPage.clickTheRegisterLink();
            await registerPage.enterRegistrationDetails();
            await registerPage.enterPassword(item.password);
            await registerPage.clickTheRegisterBtn();

            if (item.shouldPass) {
                await registerPage.verifyRegistrationSuccess();
            } else {
                await registerPage.verifyPasswordRejected();
            }
        });

        
    }

        const phoneTests = [
        { id: "TC_REG_15", name: "letters in the phone number",    phone: "abcdefghij" },
        { id: "TC_REG_18", name: "more than 10 digits in the phone number", phone: "077123456789" },
    ];

    for (const item of phoneTests) {
        test(item.id + " - " + item.name, async ({ page }) => {
            const registerPage = new RegisterPage(page);

            await page.goto("https://practicesoftwaretesting.com/");
            await registerPage.clickTheSignInBtn();
            await registerPage.clickTheRegisterLink();
            await registerPage.enterRegistrationDetails();
            await registerPage.enterPhone(item.phone);
            await registerPage.clickTheRegisterBtn();
            await registerPage.verifyPhoneRejected();
        });
    }
});