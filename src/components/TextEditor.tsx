import "quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "../styles/dashboard/text-editor.css";
var modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],
  ],
};
var formats = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
];
interface ITextEditorProps extends ReactQuillProps {
  handleContentChange?: any;
  editorRef?: any;
}
const TextEditor = ({ editorRef }: ITextEditorProps) => {
  return (
    <div className="text-editor">
      <ReactQuill
        ref={editorRef}
        defaultValue={""}
        modules={modules}
        formats={formats}
        placeholder="Write your content ...."
        style={{
          height: "400px",
          backdropFilter: "blur(10px)",
          background: "var(--glass-background)",
          borderRadius: "20px",
        }}
      ></ReactQuill>
    </div>
  );
};

export default TextEditor;
