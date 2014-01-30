describe('[parser.js]', function () {
	var factory;

	// ParserFactory
	// -------------------------
	describe('ParserFactory:', function () {
		beforeEach( function () {
			factory = new ParserFactory();
		});

		it('should be defined', function () {
			expect(ParserFactory).toBeDefined();
			expect(typeof ParserFactory).toEqual( 'function' );
		});

		it('should be possible to create a factory instance', function () {
			expect(factory).toBeDefined();
		});

		it('should have a function to create a new parser', function () {
			expect(typeof factory.createParser).toEqual( 'function' );
		});

		it('should create a parser', function () {
			var parser = factory.createParser();
			expect(parser.constructor.name).toBe( 'Parser' );
		});
	});


	// Parser
	// -------------------------
	describe('Parser', function () {
		var parser;

		beforeEach( function () {
			parser = factory.createParser();
		});

		it('should have a function to parse HTML to markdown', function () {
			expect(typeof parser.fromHTML).toEqual( 'function' );
		});


		// Parse HTML to Markdown
		// -------------------------
		describe('Parse HTML to Markdown', function () {
			// Text Nodes
			it('should be able to parse a textNode', function () {
				expect(parser.fromHTML( 'This is a paragraph!' )).toEqual('This is a paragraph!');
				expect(parser.fromHTML( 'This is another text!' )).toEqual('This is another text!');
			});

			it('should throw an error when textNode doesn\'t match the spec.', function () {
				expect(function () { parser.fromHTML('You should escape angle brackets like <'); }).toThrow();
				expect(function () { parser.fromHTML('< that is a bad start'); }).toThrow();
			});

			// Elements
			it('should parse simple <div> tag to a paragraph', function () {
				expect(parser.fromHTML( '<div>This text is wrapped inside a div.</div>' )).toEqual('This text is wrapped inside a div.');
				expect(parser.fromHTML( '<div>Another random text to test the parser!</div>' )).toEqual('Another random text to test the parser!');
			});

			it('should parse simple <p> tag to a paragraph', function () {
				expect(parser.fromHTML( '<p>This text is wrapped inside a p.</p>' )).toEqual('This text is wrapped inside a p.');
				expect(parser.fromHTML( '<p>Using the same text because I am lazy...</p>' )).toEqual('Using the same text because I am lazy...');
			});

			// TODO: Test bad tags like "< div" and allow tags like "<div class='sdsd'>"

			// Parsing Errors
			// General Parsing Errors
			it('should throw an error when the startTag doesn\'t match the closing tag', function () {
				expect(function () { parser.fromHTML('<div>foobar</p>'); }).toThrow();
			});

			it('should provide helpful error messages.', function () {
				expect(function () { parser.fromHTML('< woops'); }).toThrow('PARSING ERROR: Expected /[a-z]/ but found " " @ 1.');
			});
		});
	});

});
