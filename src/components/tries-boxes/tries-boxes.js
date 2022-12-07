import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import triesBoxCss from './tries-boxes.module.css';
const TriesBoxesComponent = forwardRef((props, ref) => {
   
  const [singleCharSelected, setSingleCharSelected] = useState(()=>{
    return [];
  })

  useImperativeHandle(ref, () => ({

    removeCharFromListHandler() {
       // if data is found then delete it otherwise if it is click don't do anything.
       
      let updateCharState = singleCharSelected;
      if(updateCharState.length > 0){
        updateCharState.pop();
      console.log(updateCharState);
      setSingleCharSelected(()=>{
        return [...singleCharSelected];
      })
      }
    },
    

    // submitting word

    submitWordHandler(){
      console.log("Yesss from triesBox");
    }

  })); 




  useEffect(()=>{

      if(props.selectedKeyValue[0]) {

        // telling if 5 words are wrritten then dont add more character there anymore
      if(singleCharSelected.length <= 4){
        let multipleChars = [...singleCharSelected, props.selectedKeyValue[0]];
        console.log(multipleChars);
        setSingleCharSelected(()=>{
          return multipleChars;
        })

        // when 4 then also execute and then it will be become 5 so, next time it will not do the execution
      }
     
    }
   
    
  },[props.selectedKeyValue])


  
   return (
      <>
               <section className="section">
            <div className="columns  is-centered ">
              <div
                className="column  is-one-third "
              >
                {/* single-row-column */}

                <div className="columns  is-centered is-mobile   " id={triesBoxCss["gap-between-box"]}>
                  <div className="column is-1 box has-background-dark" id={triesBoxCss['gap-between-box']} >{singleCharSelected[0]}</div>
                  <div className="column is-1 box  has-background-dark" id={triesBoxCss['gap-between-box']}>{singleCharSelected[1]}</div>
                  <div className="column is-1 box has-background-dark " id={triesBoxCss['gap-between-box']}>{singleCharSelected[2]}</div>
                  <div className="column is-1 box  has-background-dark" id={triesBoxCss['gap-between-box']}>{singleCharSelected[3]}</div>
                  <div className="column is-1 box has-background-dark " id={triesBoxCss['gap-between-box-last']}>{singleCharSelected[4]}</div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']} ></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box-last']}></div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']} ></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box-last']}></div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']} ></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box-last']}></div>
                </div>

                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']} ></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box-last']}></div>
                </div>
                
                <div className="columns  is-centered is-mobile  py-0" id={triesBoxCss["gap-between-box"]}>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']} ></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box']}></div>
                  <div className="column is-1 box has-background-dark py-0" id={triesBoxCss['gap-between-box-last']}></div>
                </div>
              </div>

              
              
            </div>
            </section>
      </>
   )
});

export default TriesBoxesComponent;