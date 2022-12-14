import React from "react";
import HTPCss from './how-to-play.module.css';
const HowToPlayComponent = () => {

   return (
      <>

      <h1 style={{fontWeight:'bolder',fontSize:'2rem'} }>How To Play</h1>
      <span>Guess the Wordle in 6 tries.</span>
      <div>
      <ul className={HTPCss['guide-list']}><br />
         <li><span>Each guess must be a valid 5-letter word.</span></li>
         <li><span>The color of the tiles will change to show how close your guess was to the word.</span></li>
      </ul><br />
      </div>

      <span style={{fontSize:'20px'}}><b>Examples</b></span><br /><br />

      <img src={require("../../assests/example1.PNG")} width={"240px"} height={"240px"} alt="" /> <br />
      <p><strong style={{color:'white', fontSize:'18px'}}>W</strong> is in the word and in the correct spot.</p><br />
      <img src={require("../../assests/example2.PNG")} width={"240px"} height={"240px"} alt="" /> <br />
      <p><strong style={{color:'white', fontSize:'18px'}}>I</strong> is in the word but in the wrong spot.</p><br />
      <img src={require("../../assests/example3.PNG")} width={"240px"} height={"240px"} alt="" /> <br />
      <p><strong style={{color:'white', fontSize:'18px'}}>U</strong> is not in the word in any spot.</p>
      <hr />
      <p>Have feedback? Email us at AbobakarPaen@gmail.com</p>
      <p>&copy;2022 Paen Wordle</p>


      </>
   );
}

export default HowToPlayComponent;