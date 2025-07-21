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
    const { title, tools, toolsIdontUse, level } = req.body;

    if (!title || !tools || !toolsIdontUse) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Montar keywords com base nos parâmetros
    const keywords = `${title}, ${tools}, ${toolsIdontUse}, nível ${level || 'Junior'}`;
    
    // Gerar a query usando o fluxo de AI
    const result = await generateLinkedInQuery({
      keywords
    });

    // Salvar a query gerada no Firestore
    try {
      await addDoc(collection(db, "queries"), {
        query_string: result.booleanQuery,
        timestamp: new Date(),
      });
      console.log("Query salva no Firestore com sucesso");
    } catch (error) {
      console.error("Erro ao salvar query no Firestore:", error);
      // Não retornamos erro aqui pois o importante é gerar a query
    }

    // Retornar a query gerada
    return res.status(200).json({ query: result.booleanQuery });
    
  } catch (error: any) {
    console.error('Erro ao gerar query:', error);
    return res.status(500).json({ 
      error: 'Erro ao processar a requisição',
      message: error.message || 'Erro desconhecido'
    });
  }
}
