import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import "./profilesection.scss";

interface ProfileSectionProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  defaultValue = "",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: defaultValue || "<p>Redacta tu perfil profesional aquí...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
  });

  const setLink = () => {
    if (!editor) return;
    const url = window.prompt("Ingresa un enlace:");
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className={`profile-section-container ${isOpen ? "open" : "closed"}`}>
      <button className="profile-section-header" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="profile-section-title">Perfil Profesional</h4>
        {isOpen ? <FiChevronUp className="profile-section-icon" /> : <FiChevronDown className="profile-section-icon" />}
      </button>

      {isOpen && (
        <div className="profile-section-content">
          {editor && (
            <div className="toolbar">
              <button onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "active" : ""}>B</button>

              <button onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "active" : ""}>I</button>

              <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "active" : ""}>U</button>

              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "active" : ""}>H1</button>

              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive("heading", { level: 2 }) ? "active" : ""}>H2</button>

              <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive("heading", { level: 3 }) ? "active" : ""}>H3</button>

              <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "active" : ""}>•</button>

              <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "active" : ""}>1.</button>

              <button onClick={setLink}
                className={editor.isActive("link") ? "active" : ""}>🔗</button>
            </div>
          )}

          <div className="editor-wrapper">
            <EditorContent editor={editor} />
          </div>

          <button
            className="ai-button"
            onClick={() => {
              if (!editor) return;
              editor.commands.setContent(
                "<p>Soy un profesional altamente motivado con experiencia en...</p>"
              );
            }}
          >
            Generar con IA
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
