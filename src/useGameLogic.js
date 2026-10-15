import { useEffect, useState } from "react";
import puzzle from './Bingo.json'

export function useGameLogic(){

      
const {
   title, 
   grid, 
   bingoListSa,
   bingoListEn, 
   pattern

} = puzzle

const [selectedCells, setselectedCells] = useState([12]);
const [currentWordIndex, setcurrentWordIndex] = useState(0);
const [wrongCell, setwrongCell] = useState(null);
const [bingoBtn, showBingoBtn] = useState(false);
const [notBingo, showNotBingo] = useState(false);
const [shuffledWords] = useState(() =>
[...Array(bingoListSa.length).keys()].sort(() => Math.random() - 0.5).slice(0,24)
);
const [shuffledClues] = useState(() => 
    [...Array(bingoListEn.length).keys()]
   .sort(() => Math.random() - 0.5)
);

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
   if (bingoBtn || shuffledClues.length === 0) 
   return;
   const timer = setTimeout(() => {
      setcurrentWordIndex(prev =>
      (prev +1) % shuffledClues.length);
   },5000);
   return() => clearTimeout(timer);  
      
}, [currentWordIndex, shuffledClues.length, bingoBtn]);


    
useEffect (() => {
   if (!notBingo) return; 
   
   const timer = setTimeout(() => {
   showNotBingo(false);
    },1500);
   return() => clearTimeout(timer);  
}, [notBingo]);


 const playSaAudio = (wordIndex) => {
 
   const audio = new Audio(`/audio/${wordIndex}.mp3`);
   audio.play().catch(console.error);
}

function handleCellClicks(index) {


   if(index === 12 || currentWordIndex >= shuffledClues.length) 
      return; 

   const wordIndex = index < 12 ? index : index -1; 


if (shuffledWords[wordIndex] === shuffledClues[currentWordIndex]) {
               
            
            console.log("Playing:", bingoListSa[shuffledWords[wordIndex]]);
            playSaAudio(shuffledWords[wordIndex]);

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
    currentWordIndex
   };
}