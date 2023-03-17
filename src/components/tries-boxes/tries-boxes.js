import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import triesBoxCss from './tries-boxes.module.css';
import Words from "../../data/filterWordsLengthFive.json"
import { Dialog } from "primereact/dialog";
import classNames from "classnames";
const TriesBoxesComponent = forwardRef((props, ref) => {

  // selected word to find
  const [actualWord, setActualWord] = useState(()=>{
    return randomWordPickedUp();
  })

  // char added to box array
  const [singleCharSelected, setSingleCharSelected] = useState(()=>{
    return [];
  });

  // words valid tries stores  and also found on list but not matched with selected word.
  const [wordsTried, setWordTried] = useState(()=>{
    return [];
  })

  // number of try or row user right now
  const [currentRow, setCurrentRow] = useState(()=>{
    return 1;
  })



  // validation states

  const [wordPressedLength, setWordPressedLength] = useState(()=>{
    return false;
  });

  const [notFoundWordInList, setNotFoundWordInList] = useState(()=>{
    return false;
  });

  const [charBasedBoxColor , setCharBasedBoxColor] = useState(()=>{
    return [];
  })

  // game over try again prompt
  const [gameOverDialog, setGameOverDialog] = useState(()=>{
    return false;
  })

  // no clicked styling handling
  const [notPlayAgain, setNotPlayAgain] = useState(()=>{
    return false;
  })

  useImperativeHandle(ref, () => ({

    removeCharFromListHandler() {

       // if data is found then delete it otherwise if it is click don't do anything.
      let updateCharState = singleCharSelected;
      let completedRow =  wordsTried.length;
      let subtractFromCurrentRowOnly = (singleCharSelected.length - completedRow * 5);

      if(subtractFromCurrentRowOnly > 0){
        if(updateCharState[updateCharState.length-1] !== " "){
          updateCharState.pop();
          setSingleCharSelected(()=>{
            return [...singleCharSelected];
          })
        }

      }
    },


    // submitting word

    submitWordHandler(){
      applyFlip();

      if(wordsTried[wordsTried.length-1] === actualWord){
        return;
      }

      // check the length of word added if less then 5 then return nothing
      if(currentRow * 5 !== singleCharSelected.length){
        setWordPressedLength(true);
        setTimeout(()=>{
        setWordPressedLength(false);
        }, 3000)
        return;
      }

      // pick last 5 char and now length is true
      const wordsList = Words;
      const enteredWord = singleCharSelected.slice(singleCharSelected.length - 5, singleCharSelected.length).join("").toLowerCase();
      // not valid word or not found inside list

      if(wordsList.findIndex(a=>a === enteredWord) === -1){
        setNotFoundWordInList(true);
        setTimeout(()=>{
          setNotFoundWordInList(false);
        }, 3000)
        return;
      }

      // keyboard color changing array when word is valid
      let keyboardSingleKeyStyle = [];

      // valid word but not matched with actual answer
      let assignStylingToBoxArr = [];
      if(enteredWord !== actualWord) {


          // if both index char is same then add green
        for(var i = 0; i < 5; i++){

        if(enteredWord[i] === actualWord[i]){
          assignStylingToBoxArr.push("success");
          keyboardSingleKeyStyle.push({singleAlph:enteredWord[i].toUpperCase(), color:"success"});
          continue;
        }

         // finding index for warning if the char is not in same position but in different place
         let findingIndex = actualWord.indexOf(enteredWord[i]);
         if(findingIndex !== -1){
           assignStylingToBoxArr.push("warning");
          keyboardSingleKeyStyle.push({singleAlph:enteredWord[i].toUpperCase(), color:"warning"});

           continue;
         }

        if(enteredWord[i] != actualWord[i]){
          assignStylingToBoxArr.push("dark");
          keyboardSingleKeyStyle.push({singleAlph:enteredWord[i].toUpperCase(), color:"dark"});

        }



      }


      }else if (enteredWord === actualWord){

        for(var i = 0; i < 5; i++){
          keyboardSingleKeyStyle.push({singleAlph:enteredWord[i].toUpperCase(), color:"success"});
          assignStylingToBoxArr.push("success");
        }

        setCurrentRow(6);
        let getSingleCharSelected = singleCharSelected;
        for(var i = singleCharSelected.length -1; i<= 36; i++){
          getSingleCharSelected.push(" ");
        }

        setNotPlayAgain(true);
      }


      setCharBasedBoxColor(()=>{
          return [...charBasedBoxColor ,...assignStylingToBoxArr];
        })

      // tries remaining

      setCurrentRow((prevsVal) =>  {return prevsVal + 1});
      let validWordButNotMatched = wordsTried;
         setWordTried((prevsWords)=>{
          return [...validWordButNotMatched, enteredWord];
        })

      if(validWordButNotMatched.length + 1 >= 6){
        if(enteredWord !== actualWord)
           setGameOverDialog(true);
      }


      // keyboard color changing effect algorithm
      props.keyboardStylingArr(keyboardSingleKeyStyle)




    }

  }));


  function randomWordPickedUp(){
    let randomIndexNumber = Math.floor(Math.random() * 8885) + 1;
    let singleWord = Words[randomIndexNumber];
    return singleWord;
  }

  // game over dialog
  function playAgainResetGameHandler(){
    setActualWord(()=>{
      return randomWordPickedUp();
    });

    setSingleCharSelected(()=>{
      return [];
    });

    setCharBasedBoxColor(()=>{
      return [];
    })

    setWordTried(()=>{
      return [];
    })

    setCurrentRow(()=>{
      return 1;
    })

    setGameOverDialog(()=>{
      return false;
    })


    props.keyboardStylingArr([{singleAlph:"", color:""}])



  }

  // dont want to play again

  function noResetGameHandler(){
    setGameOverDialog(false);
    setNotPlayAgain(true);
  }


  useEffect(()=>{
      console.log("actual word " + '"' + actualWord + '"');
      if(props.selectedKeyValue[0]) {

        // telling if 5 words are wrritten then dont add more character there anymore
      if((currentRow * 5) > singleCharSelected.length ){
        let multipleChars = [...singleCharSelected, props.selectedKeyValue[0]];
        setSingleCharSelected(()=>{
          return multipleChars;
        })

        // when 4 then also execute and then it will be become 5 so, next time it will not do the execution
      }

    }


  },[props.selectedKeyValue])



  // flipper handler
  function applyFlip() {
    var tiles = document.getElementsByClassName("inner");
    var tilesArray = Array.from(tiles);
    tilesArray.map(function (tile, i) {
      tile.classList.add("flipBox");
      tile.style.animationDelay = `${i * 100}ms`;
    });
  }



   return (
      <>

     {wordPressedLength ?<div className={triesBoxCss['validation-error']}>Not enough letters</div> : null}
     {notFoundWordInList ?<div className={triesBoxCss['validation-error']}>Not in word list</div> : null}


               <section className={triesBoxCss["section"]}>
            <div className="columns  is-centered ">
              <div
                className="column  is-one-third "
              >
                {/* single-row-column */}

                {/*
                grey dark color when no entered char is in inside the word
                bg sucess when char is on correct position and same text color
                bg warning when char is found but not in correct position and same color

                 */}

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? charBasedBoxColor[0] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 1 ? triesBoxCss['flipBox']:''  }`}  id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[0]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? charBasedBoxColor[1] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 1 ? triesBoxCss['flipBox']:''  }`}  id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[1]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? charBasedBoxColor[2] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 1 ? triesBoxCss['flipBox']:''  }`}  id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[2]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? charBasedBoxColor[3] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 1 ? triesBoxCss['flipBox']:''  }`}  id={triesBoxCss["single-gap-between-box"]}  >{singleCharSelected[3]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? charBasedBoxColor[4] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 1 ? triesBoxCss['flipBox']:''  }`}  id={triesBoxCss['gap-between-box-last']} >{singleCharSelected[4]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? charBasedBoxColor[5] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 2 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[5]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? charBasedBoxColor[6] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 2 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[6]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? charBasedBoxColor[7] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 2 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[7]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? charBasedBoxColor[8] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 2 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[8]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? charBasedBoxColor[9] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 2 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[9]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? charBasedBoxColor[10] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 3 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[10]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? charBasedBoxColor[11] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 3 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[11]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? charBasedBoxColor[12] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 3 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[12]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? charBasedBoxColor[13] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 3 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[13]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? charBasedBoxColor[14] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 3 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[14]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? charBasedBoxColor[15] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 4 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[15]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? charBasedBoxColor[16] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 4 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[16]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? charBasedBoxColor[17] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 4 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[17]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? charBasedBoxColor[18] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 4 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[18]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? charBasedBoxColor[19] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 4 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[19]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? charBasedBoxColor[20] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[20]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? charBasedBoxColor[21] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[21]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? charBasedBoxColor[22] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[22]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? charBasedBoxColor[23] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[23]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? charBasedBoxColor[24] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[24]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? charBasedBoxColor[25] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[25]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? charBasedBoxColor[26] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[26]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? charBasedBoxColor[27] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[27]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? charBasedBoxColor[28] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[28]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? charBasedBoxColor[29] : 'black'} has-text-white has-text-weight-bold py-0  ${wordsTried.length === 5 ? triesBoxCss['flipBox']:''  }`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[29]}</div>
                </div>
              </div>



            </div>
            </section>

     {notPlayAgain ? <><h1 style={{color:'white', textAlign:'center', fontSize:"1.5rem"}}>Wanna play again? <b><a href="/" className={triesBoxCss['refreshPage']}>Refresh the page!</a></b></h1><br /> </>: null}


        {/* game over play again */}


      {gameOverDialog ? (
        <Dialog
          visible={true}
          breakpoints={{ "960px": "75vw", "640px": "100vw" }}
          style={{ width: "30vw" }}
          header="Game End!"
          headerStyle={{ backgroundColor: "#121213", color: "white" }}
          contentStyle={{ backgroundColor: "#121213", color: "white" }}
          draggable={false}
          closable={false}
        >

        <h1 className={triesBoxCss['actualWordOnGameOver']}>Word is: <b>{actualWord}</b></h1>

        <h1 className={triesBoxCss['gameOver']}>GAME OVER</h1>


        <h2 className={triesBoxCss['playGame']}>PLAY AGAIN?</h2>

        <div className={triesBoxCss["yesAndNo"]}>
        <button onClick={playAgainResetGameHandler} style={{backgroundColor:'#55d155', width:'170px', height:'50px'}} className={classNames(triesBoxCss["customBtn"], triesBoxCss["btn4"], "")}>YES</button>
        <button onClick={noResetGameHandler} style={{backgroundColor:'red', width:'170px', height:'50px'}}  className={classNames(triesBoxCss["customBtn"], triesBoxCss["btn4"])}>NO</button>
        </div>


        </Dialog>
      ) : null}

        {/* word are guess on the given try */}

      </>
   )
});

export default TriesBoxesComponent;