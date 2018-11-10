const expect = require('expect');

const {generateMessage} = require ('../utils/message.js');

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
