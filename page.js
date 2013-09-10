var PAGE = (function() {

	/* ____________________________________________________________________ */
	/* ____________________________________________________________________ */
	/* __________________________--_________________((((((((     __________ */
	/* ____p________t_________--___________________))))))))) ()  -----)-)__ */
	/* ____A_____g___h_______--___________________((((((((((      ))))) )__ */
	/* ____G______h___e______--________________   ))))))))))           )___ */
	/* ____E_______o__________--______________    WWWWWWWWWW          (____ */
	/* ________o____s_________D------________                          )___ */
	/* ____D____f____t_______------__________                          (___ */
	/* ____O_________________------__________Cc                        )___ */
	/* ____G_________________-----_________________                  (_____ */
	/* ________________________--- _______________       __      )_________ */
	/* __    ____________________-----___________       ___      (_________ */
	/* _   (____________________________________       ___          k______ */
	/* __                                                     ____j________ */
	/* _______free_to_do_whatever____BUT PLEASE PRESERVE THE SEAL__________ */
	/* __________________________________^______^____________^_____________ */
	/* ____________________________________________________________________ */

	var options = { debugMode : true }
		, Page  = function(){}          // base constructor
		, dog   = Page.prototype = {}   // base prototype
		, puppy = new Page()            // base instance

	function log(thing) {
		if (typeof console === "object" && options.debugMode) {
			console.log(thing)
		}
	}

	var add = dog.add = function(path, obj) {
		if (typeof path === "undefined") return
		var arr = path.split(".")
		if (arr.length < 2) return
		var group = arr[0]
			, item = arr[1]
		if (!puppy[group]) puppy[group] = {}
		return puppy[group][item] = obj
	}

	var waitProto = dog.waitProto = function(name, callback) {
		var limit = 1000
			, count = 0
			, interval

		if (dog[name]) {
			return callback(dog[name])
		}

		interval = setInterval(function() {
			if (count > limit) {
				console.error("could not find prototype " + name)
				clearInterval(interval)
				return
			}
			if (count > limit || (dog[name])) {
				if (typeof callback === "function") {
					callback(dog[name])
				}
				clearInterval(interval)
			}
			count++
		}, 10)
	}

	var waitLoad = dog.waitLoad = function(group, name, callback) {
			var limit = 1000
				, count = 0
				, interval

			if (puppy[group] && puppy[group][name]) {
				return callback(puppy[group][name])
			}

			interval = setInterval(function() {
				if (count > limit) {
					console.error("could not find " + group + ":" + name)
					clearInterval(interval)
					return
				}
				if (count > limit || (puppy[group] && puppy[group][name])) {
					if (typeof callback === "function") {
						callback(puppy[group][name])
					}
					clearInterval(interval)
				}
				count++
			}, 10)
		}

	, wait = dog.wait = function(path, callback) {
		if (typeof path === "undefined") return
		var arr = path.split(".")
		if (arr.length < 1) return
		if (arr.length < 2) return waitProto(arr[0], callback)
		return waitLoad(arr[0], arr[1], callback)
	}

	, addModule = dog.addModule = function(name, obj) {
		return add("Modules." + name, obj)
	}

	, addConstructor = dog.addConstructor = function(name, obj) {
		return add("Constructors." + name, obj)
	}

	, addFunction = dog.addFunction = function(name, obj) {
		return add("Functions." + name, obj)
	}

	, addProperty = dog.addProperty = function(name, obj) {
		return add("Properties." + name, obj)
	}

	, extend = dog.extend = function(callback) {
		typeof callback === "function" && callback(puppy, dog, log)
	}

	, add$ = dog.add$ = function(path, obj) {
		$(document).ready(function() {
			add(path, obj)
		})
	}

	return puppy

}())


