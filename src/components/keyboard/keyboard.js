import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { react, useCallback, useEffect } from "react";
import keyboardCss from "./keyboard.module.css";

const KeyboardComponent = (props) => {

  function KeyPressHandler(keyboardKey) {
    props.keyPressed(keyboardKey);
  }

  function removeCharHandler(){
    props.removeChar();
  }

  function submitCharHandler(){
    props.submittingWord();
  }


  const keyBoardKeyPressedByKeyboard = useCallback((event) => {
    if(/^[a-zA-Z]+$/.test(event.key) && event.key.length === 1){
      const singleLetter = event.key.toString().toUpperCase();
      props.keyPressed(singleLetter);
    }

    if(event.key === "Backspace"){
      props.removeChar();
    }

    if(event.key === "Enter"){
      props.submittingWord();
    }


   
  })

  useEffect(()=>{
    document.addEventListener("keydown", keyBoardKeyPressedByKeyboard , false);
  },[])


  return (
    <>
      <div id={keyboardCss["base"]}>
       <div className={keyboardCss["line1"]}>
          <span onClick={()=>{KeyPressHandler("Q")}} onKeyPress={()=>{KeyPressHandler("Q")}}>Q</span>
          <span onClick={()=>{KeyPressHandler("W")}}>W</span>
          <span onClick={()=>{KeyPressHandler("E")}}>E</span>
          <span onClick={()=>{KeyPressHandler("R")}}>R</span>
          <span onClick={()=>{KeyPressHandler("T")}}>T</span>
          <span onClick={()=>{KeyPressHandler("Y")}}>Y</span>
          <span onClick={()=>{KeyPressHandler("U")}}>U</span>
          <span onClick={()=>{KeyPressHandler("I")}}>I</span>
          <span onClick={()=>{KeyPressHandler("O")}}>O</span>
          <span onClick={()=>{KeyPressHandler("P")}}>P</span>
        </div>
        <div className={keyboardCss["line2"]}>
          <span onClick={()=>{KeyPressHandler("A")}}>A</span>
          <span onClick={()=>{KeyPressHandler("S")}}>S</span>
          <span onClick={()=>{KeyPressHandler("D")}}>D</span>
          <span onClick={()=>{KeyPressHandler("F")}}>F</span>
          <span onClick={()=>{KeyPressHandler("G")}}>G</span>
          <span onClick={()=>{KeyPressHandler("H")}}>H</span>
          <span onClick={()=>{KeyPressHandler("J")}}>J</span>
          <span onClick={()=>{KeyPressHandler("K")}}>K</span>
          <span onClick={()=>{KeyPressHandler("L")}}>L</span>
        </div>
        <div className={keyboardCss["line3"]}>
          <span onClick={submitCharHandler} style={{'width':'110px'}}>Enter</span>
          <span onClick={()=>{KeyPressHandler("Z")}}>Z</span>
          <span onClick={()=>{KeyPressHandler("X")}}>X</span>
          <span onClick={()=>{KeyPressHandler("C")}}>C</span>
          <span onClick={()=>{KeyPressHandler("V")}}>V</span>
          <span onClick={()=>{KeyPressHandler("B")}}>B</span>
          <span onClick={()=>{KeyPressHandler("N")}}>N</span>
          <span onClick={()=>{KeyPressHandler("M")}}>M</span>
          <span onClick={removeCharHandler} style={{'width':'110px', 'padding':'0', 'paddingTop':'11px'}}><FontAwesomeIcon icon={faDeleteLeft}  /></span>
        </div>

      </div>
    </>
  );
};

export default KeyboardComponent;
