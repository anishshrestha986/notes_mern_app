import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
// import styles from "../styles/modal.module.css";

interface IModalProps {
  isShowing: boolean;
  hide: () => void;
  title: string;
  height?: string;
}

const Modal = ({
  isShowing,
  hide,
  title,
  children,
  height,
}: PropsWithChildren<IModalProps>) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div>
            <div>
              <div>
                <div>
                  <h4>{title}</h4>
                  <button type="button" onClick={hide}>
                    <span>&times;</span>
                  </button>
                </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
