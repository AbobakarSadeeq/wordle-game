import { react, useEffect, useRef, useState } from "react";
import KeyboardComponent from "../keyboard/keyboard";
import TriesBoxesComponent from "../tries-boxes/tries-boxes";
import MainSectionCss from "./main-section.module.css";


// tommaro task
// 1. make algo to pick up random number from 0 to 8885.
// 2. then direct read jsonFile[randomNumber] from it.
// 3. then apply the conditions and apply styling based condition etc.
// 4. not enough validation and not in word list found validation required when enter pressed.


const MainSectionComponent = () => {
  const [keyPress, setKeyPress] = useState(() => {
    return [];
  });

  function keyboardPressedKey(val) {
    let singleChar = [val];
    setKeyPress((val)=> singleChar);
  }

  // calling removing data from char list on child component 
  const childRef  = useRef();

  function removeCharacterHandler(){
    childRef.current.removeCharFromListHandler();
  }

  // entering pr submitting word result

  function enterWordHandler(){
    childRef.current.submitWordHandler();
  }





  let renderingTriesWithVals;
  if(keyPress === ""){
    renderingTriesWithVals =   <TriesBoxesComponent />
  }else {
    renderingTriesWithVals =  <TriesBoxesComponent selectedKeyValue={keyPress} ref={childRef} />
  }

  return (
    <>
      <div className={MainSectionCss["main-screen-section"]}>
        <div className="columns is-mobile">
          <div className="column  is-offset-2  is-8">
            {renderingTriesWithVals}
            <KeyboardComponent keyPressed={keyboardPressedKey} removeChar={removeCharacterHandler} submittingWord={enterWordHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSectionComponent;
