import { useState } from 'react';
import { parseDocument } from '../../lib/ocr';
import { storage } from '../../lib/storageClient';
import { supabase } from '../../lib/supabaseClient';

export default function UploadCV() {
  const [text, setText] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `cv/${Date.now()}_${file.name}`;
    const { error: uploadError } = await storage.from('documents').upload(path, file);
    if (uploadError) {
      console.error(uploadError);
    }
    const parsed = await parseDocument(file);
    await supabase.from('documents').insert({ path, text: parsed, type: 'cv' });
    setText(parsed);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload CV</h1>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFile}
        className="mb-4"
      />
      {text && (
        <textarea
          className="border p-2 w-full"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </div>
  );
}
