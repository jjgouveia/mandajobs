import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const collectionRef = collection(db, 'queries');
    const snapshot = await getCountFromServer(collectionRef);
    return res.status(200).json({ count: snapshot.data().count });
  } catch (error) {
    console.error('Erro ao buscar contagem de consultas:', error);
    return res.status(500).json({ error: 'Erro ao buscar contagem' });
  }
}
