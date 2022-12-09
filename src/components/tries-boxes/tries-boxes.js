import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import triesBoxCss from './tries-boxes.module.css';
import Words from "../../data/filterWordsLengthFive.json"
const TriesBoxesComponent = forwardRef((props, ref) => {
  
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


  useImperativeHandle(ref, () => ({

    removeCharFromListHandler() {

       // if data is found then delete it otherwise if it is click don't do anything.
      let updateCharState = singleCharSelected;
      let completedRow =  wordsTried.length;
      let subtractFromCurrentRowOnly = (singleCharSelected.length - completedRow * 5);

      if(subtractFromCurrentRowOnly > 0){
        updateCharState.pop();
      setSingleCharSelected(()=>{
        return [...singleCharSelected];
      })
      }
    },
    

    // submitting word

    submitWordHandler(){
      applyFlip();

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

      if(wordsList.findIndex(a=>a === enteredWord)=== -1){
        setNotFoundWordInList(true);
        setTimeout(()=>{
          setNotFoundWordInList(false);
        }, 3000)
        return;
      }

      // valid word but not matched with actual answer
      if(enteredWord !== actualWord) {
        setCurrentRow((prevsVal) =>  {return prevsVal + 1});
        let validWordButNotMatched = wordsTried;
        setWordTried((prevsWords)=>{
          return [...validWordButNotMatched, enteredWord];
        }) 

      }
      // tries remaining


      
      // word is found in list or valid word but not matched with the selected word so first try completed now goto second try or row
      // also find if 6 tries completed or give correct 6 words but not matched with original giving word then game over
      // also if any char is in same or good position then that box will become green
      // also if any char is not in position but that char is inside this word then add the yellow box to it.
      // when try again or play again clicked then clean everything
      // start the game button will be allow to interact with keyboard
      // start the game and then start the stop watch as well with it.
      // if one char is found and enterword char placed in green as well and also it is also it is also yellow on onther box as well then dont show the effect of yellow only show green that is correctly placed only.






  

       

    

    }

  })); 


  function randomWordPickedUp(){
    let randomIndexNumber = Math.floor(Math.random() * 8885) + 1;
    let singleWord = Words[randomIndexNumber];
    return singleWord;
  }


  useEffect(()=>{

    console.log(actualWord);
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


               <section className="section">
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
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`}  id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[0]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[1]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[2]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}  >{singleCharSelected[3]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 1 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss['gap-between-box-last']} >{singleCharSelected[4]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[5]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[6]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[7]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[8]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 2 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[9]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[10]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[11]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[12]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[13]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 3 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[14]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[15]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[16]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[17]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[18]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 4 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[19]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[20]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[21]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[22]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[23]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 5 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[24]}</div>
                </div>
                
                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]} >{singleCharSelected[25]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[26]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[27]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss["single-gap-between-box"]}>{singleCharSelected[28]}</div>
                  <div className={`column is-1 box has-background-${wordsTried.length >= 6 ? 'dark' : 'black'} has-text-white has-text-weight-bold py-0  ${triesBoxCss['flipBox']}`} id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[29]}</div>
                </div>
              </div>

              
              
            </div>
            </section>
      </>
   )
});

export default TriesBoxesComponent;