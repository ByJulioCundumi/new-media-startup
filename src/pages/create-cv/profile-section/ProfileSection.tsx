import "./profileSection.scss";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import { setProfileContent } from "../../../reducers/profileSlice";
import Placeholder from "@tiptap/extension-placeholder";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen, updateSectionTitle } from "../../../reducers/cvSectionsSlice";

export default function ProfileSection() {

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "profileSection")
  );
            
  const isOpen = sectionState?.isOpen ?? false;

  const dispatch = useDispatch();
  const content = useSelector((state: IState) => state.profileSection);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          autolink: true,
          openOnClick: true,
        },
      }),
      Placeholder.configure({
      placeholder: "Redacta tu perfil profesional...",
      emptyNodeClass: "is-editor-empty",
      showOnlyWhenEditable: true,
    }),
    ],
    content,
    onUpdate: ({ editor }) => {
    dispatch(setProfileContent(editor.getHTML()));
  }
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();

    // evita repintar si no cambia
    if (current !== content) {
        editor.commands.setContent(content);
    }
   }, [content, editor]);

  // Sync editor -> Redux
  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
      dispatch(setProfileContent(editor.getHTML()));
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor, dispatch]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold"),
      isItalic: ctx.editor?.isActive("italic"),
      isUnderline: ctx.editor?.isActive("underline"),
      isOrderedList: ctx.editor?.isActive("orderedList"),
      isBulletList: ctx.editor?.isActive("bulletList"),
      isLink: ctx.editor?.isActive("link"),
    }),
  });

  const progress = useMemo(() => {
  if (!editor) return 0;

  const html = editor.getHTML();
  
  // Limpia tags html, saltos y espacios
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, "")
    .trim();

  return text.length > 0 ? 100 : 0;
}, [editor, content]);

  const commands = {
    toggleBold: () => editor?.chain().focus().toggleBold().run(),
    toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor?.chain().focus().toggleUnderline().run(),
    toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
    toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
    toggleAddLink: () => {
      const url = window.prompt("Ingresa un enlace:");
      if (!url) return;
      editor?.chain().focus().setLink({ href: url }).run();
    },
    generateAI: () => {},
  };

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "profileSection", progress }));
}, [progress, dispatch]);

const progressColorClass = useMemo(() => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue"; // 100%
}, [progress]);

// -----------------------------
      // 🔵 STATE PARA EDICIÓN DEL TÍTULO
      // -----------------------------
      const [editingTitle, setEditingTitle] = useState(false);
      const title = sectionState?.title ?? "Perfil";

  return (
    <div className={`profile-section ${isOpen ? "open" : "closed"}`}>
      <div className="profile-section__header">
        {/* TÍTULO EDITABLE */}
      <div className="editable-title">
        {!editingTitle ? (
          <h2
            className="title-display"
            onClick={() => setEditingTitle(true)}
          >
            <MdOutlineWorkOutline /> {title}
          </h2>
        ) : (
          <input
            className="title-input"
            autoFocus
            value={title}
            onChange={(e) =>
              dispatch(updateSectionTitle({ name: "profileSection", title: e.target.value }))
            }
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
          />
        )}
      </div>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("profileSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="profile-section__content">
          <nav className="toolbar">
            <div className="toolbar-left">
              <button
                onClick={commands.toggleBold}
                className={editorState.isBold ? "active" : ""}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"></path>
                </svg>
              </button>

              <button
                onClick={commands.toggleItalic}
                className={editorState.isItalic ? "active" : ""}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"></path>
                </svg>
              </button>

              <button
                onClick={commands.toggleUnderline}
                className={editorState.isUnderline ? "active" : ""}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"></path>
                </svg>
              </button>

              <button
                onClick={commands.toggleOrderedList}
                className={editorState.isOrderedList ? "active" : ""}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path>
                </svg>
              </button>

              <button
                onClick={commands.toggleBulletList}
                className={editorState.isBulletList ? "active" : ""}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path>
                </svg>
              </button>

              <button
                onClick={commands.toggleAddLink}
                className={editorState.isLink ? "active" : ""}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path>
                </svg>
              </button>
            </div>

            <div className="toolbar-right">
              <button className="toolbar-save">Tips</button>
            </div>
          </nav>

          <div className="editor-card">
            <EditorContent editor={editor} className="tiptap" />
          </div>

          <button className="ai-btn" onClick={commands.generateAI}>
            Generar con IA
          </button>
        </div>
      )}
    </div>
  );
}
