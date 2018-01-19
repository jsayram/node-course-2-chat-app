const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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


describe('genrateLocationMessage', ()=>{
	it('should generate correct location object', ()=>{
		var from = "JoseRamirez";
		var latitude = 15
		var longitude = 19
		var url = `https://www.google.com/maps?q=15,19`;

		var res = generateLocationMessage(from,latitude,longitude);

		/* ONE WAY OF DOING THE TEST */
		// expect(res.from).toEqual('JoseRamirez');
		// expect(res.url).toEqual(url);
		// expect(typeof(res.createdAt)).toBe('number');

		/* SECOND WAY OF DOING THE SAME THING AS ABOVE */
		   expect(res.createdAt).toBeA('number');
		   expect(res).toInclude({from, url});
	});
});