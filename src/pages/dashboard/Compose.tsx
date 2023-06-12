import { useRef } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import TextEditor from "../../components/TextEditor";
import useFormInput from "../../hooks/useFormInput";
import "../../styles/dashboard/text-editor.css";
import ReactQuill from "react-quill";
import { createNote as createNoteUser } from "../../api/note";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import {
  INoteDetail,
  INoteRequest,
  INotesResponse,
} from "../../types/interfaces/api/note.interface";
export default function ComposeNote() {
  const editorRef = useRef<ReactQuill>(null);

  const input = useFormInput([{ name: "title" }]);
  const nav = useNavigate();

  const { mutate: createNote } = useCustomMutation<INoteRequest, INoteDetail>({
    api: createNoteUser,
    onSuccess: () => {
      nav("/mynotes");
      toast.success("Note Saved");
    },
    onError: () => {
      toast.error(" An error occured");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editorRef?.current?.unprivilegedEditor) return;

    const data = {
      title: input.title.value,
      content: editorRef.current.unprivilegedEditor.getContents(),
    };

    console.log(data);
    createNote(data);
  };
  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="heading">Title</div>

        <InputField
          inputType="text"
          name="title"
          onChange={input[`title`].handleChange}
          style={{
            outline: "none",
            border: "1px solid var(--secondary-color)",
            width: "100%",
            height: "50px",
          }}
        />
        <div className="heading">Content</div>
        <TextEditor editorRef={editorRef} />
        <Button style={{ marginTop: "2rem", width: "200px" }}>Save Note</Button>
      </form>
    </div>
  );
}
