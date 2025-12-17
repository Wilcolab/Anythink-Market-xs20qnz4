(function(){
	'use strict';

	/**
	 * Convert a string to camelCase.
	 * - separators: spaces, hyphens (-), underscores (_)
	 * - first word lowercase, subsequent words capitalized
	 * - all other letters lowercase
	 * Assumes only alphanumeric characters and separators are present.
	 * @param {string} input
	 * @returns {string}
	 */
	function toCamelCase(input) {
		if (input === null || input === undefined) {
			throw new TypeError('toCamelCase: input is null or undefined; expected a string');
		}
		if (typeof input !== 'string') {
			throw new TypeError('toCamelCase: input must be a string');
		}

		const parts = input
			.split(/[^A-Za-z0-9]+/) // split on spaces, hyphens, underscores, etc.
			.filter(Boolean)
			.map(p => p.toLowerCase());

		if (parts.length === 0) return '';

		return parts
			.map((part, idx) => {
				if (idx === 0) return part;
				return part.charAt(0).toUpperCase() + part.slice(1);
			})
			.join('');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = { toCamelCase };
	} else {
		this.toCamelCase = toCamelCase;
	}

})();

