import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { react } from "react";
import { faBars, faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";
import NavbarCss from './navbar.module.css';
const NavbarComponent = () => {
  return (
    <>
      <nav className=" navbar is-black pb-1  ">

        <div className="navbar-brand ">
          <a className="navbar-item is-size-3" href="https://bulma.io">
            <FontAwesomeIcon icon={faBars} />
          </a>

        </div>

        <div className="navbar-menu is-inline">
          <div className="navbar-end ">
          <p id={NavbarCss['project-name']} className="is-hidden-mobile is-hidden-tablet-only">Paen Wordle </p>

            <a className="navbar-item is-size-3" href="https://bulma.io">
              <FontAwesomeIcon icon={faGear} /> 
            </a> &nbsp;

            <a className="navbar-item is-size-3" href="https://bulma.io">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </a>

          </div>
        </div> 
      </nav>
    </>
  );
};

export default NavbarComponent;
