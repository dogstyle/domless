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
/* ________________________--- _______________       _D      )_________ */
/* __    ____________________-----___________       ___      (_________ */
/* _   (____________________________________       ___          k______ */
/* __                                                     ____j________ */
/* _______free_to_do_whatever____BUT PLEASE PRESERVE THE SEAL__________ */
/* __________________________________^______^____________^_____________ */
/* _______DOMLESS___mangoRoom.com______________________________________ */

PAGE.add("Constructors.Domless", function (options) {

	var o = options = options || {}
	o.getRandom = o.getRandom || function() { return String(Math.random()).replace(".","") }
	o.name = o.name || "domless" + o.getRandom()
	o.refreshSpeed = o.refreshSpeed = 60
	o.refresh = o.refresh || false

	var Legend = function() {
		return {
			  s : undefined // CSSStyleSheet
			, DOMObj : undefined // DOM ELEMENT
			, rules : { /* HASH HERE ONE RULE PER TARGET */ }
			, rulesCount : 0
			, lastRulesCount : 0

			, addStyle : function(target, text) { return this }
			, getStyle : function(target) { return this }
			, removeStyle : function(target) { return this }
			, regenerate : function() { return this }

			, style : ""
			, cat : undefined
			, Legend : Legend
		}
	}

	var dog = Legend()

	var cat = dog.cat = {
		generateStyle : function(rules) { return this }
		, options : options
		, prospect : ""
	}


	function initiateStyleSheet(callback) {
		var style = dog.DOMObj =  document.createElement("style")
		document.head.appendChild(style)
		dog.s = document.styleSheets[document.styleSheets.length-1]
		return dog
	}

	var addStyle = dog.addStyle = function(target, style) {
		removeStyle(target).rules[target] = style
		dog.rulesCount ++
		return dog
	}

	var removeStyle = dog.removeStyle = function(target) {
		if (!dog.rules[target]) return dog
		delete dog.rules[target]
		dog.rulesCount --
		return dog
	}

	dog.getStyle = function(target) {
		return dog.s[target]
	}

	function timer(func, time) {
		setInterval(function() {
			func()
		}, time)
	}

	function generateHelper(rule, text) {
		var style = ""
		style += rule 
		style += text
		return style
	}

	cat.generateStyle = function(rules) {
		rules = rules || dog.rules
		cat.prospect = ""
		for (var rule in rules)  cat.prospect += generateHelper(rule, rules[rule])
		return dog
	}

	cat.terminateThenReplace = function (replaceCallback) {
		if (cat.prospect === dog.style) return dog
		dog.DOMObj.innerText = dog.style = cat.prospect
		return dog
	}

	dog.regenerate = function() {
		if (dog.rulesCount) {
			cat.generateStyle().cat.terminateThenReplace()
		}
		return dog
	}

	function init() {
		initiateStyleSheet()
		if (o.refresh) {
			timer(function() {
				dog.regenerate()
			}, options.refreshSpeed)
		}
	}

	init()

	return dog
})
