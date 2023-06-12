import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export const success = (message: string) =>
  toast(message, {
    position: "bottom-left",
    className: "success",
    icon: <FontAwesomeIcon icon={faCircleCheck} className="icon" />,
  });

export const error = (message: string) =>
  toast(message, {
    position: "top-right",
    className: "error",
    icon: <FontAwesomeIcon icon={faCircleXmark} className="icon" />,
  });
