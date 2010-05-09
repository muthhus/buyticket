initFunctions.push(function() {
	var validators = {
		"email" : {
			regexp : /(^|\s)validate-email(\s|$)/,
			agrees : function(val) { return /^[^\s]+@[^\s.]+\.[^\s]+[^.]$/.test(val); },
			error  : "Please enter a valid email address.",
			rqrd   : true
		},
		"not-empty": {
			regexp : /(^|\s)validate-not-empty(\s|$)/,
			agrees : function(val) { return !/^\s*$/.test(val); },
			error  : "This field can't be empty.",
			rqrd   : true
		},
		"integer": {
			regexp : /(^|\s)validate-integer(\s|$)/,
			agrees : function(val) { return /^[0-9]+$/.test(val); },
			error  : "This field must be an integer value.",
			rqrd   : true
		},
		"float": {
			regexp : /(^|\s)validate-float(\s|$)/,
			agrees : function(val) { return /^[0-9]*(\.[0-9]*)?$/.test(val); },
			error  : "This field must be a decimal numeric value.",
			rqrd   : true
		},
		"url": {
			regexp : /(^|\s)validate-url(\s|$)/,
			agrees : function(val) { return /^(https?|ftp):\x2f\x2f/.test(val) || /^\x2f/.test(val); },
			error  : "This field does not look like an URL.",
			rqrd   : true
		},
		"url-or-empty": {
			regexp : /(^|\s)validate-url-or-empty(\s|$)/,
			agrees : function(val) { return val == '' || /^(https?|ftp):\x2f\x2f/.test(val) },
			error  : "This field does not look like an URL.  Must start with “http://”, “https://” or “ftp://”."
		},
		"equals-to-id": {
			regexp : /(^|\s)validate-equals-to-id_([a-zA-Z0-9_-]+)(\s|$)/,
			agrees : function(val) {
				var el = document.getElementById(RegExp.$2);
				if (!el) {
					alert("Validation error: no field with ID \"" + RegExp.$2 + "\"!");
					return false;
				}
				return el.value == val;
			},
			error  : "Fields not equal.",
			rqrd   : true
		}
	};
