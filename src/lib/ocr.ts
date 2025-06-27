import Tesseract from 'tesseract.js';

export async function parseImage(file: File): Promise<string> {
  const { data } = await Tesseract.recognize(file, 'eng');
  return data.text;
}
