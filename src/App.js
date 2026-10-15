import './App.css'
import { useGameLogic } from './useGameLogic';


function App() {
  
   const{
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
   } = useGameLogic();


return (
  <>
  
    <nav className="nav-instructions">
      
    </nav>
                
  <div className="app-container">
  <div className='top-header'>

  <h1>{title}</h1>

  {/* <img className="Bingo-Img" src='/bingo-img.png' alt="Bingo" /> */}
  <div className='word-box'> WORD: &nbsp; {currentWordIndex < shuffledClues.length
      ? bingoListEn[shuffledClues[currentWordIndex]]
      : ""}
      </div>

      
      <div className='grid'>
        {Array.from({length: grid.rows * grid.columns }).map((_, index) => (
            <div className={`cell ${
               
            index === 12 ? 'free-cell' : selectedCells.includes(index) ? 'active': ''
            } ${wrongCell === index ? 'wrong' : ''}`}
            key={index}
            onClick={() => handleCellClicks(index)}
               >
         
               {index === 12 ? (
                "⭐"  
                ):(
               <div>
                <div> {bingoListSa[shuffledWords[index < 12 ? index : index -1]]} </div>

                  <hr />
                  
                   <div className='english-word'>
                   {bingoListEn[shuffledWords[index < 12 ? index : index -1]]}
                     </div>
                  </div>
                )}
             </div>
        ))}
      </div>
    
     <button className='bingo-button' onClick={handleBingo}>
      ⭐ बिङ्गो | BINGO ⭐
     </button>

     {bingoBtn &&(
      <div className='win-popup'>
      <h1>Congrats You Won Bingo🎉</h1>
      <p>Click Ok To Claim your Points or Click Restart to Play Again</p> 
      <div className='win-buttons'>
       <button onClick={()=> showBingoBtn(false)}>
        OK   
      </button>
       <button onClick={()=> showBingoBtn(false)}>
          Restart
       </button>
       </div>
      </div>
     )}


    {notBingo && (
      <div className='lose-popup'>
         <h2>This is not Bingo. Try Again</h2>
      </div>
    )}
     </div>
     
      <div className='pattern-right'>
             <h4>{"\t"}Winning Pattern🎉</h4>
             
                     <div className='pattern-grid'>
                        {Array.from({length: 25}).map((_, index) => (
                           <div
                           key={index}
                           className={`pattern-cell
                              ${pattern.winningCells.includes(index) ? "pattern-active" : ""}
                              ${index === 12 ? 'free-cell' : ""}`}
                              >
                           </div>
                           
                        ))}
                        </div>
                        <div className='corner-button'>
                        <h6>{"\t"}{pattern["four-corner"]}</h6>
                        </div>
                     </div>

               </div>
     </>
  );   
}

export default App
