const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

        //1.Setting the address
        it('should set the address', async () => {
            await browser.url('/')
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            const fromField = $(page.fromField);
            await fromField.getValue();
            const toField = $(page.toField);
            await toField.getValue();
            await expect(fromField).toHaveValue('East 2nd Street, 601');
            await expect(toField).toHaveValue('1300 1st St');
        })
    })

    //2.Selecting Supportive plan  
    it('should select supportive plan', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const callATaxiButton = await $(page.callATaxiButton);
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
        await expect(supportivePlan).toBeDisplayed();

    })

    //3.Filling in the phone number
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(helper.getElementByText(phoneNumber)).toBeExisting();
    })

    //4.Adding a credit card
    it('should add credit card', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const paymentMethod = $('.pp-text');
        await paymentMethod.click();
        const paymentMethodModal = $(page.paymentMethodModal);
        await expect(paymentMethodModal).toBeExisting();
        const addCardButton = await $(page.addCardButton)
        await addCardButton.click();
        const cardNumberInput = await $(page.cardNumberInput);
        await cardNumberInput.setValue('123400004321')
        const cvvCode = await $(page.cvvCode);
        await cvvCode.setValue('12');
        await expect(cardNumberInput).toHaveValue('123400004321');
        await expect(cvvCode).toHaveValue('12');
        const linkButton = await $(page.linkButton);
        await linkButton.click();
    })

    //5.Writing a message for the driver
    it('should write message for driver', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const driverMessage = await $(page.driverMessage);
        await driverMessage.setValue('Hello driver');
        const message = await driverMessage.getValue();
        await expect(message).toBe('Hello driver');
    })

    //6.Ordering a blanket and hankerchiefs
    it('should order a blanket and hankerchiefs', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.click();
        const blanketButton = await $(page.blanketButton);
        await blanketButton.click();
        const blanketCheckButton = await $(page.blanketCheckButton)
        await expect(blanketCheckButton).toBeChecked();
    })

    //7.Ordering 2 ice creams
    it('should order 2 ice creams', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.click();
        const iceCreamPlus = await $(page.iceCreamPlus);
        await iceCreamPlus.click();
        await iceCreamPlus.click();
        const iceCreamCounter = await $(page.iceCreamCounter);
        const iceCreamNumber = await iceCreamCounter.getText();
        await expect(iceCreamNumber).toBe('2')

    })

    //8.The car search modal appears
    it('car search modal should appear', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St')
        const orderButton = await $(page.orderButton);
        await orderButton.click();
        const orderBody = await $(page.orderBody);
        await expect(orderBody).toBeExisting();
    })
      
