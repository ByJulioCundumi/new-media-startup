import "./tiptap.scss";
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './Toolbar';
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";

function Tiptap() {
  const [isOpen, setIsOpen] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          autolink: true,
          openOnClick: true
        }
      })
    ],
    content: "<p>Redacta tu perfil profesional aquí...</p>"
  });

  useEffect(() => {
    const savedContent = window.localStorage.getItem("editor")
    if (savedContent) {
      editor?.commands.setContent(savedContent)
    }
  }, [editor])

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isLink: ctx.editor.isActive("link"),
    })
  })

  const commands = {
    toggleBold: () => editor?.chain().focus().toggleBold().run(),
    toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor?.chain().focus().toggleUnderline().run(),
    toggleH1: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    toggleH2: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleH3: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
    toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
    toggleAddLink: () => {
      const url = window.prompt("Ingresa un enlace:");
      if (!url) return;
      editor?.chain().focus().setLink({ href: url }).run();
    },
    saveContent: () => {
      const content = editor?.getHTML() ?? "";
      window.localStorage.setItem("editor", content);
    },
    generateAI: () => {
      editor?.commands.setContent(
        "<p>Soy un profesional altamente motivado con experiencia en...</p>"
      );
    }
  };

  return (
    <div className={`profile-section ${isOpen ? "open" : "closed"}`}>
      <div className="profile-section__header">
        <h2 onClick={() => setIsOpen(!isOpen)}>Perfil Profesional</h2>

        {/* botón con el onClick — solo aquí */}
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar sección" : "Abrir sección"}
          type="button"
        >
          {/* Un único icono, lo rotamos con CSS según .open */}
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="profile-section__content">
          <Toolbar commands={commands} editorState={editorState} />

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

export default Tiptap;
