import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.openurl('https://login.microsoft.com');
        const username = process.env.username || "";
        const password = process.env.password || "";
        await LoginPage.loginMS(username, password)

        
    })
})
