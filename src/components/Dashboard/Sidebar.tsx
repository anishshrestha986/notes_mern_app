import {
  faHome,
  faPlusCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "../../styles/dashboard/sidebar.css";
export default function SideBar() {
  const sideNavData = [
    {
      id: 0,
      icon: <FontAwesomeIcon icon={faHome} />,
      text: "My Notes",
      link: "/mynotes",
    },
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faPlusCircle} />,
      text: "Compose",
      link: "/mynotes/compose",
    },
    {
      id: 5,
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      text: "Logout",
      link: "/",
    },
  ];

  return (
    <>
      <div className="sideBarWrapper">
        <div className="sideLinksWrapper ">
          {sideNavData.map((item) => {
            return (
              <NavLink
                key={item.id}
                className={
                  item.text === "Logout"
                    ? "sideLinks sideLinkLogOut"
                    : "sideLinks"
                }
                end
                to={item.link}
              >
                <div>{item.icon}</div>
                <div className="linkText">{item.text}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
