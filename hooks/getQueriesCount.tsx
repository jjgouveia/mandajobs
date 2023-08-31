import { supabase } from "../utils/supabase";

const getQueriesCount = async (callback: Function): Promise<void | null> => {
  const { count, error } = await supabase
    .from("query_bucket")
    .select("*", { count: "exact" });

  if (error || !count) {
    console.error(error);
    return null;
  }
  callback(count);
};

export default getQueriesCount;
