const expect = require('expect');

const {
    isRealString 
    } = require ('../utils/validators.js');

describe ('isRealString', () =>
{
    var testValues = [
	'', 200,
	'    ',
	' assana   ', '  elmo is great  '
    ];

    var i = 0;
    it('should reject non-sting values', () => {
	var result = isRealString (testValues[i++]);
	expect (result).toBe (false);
	result = isRealString (testValues[i++]);
	expect (result).toBe (false);
    });

    it('should reject sting with only spaces', () => {
	var result = isRealString (testValues[i++]);
	expect (result).toBe (false);
    });

    it('should allow sting with non-space characters', () => {
	var result = isRealString (testValues[i++]);
	expect (result).toBe (true);
    });
});

