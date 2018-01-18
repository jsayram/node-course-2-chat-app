const expect = require('expect');

const {generateMessage} = require('./message');

describe('genrateMessage', ()=>{
	it('should generate correct message object', ()=>{
		var from = "JoseRamirez";
		var text = "I like Pizza"
		var res = generateMessage(from,text);

		/* ONE WAY OF DOING THE TEST */
		// expect(res.from).toEqual('JoseRamirez');
		// expect(res.text).toEqual('I like Pizza');
		// expect(typeof(res.createdAt)).toBe('number');


		/* SECOND WAY OF DOING THE SAME THING AS ABOVE */
		   expect(res.createdAt).toBeA('number');
		   expect(res).toInclude({from, text});



	});

});