import { useEffect, useState } from "react";
import puzzle from './Bingo.json';
import { fetchBingoWordLists } from './wordFetching';

const shuffledIndexes = (length) =>
  [...Array(length).keys()].sort(() => Math.random() - 0.5);

export function useGameLogic(){


const {
   title, 
   grid, 
   pattern

} = puzzle

const [wordLists, setWordLists] = useState({
  bingoListSa: [],
  bingoListEn: [],
  bingoListAudio: [],
});
const { bingoListSa, bingoListEn, bingoListAudio } = wordLists;
const [wordsLoading, setWordsLoading] = useState(true);
const [wordsError, setWordsError] = useState("");
const [selectedCells, setselectedCells] = useState([12]);
const [currentWordIndex, setcurrentWordIndex] = useState(0);
const [wrongCell, setwrongCell] = useState(null);
const [bingoBtn, showBingoBtn] = useState(false);
const [notBingo, showNotBingo] = useState(false);
const [shuffledWords, setShuffledWords] = useState([]);
const [shuffledClues, setShuffledClues] = useState([]);

useEffect(() => {
  let isCurrent = true;

  fetchBingoWordLists()
    .then(({ bingoListSa, bingoListEn, bingoListAudio, wordCount }) => {
      if (!isCurrent) return;

      setWordLists({ bingoListSa, bingoListEn, bingoListAudio });
      setShuffledWords(shuffledIndexes(wordCount).slice(0, 24));
      setShuffledClues(shuffledIndexes(wordCount));
      setWordsLoading(false);
    })
    .catch((error) => {
      console.error("Failed to load words from Firebase:", error);
      if (!isCurrent) return;
      setWordsError(error.message || "Unable to load words from Firebase.");
      setWordsLoading(false);
    });

  return () => {
    isCurrent = false;
  };
}, []);

  const handleBingo =  () => {
  const isWinning = pattern.winningCells.every(
   index => selectedCells.includes(index) 
  );

  if (isWinning) {
   showBingoBtn(true);
  }else{
   showNotBingo(true);
     }
  }
  

useEffect (() => {
   if (wordsLoading || bingoBtn || shuffledClues.length === 0) 
   return;
   const timer = setTimeout(() => {
      setcurrentWordIndex(prev =>
      (prev +1) % shuffledClues.length);
   },5000);
   return() => clearTimeout(timer);  
      
}, [currentWordIndex, shuffledClues.length, bingoBtn, wordsLoading]);


    
useEffect (() => {
   if (!notBingo) return; 
   
   const timer = setTimeout(() => {
   showNotBingo(false);
    },1500);
   return() => clearTimeout(timer);  
}, [notBingo]);


 const playSaAudio = (wordIndex) => {
   const audio = new Audio(bingoListAudio[wordIndex]);
   audio.play().catch(console.error);
}

function handleCellClicks(index) {


   if(wordsLoading || wordsError || index === 12 || currentWordIndex >= shuffledClues.length) 
      return; 

   const wordIndex = index < 12 ? index : index -1; 
   const clickedWordIndex = shuffledWords[wordIndex];
   const expectedWordIndex = shuffledClues[currentWordIndex];
   const isMatch = clickedWordIndex === expectedWordIndex;

if (isMatch) {
            playSaAudio(clickedWordIndex);

            setselectedCells((previous)=>
               [...previous, index]
            );

            setcurrentWordIndex(prev => (prev+1) % shuffledClues.length);
            }else{
                setwrongCell(index);

                setTimeout(() => {
                  setwrongCell(null);

                }, 200);
            }
}

return {

    title, 
    grid, 
    bingoListEn, 
    bingoListSa, 
    pattern, 
    wrongCell, 
    bingoBtn, 
    notBingo, 
    shuffledWords, 
    shuffledClues, 
    handleBingo, 
    handleCellClicks, 
    showBingoBtn, 
    selectedCells, 
    currentWordIndex,
    wordsLoading,
    wordsError
   };
}