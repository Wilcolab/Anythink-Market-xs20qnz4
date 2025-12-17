/**
 * @fileoverview String case conversion utility module.
 * Provides functions to convert strings between different naming conventions
 * (camelCase, dot.case). Handles edge cases with comprehensive error checking.
 * 
 * @module StringCaseConverter
 * @since 1.0.0
 * 
 * @example
 * // CommonJS
 * const { toCamelCase, toDotCase } = require('./refined_prompt');
 * 
 * @example
 * // Browser/Global scope
 * toCamelCase('hello-world'); // 'helloWorld'
 * toDotCase('HelloWorld');     // 'hello.world'
 */

/**
 * Converts a string to camelCase format.
 * 
 * Splits input on non-alphanumeric characters and joins parts with the first
 * word in lowercase and subsequent words capitalized.
 * 
 * @function toCamelCase
 * @param {string} input - The string to convert. Must be non-empty and contain
 *                         at least one alphanumeric character.
 * @returns {string} The converted camelCase string.
 * 
 * @throws {TypeError} If input is null, undefined, or not a string.
 * @throws {TypeError} If input is empty or contains only whitespace.
 * @throws {TypeError} If input contains no alphanumeric characters.
 * 
 * @example
 * toCamelCase('hello-world');        // 'helloWorld'
 * toCamelCase('hello_world_foo');    // 'helloWorldFoo'
 * toCamelCase('hello world');        // 'helloWorld'
 * toCamelCase('HELLO WORLD');        // 'helloWorld'
 */

/**
 * Converts a string to dot.case format.
 * 
 * Handles camelCase detection by inserting boundaries between lowercase/digit
 * followed by uppercase characters. Splits on non-alphanumeric sequences and
 * joins parts with dots, all in lowercase.
 * 
 * @function toDotCase
 * @param {string} input - The string to convert. Must be non-empty and contain
 *                         at least one alphanumeric character.
 * @returns {string} The converted dot.case string.
 * 
 * @throws {TypeError} If input is null, undefined, or not a string.
 * @throws {TypeError} If input is empty or contains only whitespace.
 * @throws {TypeError} If input contains no alphanumeric characters.
 * 
 * @example
 * toDotCase('helloWorld');           // 'hello.world'
 * toDotCase('hello-world');          // 'hello.world'
 * toDotCase('hello_world_foo');      // 'hello.world.foo'
 * toDotCase('HelloWorld');           // 'hello.world'
 */

/**
 * @typedef {Object} StringCaseModule
 * @property {Function} toCamelCase - Converts strings to camelCase.
 * @property {Function} toDotCase - Converts strings to dot.case.
 */
(function(){
	'use strict';

	/**
	 * Convert a string to camelCase.
	 *
	 * Algorithm and behavior:
	 * - Inserts token boundaries on any run of non-alphanumeric characters
	 *   (spaces, hyphens, underscores, punctuation).
	 * - Treats the first token as entirely lowercase.
	 * - For each subsequent token, capitalizes the first character and lowercases
	 *   the remainder (e.g. "USER_ID" -> ["USER","ID"] -> "userId").
	 * - Preserves numeric tokens and positions ("item 2 id" -> "item2Id").
	 *
	 * Note: This function intentionally normalizes case by lowercasing tokens
	 * before applying capitalization rules to ensure consistent output for
	 * inputs like "SCREEN_NAME" or "mobile-NUMBER".
	 *
	 * @function toCamelCase
	 * @param {string} input - The string to convert. Must be a non-empty
	 *                          string containing at least one alphanumeric
	 *                          character. Leading/trailing whitespace is
	 *                          ignored.
	 * @returns {string} The camelCase version of the input. Returns an empty
	 *                   string only when the input contains no tokens after
	 *                   splitting (this implementation throws earlier for
	 *                   empty/invalid inputs).
	 * @throws {TypeError} If `input` is `null` or `undefined`.
	 * @throws {TypeError} If `input` is not a string.
	 * @throws {TypeError} If `input` is an empty or whitespace-only string.
	 * @throws {TypeError} If `input` contains no alphanumeric characters.
	 *
	 * @example
	 * toCamelCase('first name'); // 'firstName'
	 * @example
	 * toCamelCase('user_id'); // 'userId'
	 * @example
	 * toCamelCase('SCREEN_NAME'); // 'screenName'
	 * @example
	 * toCamelCase('mobile-number'); // 'mobileNumber'
	 *
	 * @since 1.0.0
	 */
	function toCamelCase(input) {
		if (input === null || input === undefined) {
			throw new TypeError('toCamelCase: input is null or undefined; expected a non-empty string');
		}
		if (typeof input !== 'string') {
			throw new TypeError('toCamelCase: input must be a string');
		}

		const trimmed = input.trim();
		if (trimmed.length === 0) {
			throw new TypeError('toCamelCase: input must be a non-empty string');
		}

		// Split on any non-alphanumeric sequence (spaces, hyphens, underscores, etc.)
		const parts = trimmed.split(/[^A-Za-z0-9]+/).filter(Boolean);
		if (parts.length === 0) {
			throw new TypeError('toCamelCase: input does not contain any alphanumeric characters');
		}

		return parts
			.map((part, idx) => {
				const lower = part.toLowerCase();
				if (idx === 0) return lower;
				return lower.charAt(0).toUpperCase() + lower.slice(1);
			})
			.join('');
	}

	if (typeof module !== 'undefined' && module.exports) {
		/**
		 * Convert a string to dot.case (words separated by single dots).
		 *
		 * Behavior and details:
		 * - Detects camelCase boundaries and inserts a separator between a lower/
		 *   digit followed by an upper-case letter (e.g. "helloWorld" ->
		 *   "hello World").
		 * - Splits on any sequence of non-alphanumeric characters (spaces,
		 *   hyphens, underscores, punctuation) and lowercases all tokens.
		 * - Joins tokens with a single dot '.' character.
		 *
		 * This produces predictable, URL/filename-friendly identifiers like
		 * "hello.world.example".
		 *
		 * @function toDotCase
		 * @param {string} input - Input string to convert; must be a non-empty
		 *                         string containing at least one alphanumeric
		 *                         character.
		 * @returns {string} The dot.case representation of the input.
		 * @throws {TypeError} If `input` is null, undefined, not a string, or
		 *                     empty/whitespace-only, or contains no alphanumeric
		 *                     characters.
		 *
		 * @example
		 * toDotCase('helloWorld'); // 'hello.world'
		 * @example
		 * toDotCase('hello-world'); // 'hello.world'
		 * @example
		 * toDotCase('HELLO_WORLD'); // 'hello.world'
		 *
		 * @since 1.0.0
		 */
		function toDotCase(input) {
			if (input === null || input === undefined) {
				throw new TypeError('toDotCase: input is null or undefined; expected a non-empty string');
			}
			if (typeof input !== 'string') {
				throw new TypeError('toDotCase: input must be a string');
			}

			const trimmed = input.trim();
			if (trimmed.length === 0) {
				throw new TypeError('toDotCase: input must be a non-empty string');
			}

			// Insert boundary between lower->Upper (handle camelCase)
			const withBoundaries = trimmed.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

			// Split on any non-alphanumeric sequence (spaces, hyphens, underscores, etc.)
			const parts = withBoundaries.split(/[^A-Za-z0-9]+/).filter(Boolean);
			if (parts.length === 0) {
				throw new TypeError('toDotCase: input does not contain any alphanumeric characters');
			}

			return parts.map(p => p.toLowerCase()).join('.');
		}

		module.exports = { toCamelCase, toDotCase };
	} else {
		this.toCamelCase = toCamelCase;
		this.toDotCase = function(input) {
			if (input === null || input === undefined) throw new TypeError('toDotCase: input is null or undefined; expected a non-empty string');
			if (typeof input !== 'string') throw new TypeError('toDotCase: input must be a string');
			const trimmed = input.trim();
			if (trimmed.length === 0) throw new TypeError('toDotCase: input must be a non-empty string');
			const withBoundaries = trimmed.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
			const parts = withBoundaries.split(/[^A-Za-z0-9]+/).filter(Boolean);
			if (parts.length === 0) throw new TypeError('toDotCase: input does not contain any alphanumeric characters');
			return parts.map(p => p.toLowerCase()).join('.');
		};
	}

})();

