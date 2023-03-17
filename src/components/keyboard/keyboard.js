import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { react, useCallback, useEffect, useState } from "react";
import keyboardCss from "./keyboard.module.css";

const KeyboardComponent = (props) => {
  const [startGame, setStartGame] = useState(() => {
    return false;
  });

  const [validWordSended, setValidWordSended] = useState(() => {
    return false;
  });

  const [keyboardKeys, setKeyboardKeys] = useState(() => {
    return [
      { singleAlph: "Q", color: "grey" },
      { singleAlph: "W", color: "grey" },
      { singleAlph: "E", color: "grey" },
      { singleAlph: "R", color: "grey" },
      { singleAlph: "T", color: "grey" },
      { singleAlph: "Y", color: "grey" },
      { singleAlph: "U", color: "grey" },
      { singleAlph: "I", color: "grey" },
      { singleAlph: "O", color: "grey" },
      { singleAlph: "P", color: "grey" },
      { singleAlph: "A", color: "grey" },
      { singleAlph: "S", color: "grey" },
      { singleAlph: "D", color: "grey" },
      { singleAlph: "F", color: "grey" },
      { singleAlph: "G", color: "grey" },
      { singleAlph: "H", color: "grey" },
      { singleAlph: "J", color: "grey" },
      { singleAlph: "K", color: "grey" },
      { singleAlph: "L", color: "grey" },
      { singleAlph: "Z", color: "grey" },
      { singleAlph: "X", color: "grey" },
      { singleAlph: "C", color: "grey" },
      { singleAlph: "V", color: "grey" },
      { singleAlph: "B", color: "grey" },
      { singleAlph: "N", color: "grey" },
      { singleAlph: "M", color: "grey" },
    ];
  });

  function KeyPressHandler(keyboardKey) {
    props.keyPressed(keyboardKey);
  }

  function removeCharHandler() {
    props.removeChar();
  }

  function submitCharHandler() {
    props.submittingWord();
  }

  function startGameHandler() {
    setStartGame(true);
  }

  const keyBoardKeyPressedByKeyboard = useCallback((event) => {
    // if game is started then allow to write something otherwise not
    if (startGame) {
      if (/^[a-zA-Z]+$/.test(event.key) && event.key.length === 1) {
        const singleLetter = event.key.toString().toUpperCase();
        props.keyPressed(singleLetter);
      }

      if (event.key === "Backspace") {
        props.removeChar();
      }

      if (event.key === "Enter") {
        props.submittingWord();
      }
    }
  });

  // if(props.KeyboardKeyWordPressedStyling.length > 0){
  //   console.log(props.KeyboardKeyWordPressedStyling);
  // }

  useEffect(() => {
    console.log("hello");

    if (startGame === true && validWordSended === false) {
      document.addEventListener("keydown", keyBoardKeyPressedByKeyboard, false);
      setValidWordSended(true);
    }

    if (props.KeyboardKeyWordPressedStyling.length > 0) {
      if (props.KeyboardKeyWordPressedStyling.length === 1) {
        setKeyboardKeys(() => {
          return [
            { singleAlph: "Q", color: "grey" },
            { singleAlph: "W", color: "grey" },
            { singleAlph: "E", color: "grey" },
            { singleAlph: "R", color: "grey" },
            { singleAlph: "T", color: "grey" },
            { singleAlph: "Y", color: "grey" },
            { singleAlph: "U", color: "grey" },
            { singleAlph: "I", color: "grey" },
            { singleAlph: "O", color: "grey" },
            { singleAlph: "P", color: "grey" },
            { singleAlph: "A", color: "grey" },
            { singleAlph: "S", color: "grey" },
            { singleAlph: "D", color: "grey" },
            { singleAlph: "F", color: "grey" },
            { singleAlph: "G", color: "grey" },
            { singleAlph: "H", color: "grey" },
            { singleAlph: "J", color: "grey" },
            { singleAlph: "K", color: "grey" },
            { singleAlph: "L", color: "grey" },
            { singleAlph: "Z", color: "grey" },
            { singleAlph: "X", color: "grey" },
            { singleAlph: "C", color: "grey" },
            { singleAlph: "V", color: "grey" },
            { singleAlph: "B", color: "grey" },
            { singleAlph: "N", color: "grey" },
            { singleAlph: "M", color: "grey" },
          ];
        });
        return;
      }

      let updateKeyboardStyle = [...keyboardKeys];
      // loop on keyboard props and then find that
      for (var singleKeyboardKey of props.KeyboardKeyWordPressedStyling) {
        const findingIndexSingleAlpha = updateKeyboardStyle.findIndex(
          (a) => a.singleAlph === singleKeyboardKey.singleAlph
        );

        if (findingIndexSingleAlpha !== -1) {
          if (
            updateKeyboardStyle[findingIndexSingleAlpha].color !== "success"
          ) {
            updateKeyboardStyle[findingIndexSingleAlpha].color =
              singleKeyboardKey.color;
          }
        }

        console.log(findingIndexSingleAlpha);
      }

      setKeyboardKeys(() => {
        return [...updateKeyboardStyle];
      });
    }
  }, [startGame, props.KeyboardKeyWordPressedStyling]);

  return (
    <>
      {/* start game button */}
      {startGame ? null : (
        <div className="has-text-centered">
          <button
            onClick={startGameHandler}
            className="button is-success is-large is-rounded"
          >
            Start game!
          </button>
        </div>
      )}

      {/* keyboard */}
      {startGame ? (
        <div className={keyboardCss.base}>
          <div className={keyboardCss["line1"]}>
            <span
              className={classNames(
                `has-background-${keyboardKeys[0].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[0].singleAlph);
              }}
            >
              {keyboardKeys[0].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[1].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[1].singleAlph);
              }}
            >
              {keyboardKeys[1].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[2].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[2].singleAlph);
              }}
            >
              {keyboardKeys[2].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[3].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[3].singleAlph);
              }}
            >
              {keyboardKeys[3].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[4].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[4].singleAlph);
              }}
            >
              {keyboardKeys[4].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[5].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[5].singleAlph);
              }}
            >
              {keyboardKeys[5].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[6].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[6].singleAlph);
              }}
            >
              {keyboardKeys[6].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[7].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[7].singleAlph);
              }}
            >
              {keyboardKeys[7].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[8].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[8].singleAlph);
              }}
            >
              {keyboardKeys[8].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[9].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[9].singleAlph);
              }}
            >
              {keyboardKeys[9].singleAlph}
            </span>
          </div>
          <div className={keyboardCss["line2"]}>
            <span
              className={classNames(
                `has-background-${keyboardKeys[10].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[10].singleAlph);
              }}
            >
              {keyboardKeys[10].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[11].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[11].singleAlph);
              }}
            >
              {keyboardKeys[11].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[12].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[12].singleAlph);
              }}
            >
              {keyboardKeys[12].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[13].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[13].singleAlph);
              }}
            >
              {keyboardKeys[13].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[14].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[14].singleAlph);
              }}
            >
              {keyboardKeys[14].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[15].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[15].singleAlph);
              }}
            >
              {keyboardKeys[15].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[16].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[16].singleAlph);
              }}
            >
              {keyboardKeys[16].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[17].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[17].singleAlph);
              }}
            >
              {keyboardKeys[17].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[18].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[18].singleAlph);
              }}
            >
              {keyboardKeys[18].singleAlph}
            </span>
          </div>
          <div className={keyboardCss["line3"]}>
            <span onClick={submitCharHandler} style={{ width: "110px" }}>
              Enter
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[19].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[19].singleAlph);
              }}
            >
              {keyboardKeys[19].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[20].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[20].singleAlph);
              }}
            >
              {keyboardKeys[20].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[21].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[21].singleAlph);
              }}
            >
              {keyboardKeys[21].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[22].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[22].singleAlph);
              }}
            >
              {keyboardKeys[22].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[23].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[23].singleAlph);
              }}
            >
              {keyboardKeys[23].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[24].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[24].singleAlph);
              }}
            >
              {keyboardKeys[24].singleAlph}
            </span>
            <span
              className={classNames(
                `has-background-${keyboardKeys[25].color}`,
                keyboardCss["hoverBtn"]
              )}
              onClick={() => {
                KeyPressHandler(keyboardKeys[25].singleAlph);
              }}
            >
              {keyboardKeys[25].singleAlph}
            </span>
            <span
              onClick={removeCharHandler}
              style={{ width: "110px", padding: "0", paddingTop: "11px" }}
            >
              <FontAwesomeIcon icon={faDeleteLeft} />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default KeyboardComponent;

function customPromise(dataReciveFromComponent) {
  return new Promise((resolve, reject) => {
    if (1 + 1 == 2) {
      resolve("yes");
    } else {
      reject("no");
    }
  });
}

(async function () {
  try {
    const data = await customPromise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();

console.log("Abobakar");

// the above code is already delay becuase console.log execute first and then asynchronous function execute.

const promise = (n = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("resolved");
    }, n);
  });

async function testPromise(n = 1000) {
  await promise(n);
  console.log("promise finished #1");
  promise(n).then(() => {
    console.log("promise finished #2");
  });
}

console.log("begin");
testPromise(5000);
console.log("end");
