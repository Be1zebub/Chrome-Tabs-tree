function Fuzzy1(needle, haystack, maxDist = 3) {
	const needleLen = needle.length
	const haystackLen = haystack.length

	let i = 0
	let j = 0
	let dist = 0
	let matches = 0

	while (i < needleLen && j < haystackLen) {
		if (needle[i] === haystack[j]) {
			matches++
			i++
			j++
			dist = 0
		} else {
			j++
			dist++
		}

		if (dist > maxDist) {
			i = 0 // Reset needle pointer
			matches = 0 // Reset matches counter
			j -= dist - 1 // Move haystack pointer back
			dist = 0 // Reset distance counter
		}
	}

	return matches === needleLen
}

// needle can contain several words, the search for which will work separately
function Fuzzy2(needle, haystack) {
	const needleWords = needle.split(/\s+/).filter((word) => word.length > 0)
	const haystackWords = haystack.split(/\s+/).filter((word) => word.length > 0)

	for (let i = 0; i < needleWords.length; i++) {
		const needleWord = needleWords[i].toLowerCase()

		let found = false
		for (let j = 0; j < haystackWords.length; j++) {
			const haystackWord = haystackWords[j].toLowerCase()

			if (Fuzzy1(needleWord, haystackWord)) {
				found = true
				break
			}
		}

		if (!found) {
			return false
		}
	}

	return true
}

export default function FzySearch(userinput, tab) {
	let title = tab.tab.title.toLowerCase()
	let url = tab.tab.url.toLowerCase()

	return (
		title.includes(userinput) ||
		url.includes(userinput) ||
		// Fuzzy1(userinput, title) ||
		// Fuzzy1(userinput, url) ||
		Fuzzy2(userinput, title) ||
		Fuzzy2(userinput, url)
	)
}
