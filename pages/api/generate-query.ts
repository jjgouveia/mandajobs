import { NextApiRequest, NextApiResponse } from 'next';
import { generateLinkedInQuery } from '@/ai/flows/generate-linkedin-query';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    let { title, tools, toolsIdontUse, level } = req.body;

    if (level) {
      level = level.toLowerCase();
    }


    if (!title || !tools || !toolsIdontUse) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    type SeniorityKey = 'junior' | 'pleno' | 'senior' | 'estagiário';

    const seniorities: Record<SeniorityKey, string> = {
      junior: 'junior',
      pleno: 'medium',
      senior: 'senior',
      estagiário: 'intern',
    };

    const seniorityKey = (level as string) in seniorities
      ? (level as SeniorityKey)
      : 'junior';

    const result = await generateLinkedInQuery({
      title,
      tools,
      toolsIdontUse,
      level: seniorities[seniorityKey],
    });

    try {
      await addDoc(collection(db, "queries"), {
        query_string: result.booleanQuery,
        level: seniorityKey,
        title,
        tools,
        toolsIdontUse,
        timestamp: new Date(),
      });
      console.log("Query salva no Firestore com sucesso");
    } catch (error) {
      console.error("Erro ao salvar query no Firestore:", error);
    }

    return res.status(200).json({ query: result.booleanQuery });

  } catch (error: any) {
    console.error('Erro ao gerar query:', error);
    return res.status(500).json({
      error: 'Erro ao processar a requisição',
      message: error.message || 'Erro desconhecido'
    });
  }
}
