import { react } from "react";
import KeyboardComponent from "../keyboard/keyboard";
import TriesBoxesComponent from "../tries-boxes/tries-boxes";
import MainSectionCss from "./main-section.module.css";
const MainSectionComponent = () => {
  return (
    <>
      <div className={MainSectionCss["main-screen-section"]}>
        {/* <div className={MainSectionCss["tries-and-keyboard-section"]}>
      

      <div className={MainSectionCss['tries-section']}>

        <h1>dasf</h1>

      </div>



        </div> */}

        <div className="columns is-mobile">
          <div className="column  is-offset-2  is-8">
            {/* <div className={MainSectionCss["tries-section"]}>
              <div className={MainSectionCss["single-row"]}>
                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>
              </div>

              <div className={MainSectionCss["single-row"]}>
                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>
              </div>

              <div className={MainSectionCss["single-row"]}>
                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>
              </div>

              <div className={MainSectionCss["single-row"]}>
                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>
              </div>

              <div className={MainSectionCss["single-row"]}>
                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>
              </div>

              <div className={MainSectionCss["single-row"]}>
                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>

                <div className={MainSectionCss["single-box"]}>
                  <h1>Q</h1>
                </div>
              </div>
            </div> */}
            <br /><br /><br /><br /> 
            <TriesBoxesComponent /><br /><br /><br /><br /><br /><br />

            <KeyboardComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSectionComponent;
