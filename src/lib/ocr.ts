import Tesseract from 'tesseract.js';

export async function parseDocument(file: File): Promise<string> {
  if (file.type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const mammoth = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.default.extractRawText({ arrayBuffer });
    return value;
  }

  const { data } = await Tesseract.recognize(file, 'eng');
  return data.text;
}
