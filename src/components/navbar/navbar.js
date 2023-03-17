import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { react, useState } from "react";
import {
  faBars,
  faCircleQuestion,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import NavbarCss from "./navbar.module.css";

import { Dialog } from "primereact/dialog";
import HowToPlayComponent from "../how-to-play/how-to-play";

const NavbarComponent = () => {
  const [showHowToPlayGuideModel, setShowHowToPlayGuideModel] = useState(() => {
    return false;
  });

  return (
    <>
      <nav className=" navbar is-black pb-1  ">
        {/* <div className="navbar-brand ">
           <a className="navbar-item is-size-3" href="https://bulma.io">
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div> */}

        <div className="navbar-menu is-inline">
          <div className="navbar-end ">
            <p
              id={NavbarCss["project-name"]}
            >
              Paen Wordle
            </p>
            {/* <a className="navbar-item is-size-3" href="https://bulma.io">
              <FontAwesomeIcon icon={faGear} />
            </a>{" "}
            &nbsp;
            <a onClick={() => {
                  setShowHowToPlayGuideModel(true);
                }} className="navbar-item is-size-3">
              <FontAwesomeIcon
                icon={faCircleQuestion}

              />
            </a> */}
          </div>
        </div>
      </nav>

      {/* how to play guide model */}

      {showHowToPlayGuideModel ? (
        <Dialog
          visible={true}
          onHide={() => {
            setShowHowToPlayGuideModel(false);
          }}
          breakpoints={{ "960px": "75vw", "640px": "100vw" }}
          style={{ width: "30vw" }}
          header="Playing Guide!"
          headerStyle={{ backgroundColor: "#121213", color: "white" }}
          contentStyle={{ backgroundColor: "#121213", color: "white" }}
          draggable={false}
        >
          <HowToPlayComponent />

        </Dialog>
      ) : null}
    </>
  );
};

export default NavbarComponent;
