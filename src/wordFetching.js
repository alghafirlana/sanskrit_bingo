import { doc, getDoc } from "firebase/firestore";
import { wordsDb } from "./words-config";

export async function fetchWords() {
  const wordsDocument = await getDoc(doc(wordsDb, "words", "words_1"));

  if (!wordsDocument.exists()) {
    throw new Error('Firestore document "words/words_1" does not exist.');
  }

  const words = wordsDocument.data().words;
  if (!Array.isArray(words)) {
    throw new Error('Firestore document "words/words_1" must contain a "words" array.');
  }
  if (words.length < 24) {
    throw new Error('Firestore document "words/words_1" must contain at least 24 words for a 5×5 board.');
  }

  return words.map((word, index) => {
    if (!word.wordSan || !word.wordEng || !word.audio) {
      throw new Error(`Word at index ${index} must include wordSan, wordEng, and audio.`);
    }

    return {
      wordSan: word.wordSan,
      wordEng: word.wordEng,
      audio: word.audio,
    };
  });
}

export async function fetchBingoWordLists() {
  const words = await fetchWords();

  return {
    bingoListSa: words.map((word) => word.wordSan),
    bingoListEn: words.map((word) => word.wordEng),
    bingoListAudio: words.map((word) => word.audio),
    wordCount: words.length,
  };
}
