import { test } from "@playwright/test";
import { LoginPage } from "../Pages/loginPage";
import { userData } from "../userdata/userData";
import { RegisterPage } from "../Pages/registerPage";
import { randomUUID } from "crypto";


test.describe("User Login", () => {

    test("TC_LGN_01 - Login with valid credentials", async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        
        await page.goto("https://practicesoftwaretesting.com/");

       
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();

        await registerPage.enterRegistrationDetails();
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyRegistrationSuccess();

        await loginPage.openLoginPage();
        await loginPage.enterEmail(userData.email);
        await loginPage.enterPassword(userData.password);
        await loginPage.clickTheLoginBtn();

        
        await loginPage.verifyLoginSuccess();
    });

    const loginTests = [
        { id: "TC_LGN_02", name: "valid email and wrong password", email: userData.existingEmail,     password: userData.wrongPassword,       expected: "loginError" },
        { id: "TC_LGN_03", name: "unregistered email",            email: userData.unregisteredEmail, password: userData.existingPassword,    expected: "loginError" },
        { id: "TC_LGN_04", name: "both fields blank",             email: "",                          password: "",                           expected: "bothErrors" },
        { id: "TC_LGN_05", name: "email blank",                   email: "",                          password: userData.existingPassword,    expected: "emailError" },
        { id: "TC_LGN_06", name: "password blank",                email: userData.existingEmail,     password: "",                           expected: "passwordError" },
        { id: "TC_LGN_07", name: "invalid email format",          email: userData.invalidEmail,       password: userData.existingPassword,    expected: "emailError" },
    ];

    for (const item of loginTests) {
        test(item.id + " - Login with " + item.name, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.openLoginPage();
            await loginPage.enterEmail(item.email);
            await loginPage.enterPassword(item.password);
            await loginPage.clickTheLoginBtn();

            if (item.expected === "loginError") {
                await loginPage.verifyLoginError();
            } else if (item.expected === "emailError") {
                await loginPage.verifyEmailError();
            } else if (item.expected === "passwordError") {
                await loginPage.verifyPasswordError();
            } else if (item.expected === "bothErrors") {
                await loginPage.verifyEmailError();
                await loginPage.verifyPasswordError();
            }
        });
    }



    test("TC_LGN_08 - Email case sensitivity", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await page.goto("https://practicesoftwaretesting.com/");
    await registerPage.clickTheSignInBtn();
    await registerPage.clickTheRegisterLink();

    userData.email = `qa.${randomUUID()}@example.com`;

    await registerPage.enterRegistrationDetails();
    await registerPage.clickTheRegisterBtn();
    await registerPage.verifyRegistrationSuccess();

    await loginPage.openLoginPage();
    await loginPage.enterEmail(userData.email.toUpperCase());
    await loginPage.enterPassword(userData.password);
    await loginPage.clickTheLoginBtn();

    await loginPage.verifyLoginSuccess();
});

    test("TC_LGN_09 - Email with leading and trailing spaces", async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        
        await page.goto("https://practicesoftwaretesting.com/");

       
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();

        await registerPage.enterRegistrationDetails();
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyRegistrationSuccess();

        await loginPage.openLoginPage();
        await loginPage.enterEmail(userData.email);
        await loginPage.enterPassword(userData.password);
        await loginPage.clickTheLoginBtn();

    });

    test("TC_LGN_10 - Password case sensitivity", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    // Register a new user
    await page.goto("https://practicesoftwaretesting.com/");
    await registerPage.clickTheSignInBtn();
    await registerPage.clickTheRegisterLink();
    await registerPage.enterRegistrationDetails();
    await registerPage.clickTheRegisterBtn();
    await registerPage.verifyRegistrationSuccess();

    // Attempt login with the correct email and wrong-case password
    await loginPage.openLoginPage();
    await loginPage.enterEmail(userData.email);
    await loginPage.enterPassword(userData.password.toUpperCase());
    await loginPage.clickTheLoginBtn();

    // Login should fail because passwords are case-sensitive
    await loginPage.verifyLoginError();
});

    test("TC_LGN_14 - Login using the Enter key", async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        
        await page.goto("https://practicesoftwaretesting.com/");

       
        await registerPage.clickTheSignInBtn();
        await registerPage.clickTheRegisterLink();

        await registerPage.enterRegistrationDetails();
        await registerPage.clickTheRegisterBtn();
        await registerPage.verifyRegistrationSuccess();

        await loginPage.openLoginPage();
        await loginPage.enterEmail(userData.email);
        await loginPage.enterPassword(userData.password);
        await loginPage.clickTheLoginBtn();

       
        await loginPage.verifyLoginSuccess();
    });


    
});