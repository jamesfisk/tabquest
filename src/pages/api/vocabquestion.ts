import path from 'path';
import { promises as fs } from 'fs';
import { getVocabQuestion } from '@/app/utils';

export default async function handler(req:any, res: any) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/word_data.json', 'utf8');
  const words = JSON.parse(fileContents);
  const question = getVocabQuestion(words);
  res.status(200).json(question);
}