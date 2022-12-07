import { react, useEffect, useRef, useState } from "react";
import KeyboardComponent from "../keyboard/keyboard";
import TriesBoxesComponent from "../tries-boxes/tries-boxes";
import MainSectionCss from "./main-section.module.css";
const MainSectionComponent = () => {
  const [keyPress, setKeyPress] = useState(() => {
    return [];
  });

  function keyboardPressedKey(val) {
    let singleChar = [val];
    setKeyPress((val)=> singleChar);
  }

  // calling removing data from char list on child component 
  const childRef = useRef();
  function removeCharacterHandler(){
    childRef.current.removeCharFromListHandler();
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
            <KeyboardComponent keyPressed={keyboardPressedKey} removeChar={removeCharacterHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSectionComponent;
