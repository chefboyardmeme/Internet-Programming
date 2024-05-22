// Function to count the number of words
function wordCount(array) {
    return array.length;
}

// Function to count the number of unique words
function uniqueWordCount(array) {
    const uniqueWords = new Set(array.filter(word => isNaN(word.toLowerCase())));
    return uniqueWords.size;
}

//Function to count the number of long words
function longWordCount(array) {
	const longWords = new Set(array.filter(word => isNaN(word.toLowerCase())&& word.length >= 5))
    return longWords.size;
}

// Function to count the number of sentences
function sentenceCount(array) {
    const text = array.join(' ');
    const sentences = text.split('.').filter(sentence => sentence.trim() !== '');
    return sentences.length;
}

// Function to count the number of numbers
function numberCount(array) {
    const numbers = array.filter(word => !isNaN(word));
    return numbers.length;
}

// Function to find the most frequent word(s)
function mostFrequentWord(array) {
    const wordCounts = {};
    array.forEach(word => {
        if (!wordCounts[word]) {
            wordCounts[word] = 0;
        }
        wordCounts[word]++;
    });
    const maxCount = Math.max(...Object.values(wordCounts));
    const frequentWords = Object.keys(wordCounts).filter(word => wordCounts[word] === maxCount);
    return frequentWords;
}

// Function to analyze the text
function analyzeText() {
	event.preventDefault();
    const textInput = document.getElementById("textInput").value;
    const words = textInput.split(/\s+/).filter(word => word.trim() !== '');

    const wordsCount = wordCount(words);
    const uniqueWordsCount = uniqueWordCount(words);
	const longWordsCount = longWordCount(words);
    const sentencesCount = sentenceCount(words);
    const numbersCount = numberCount(words);
    const frequentWords = mostFrequentWord(words);

    document.getElementById("wordsCount").textContent = wordsCount;
    document.getElementById("uniqueWordsCount").textContent = uniqueWordsCount;
	document.getElementById("longWordsCount").textContent = longWordsCount;
    document.getElementById("sentencesCount").textContent = sentencesCount;
    document.getElementById("numberCount").textContent = numbersCount;
    document.getElementById("mostFrequentWord").textContent = frequentWords.join(', ');
	return false;
}