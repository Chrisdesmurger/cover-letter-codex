import { useState } from 'react';
import { parseImage } from '../../lib/ocr';

export default function UploadCV() {
  const [text, setText] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const parsed = await parseImage(file);
    setText(parsed);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload CV</h1>
      <input
        type="file"
        accept="image/*,.pdf"
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
