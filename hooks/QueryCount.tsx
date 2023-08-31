import { supabase } from "../utils/supabase";

const getSubscriberCount = async (callback: Function): Promise<void | null> => {
  const { count, error } = await supabase
    .from("consult")
    .select("*", { count: "exact" });

  if (error || !count) {
    console.error(error);
    return null;
  }
  callback(count);
};

export default getSubscriberCount;
