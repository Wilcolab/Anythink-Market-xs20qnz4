(function(){
	'use strict';

	/**
	 * Convert a string to camelCase.
	 * Examples:
	 *  'first name'   -> 'firstName'
	 *  'user_id'      -> 'userId'
	 *  'SCREEN_NAME'  -> 'screenName'
	 *  'mobile-number'-> 'mobileNumber'
	 * @param {string} input
	 * @returns {string}
	 */
	function toCamelCase(input) {
		if (input === null || input === undefined) return '';
		const str = String(input).trim();
		if (str.length === 0) return '';

		const parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
		if (parts.length === 0) return '';

		return parts
			.map((p, i) => {
				const lower = p.toLowerCase();
				if (i === 0) return lower;
				return lower.charAt(0).toUpperCase() + lower.slice(1);
			})
			.join('');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = { toCamelCase };
	} else {
		this.toCamelCase = toCamelCase;
	}

})();

