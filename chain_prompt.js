(function(){
	'use strict';

	/**
	 * Convert a string to kebab-case (lowercase, words separated by single hyphens).
	 * @param {string} input
	 * @returns {string}
	 * @throws {TypeError} when input is null/undefined/non-string/empty
	 */
	function toKebabCase(input) {
		if (input === null || input === undefined) {
			throw new TypeError('toKebabCase: input is null or undefined; expected a non-empty string');
		}
		if (typeof input !== 'string') {
			throw new TypeError('toKebabCase: input must be a string');
		}

		// Normalize and trim
		const trimmed = input.trim();
		if (trimmed.length === 0) {
			throw new TypeError('toKebabCase: input must be a non-empty string');
		}

		// Insert boundaries for camelCase (e.g., myVar -> my Var)
		const withBoundaries = trimmed.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

		// Split on any non-alphanumeric sequence (spaces, underscores, hyphens, etc.)
		const parts = withBoundaries.split(/[^A-Za-z0-9]+/).filter(Boolean);
		if (parts.length === 0) {
			throw new TypeError('toKebabCase: input does not contain any alphanumeric characters');
		}

		return parts.map(p => p.toLowerCase()).join('-');
	}

	// Examples
	const examples = [
		{ input: 'Hello World', output: 'hello-world' },
		{ input: '  multiple__separators--here ', output: 'multiple-separators-here' }
	];

	// Export
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = { toKebabCase, examples };
	} else {
		this.toKebabCase = toKebabCase;
		this.toKebabCaseExamples = examples;
	}

})();

