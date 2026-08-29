const getQueriesCount = async (callback: (count: number) => void): Promise<void | null> => {
  try {
    const response = await fetch('/api/queries-count');

    if (!response.ok) {
      return null;
    }

    const { count } = await response.json();
    callback(count);
  } catch (error) {
    console.error('Error getting queries count:', error);
    return null;
  }
};

export default getQueriesCount;
