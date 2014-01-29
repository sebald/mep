var ParserFactory = (function () {

	// Constructor for a single Parser.
	// -------------------------
	function Parser () {
		var self = this,
			failed = null;

		function writeToResult () {
			var c = self.curChar;
			self.curPos++;
			self.curChar = self.input.charAt(self.curPos);
			return c;
		}

		function fails ( expected, found ) {
			// No fail, just reached end of input (eoi).
			if( self.eoi === self.curPos ) {
				return;
			}

			throw 'PARSE ERROR: Expected ' + expected + ' but found ' + found;
		}

		/**
		 *	Rule:
		 *	Char <- /^[^<]/
		 */
		this.parseChar = /^[^<]/;

		/**
		 *	Rule:
		 *	TextNode <- Char*
		 */
		this.parseTextNode = function () {
			var result = '',
				current;

			if ( self.parseChar.test(self.curChar) ) {
				current = writeToResult();
			} else {
				current = failed;
			}
			if( current !== failed )
				while ( current !== failed ) {
					result += current;
					if ( self.parseChar.test(self.curChar) ) {
						current = writeToResult();
					} else {
						fails( self.curChar, current );
						current = failed;
					}
				}
			} else {
				// TODO: Handle Error.
				return failed;
			}
			return result;
		}

		/**
		 *	Rule:
		 *	Content <- Element / TextNode
		 */
		this.parseContent = function () {
			return self.parseTextNode();
		}
	}


	Parser.prototype.fromHTML = function ( html ) {
		this.curPos = 0;
		this.input = html;
		this.eoi = this.input.length;
		this.curChar = this.input.charAt(this.curPos);
		return this.parseContent();
	}


	// Factory.
	// -------------------------
	function ParserFactory () {}

	ParserFactory.prototype.createParser = function () {
		return new Parser();
	};

	return ParserFactory;
})();
