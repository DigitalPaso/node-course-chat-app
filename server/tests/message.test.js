const expect = require('expect');

const {
    generateMessage, 
    generateLocationMessage} = require ('../utils/message.js');

describe ('generateMessage', () =>
{
    it('should generate a new message', () => {

	var testMessage = {
	    from: 'admin', text: 'welcome'
	}
	var message = generateMessage (testMessage.from, testMessage.text);
	expect (message.from).toBe (testMessage.from);
	expect (message.text).toBe (testMessage.text);
	// the above lines could be replaced with the following:
	expect (message).toMatchObject ({
	    from: testMessage.from,
	    text: testMessage.text
	});
	expect (message.createdAt).toBeTruthy();
	expect (typeof(message.createdAt)).toBe("number");
    });
});

describe ('generateLocationMessage', () =>
{
    it('should generate a correct location object', () => {

	var testMessage = {
	    from: 'admin', 
	    lat: 37.369509099999995,
	    long: -122.0332437
	}
	var message = generateLocationMessage (testMessage.from, testMessage.lat, testMessage.long);
	expect (message).toMatchObject ({
	    from: testMessage.from,
	    url:`https://www.google.com/maps?q=${testMessage.lat},${testMessage.long}`
	});
	expect (message.createdAt).toBeTruthy();
	expect (typeof(message.createdAt)).toBe("number");
    });
});
