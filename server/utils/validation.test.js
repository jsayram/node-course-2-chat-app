const expect = require('expect');


//import isRealString
const {isRealString} = require('./validation.js')



describe('#isRealString', ()=> {
	it('should reject non-string values',()=>{
		var nonString = 20;
		var res = isRealString(nonString);
		expect(res).toBe(false);
	});

	it('should reject strings with only spaces',()=>{
		var strWithOnlySpaces = '   ';
		var res = isRealString(strWithOnlySpaces);
		expect(res).toBe(false);
	});

	it('should allow strings with non-space characters',()=>{
		var str = '    aaad. ';
		var res = isRealString(str);
		expect(res).toBe(true);
	});
});
