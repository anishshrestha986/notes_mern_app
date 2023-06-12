import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/dashboard/notecard.css";
import { INoteDetail } from "../../types/interfaces/api/note.interface";
import "quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
interface INoteCardField extends INoteDetail {
  toggleDeleteModal?: Function;
  toggleEditModal?: Function;
}
export default function NoteCard({
  title,
  content,
  author,
  createdAt,
  updatedAt,
  toggleDeleteModal,
  toggleEditModal,
}: INoteCardField) {
  const isoDate = new Date(createdAt);
  const formattedDate = `${
    isoDate.getMonth() + 1
  }/${isoDate.getDate()}/${isoDate.getFullYear()}`;
  const emptyModules = {
    toolbar: false,
  };

  return (
    <div className="note-wrapper">
      <div className="note-body">
        <div className="note-label">{title ? title : "New note"}</div>
        <div className="note-content">
          <ReactQuill
            modules={emptyModules}
            value={content}
            readOnly
            style={{
              height: "150px",
              width: "inherit",
              background: "transparent",
              overflow: "hidden",
            }}
          ></ReactQuill>
        </div>
      </div>
      <div className="posted-info">
        <div className="posted-by" onClick={() => toggleDeleteModal}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className="posted-by" onClick={() => toggleEditModal}>
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div className="posted-on">{formattedDate}</div>
      </div>
    </div>
  );
}
