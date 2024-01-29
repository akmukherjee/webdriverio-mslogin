import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }
    public get staySignedIn () {
        return $('input[type="submit"]');
    }

    public get staySignedInById () {
        return $('#acceptButton');
    }

    public get msinputUsername () {
        return $('#i0116');
    }

    public get msinputPassword () {
        return $('#i0118');
    }

    public get signInButton (){
        return $('#idSIButton9');
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public waitForPageLoad(): void {
        browser.waitUntil(
          () => browser.execute(
            () => document.readyState === 'complete'),
            {
              timeout: 60 * 1000, // 60 seconds
              timeoutMsg: 'Message on failure'
            }
          )
        
      }
    
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.signInButton.click()
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }



    public async loginMS (username: string, password: string) {
        await this.msinputUsername.waitForExist({timeout:3000});
        it('should detect msinputUsername is enabled', async () => {
            await this.msinputUsername.waitForEnabled({ timeout: 3000 });
        });
        await this.msinputUsername.setValue(username);
        
        it('should detect when signInButton is enabled', async () => {
            await this.signInButton.waitForEnabled({ timeout: 3000 });
        });
        await this.signInButton.click();
        console.log('Username Entered')

        //WAITING FOR PAGELOAD
        this.waitForPageLoad();
        await this.msinputPassword.waitForExist({timeout:5000});
        it('should detect msinputPassword is enabled', async () => {
            await this.msinputPassword.waitForEnabled({ timeout: 3000 });
        });
        await this.msinputPassword.setValue(password);
        it('browser should wait Password is populated', async () => {
            const elem = this.msinputPassword
            await browser.waitUntil(async function () {
              return (await elem.getValue()) === password
            }, {
              timeout: 5000,
              timeoutMsg: 'expected password to be set after 5s'
            })
          })

          
        await this.signInButton.waitForExist({timeout:3000});
        it('should detect when send Password is enabled', async () => {
            await this.signInButton.waitForEnabled({ timeout: 3000 });
        });
        console.log('PASSWORD: '+ await this.msinputPassword.getValue());
        await this.signInButton.click();
        console.log('Password Entered');

        this.waitForPageLoad();        
        //await this.staySignedInById.waitForExist({timeout:3000});
        //await this.staySignedInById.click();

        it('should detect when staySignedIn Button is enabled', async () => {
            await this.staySignedIn.waitForEnabled({ timeout: 3000 });
        });
        await this.staySignedIn.click()
        console.log('Stay SignedIn Button Clicked');
    }

    public async loginMS2 (username: string, password: string) {
        let res = null;
        try{
            
            res = [];
            res.push(await this.msinputUsername.waitForExist({timeout:3000}));
            res.push(await this.msinputUsername.setValue(username));
            res.push(await this.signInButton.click());
            console.log('Username Entered');

            res.push(await this.msinputPassword.waitForExist({timeout:5000}));
            res.push(await this.msinputPassword.setValue(password));
            res.push(await this.signInButton.waitForExist({timeout:3000}));
            res.push(await expect(this.signInButton).toBeDisplayed());
            res.push(await this.signInButton.click());
            console.log('Password Entered');

            res.push(await this.staySignedIn.click());
            console.log('Stay SignedIn Button Clicked');
        }catch(error){
            console.log(error)
        }

    }
    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('login');
    }
    public openurl (url: string) {
        return super.openurl(url);
    }
}

export default new LoginPage();
