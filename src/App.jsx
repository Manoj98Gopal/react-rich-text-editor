import { useState } from "react";
import EditorLayout from "./components/EditorLayout";

function App() {
  const [editorContent, setEditorContent] = useState("<p>Hello world!</p>");

  console.log("editor content : ",editorContent)

  return (
    <div className="p-10">
      <EditorLayout content={editorContent} onChange={setEditorContent} />
      <div className="mt-6 border p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
}

export default App;
