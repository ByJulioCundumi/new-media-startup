import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import "./RichTextEditor.scss";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Escribe aquí...",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass: "is-editor-empty",
      }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        onChange("");
        return;
      }

      const html = editor.getHTML();

      // Si es solo un <p>...</p> → quitamos las etiquetas envolventes
      if (html.startsWith("<p>") && html.endsWith("</p>")) {
        const innerContent = html.slice(3, -4);
        onChange(innerContent);
      } else {
        // Si hay listas, headings, múltiples bloques → mantenemos todo
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  // Sincronización segura cuando cambia `value` desde fuera (Redux, etc.)
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    const incoming = value ?? "";

    // Si viene texto plano (sin <p>), lo envolvemos solo para el editor
    const contentToSet = incoming === "" ? "<p></p>" : `<p>${incoming}</p>`;

    const currentHtml = editor.getHTML();

    // Evitamos bucles infinitos: solo actualizamos si realmente cambió
    if (currentHtml !== contentToSet && currentHtml !== incoming && currentHtml !== `<p>${incoming}</p>`) {
      editor.commands.setContent(contentToSet, { emitUpdate: false });
    }
  }, [value, editor]);

  // Comandos del toolbar
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const setLink = () => {
    const url = window.prompt("Ingresa el enlace:");
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().unsetLink().run();
      return;
    }
    editor?.chain().focus().setLink({ href: url }).run();
  };

  // Estado activo de los botones
  const isBold = editor?.isActive("bold");
  const isItalic = editor?.isActive("italic");
  const isUnderline = editor?.isActive("underline");
  const isOrdered = editor?.isActive("orderedList");
  const isBullet = editor?.isActive("bulletList");
  const isLink = editor?.isActive("link");

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <nav className="rich-text-editor__toolbar">
        <div className="rich-text-editor__toolbar-left">
          <button onClick={toggleBold} className={isBold ? "active" : ""} title="Negrita">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z" />
            </svg>
          </button>

          <button onClick={toggleItalic} className={isItalic ? "active" : ""} title="Cursiva">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z" />
            </svg>
          </button>

          <button onClick={toggleUnderline} className={isUnderline ? "active" : ""} title="Subrayado">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z" />
            </svg>
          </button>

          <button onClick={toggleOrderedList} className={isOrdered ? "active" : ""} title="Lista numerada">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
            </svg>
          </button>

          <button onClick={toggleBulletList} className={isBullet ? "active" : ""} title="Lista con viñetas">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
            </svg>
          </button>
        </div>

        <div className="rich-text-editor__toolbar-right">
          <button onClick={setLink} className={isLink ? "active" : ""} title="Enlace">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Editor */}
      <div className="rich-text-editor__editor-card">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}