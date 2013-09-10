PAGE.add("Constructors.BuildAnimation", function (options) {

	o = options = options || {}

	var Legend = function() {
		return {
			  add : function(style) { return this }
			, remove : function(id) { return this }
			, empty : function() { return this }
			, addBatch : function(batch) { return this }
			, build : function() { return this }
			, styles : []
			, output : ""
			, options : options
			, Legend : Legend
		}
	}

	var dog = Legend()

	dog.add = function(style) {
		dog.styles.push(style)
		return dog
	}

	dog.remove = function (id) {
		dog.styles.splice(id,1)
		return dog
	}

	dog.empty = function (id) {
		dog.styles.length = 0
		return dog
	}

	dog.addBatch = function(batch) {
		dog.styles.concat(batch)
		return dog
	}

	dog.build = function() {
		if (dog.styles.length === 0) {
			dog.output = ""
			return dog
		}

		var subarray = dog.styles.slice(0)
			, first = ""
			, last = ""
			, style = ""
			, x = 0

		if (subarray.length === 1) subarray.push(subarray[0])

		first += "0% {" + subarray.shift() + "}"
		last += "100% {" + subarray.pop() + "}"

		if (subarray.length === 0) {
			dog.output = "{" + first + last + "}"
			return dog
		}

		var split = (100/(subarray.length+1))
		, percentage = split

		for (x = 0; x < subarray.length; x++) {
			style += (percentage) + "% {" + dog.styles[x] + "}"
			percentage += split
		}

		dog.output = "{" + first + style + last + "}"
		return dog
	}

	function init() { }

	init()

	return dog
})
