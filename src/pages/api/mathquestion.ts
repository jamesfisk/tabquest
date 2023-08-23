import path from 'path';
import { promises as fs } from 'fs';
import { getMathQuestion, getVocabQuestion } from '@/app/utils';

export default async function handler(req:any, res: any) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/sat_math.json', 'utf8');
  const questions = JSON.parse(fileContents);
  const question = getMathQuestion(questions);
  res.status(200).json(question);
}