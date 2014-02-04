# meg.js

*meg.js* is a parsing expression parser for HTML and Markdown. It is based on the insanely great [peg.js](http://pegjs.majda.cz/) by [David Majda](http://majda.cz/) ([@dmajda](http://twitter.com/dmajda)).

**Note:** While the transformatiom from Markdown to HTML is lossless, parsing HTML to Markdown is not. *meg.js* is designed to be used to help save `contenteditable` elements with a (hopefully) more universal format.