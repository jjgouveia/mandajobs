"use server";
import { supabase } from "../utils/supabase";

const getSubscriberCount = async (): Promise<void | null> => {
  const { data, error } = await supabase.from("consults").select();
  console.log(data);
  if (error) {
    console.log(error);
    return null;
  }
};

export default async function SubscribersCount() {
  const count = await getSubscriberCount();
  if (!count) return <div className="mb-6 h-[32px]"></div>;

  return (
    <div className="roll-animation mb-6 inline-block rounded-md bg-green-100 px-2 py-1 font-semibold">
      <div className="-m-1 flex flex-wrap items-center">
        <div className="w-auto px-2 py-1">
          {/* <span className="text-sm">
            👋 Junte-se a {count.toLocaleString()} inscritos!
          </span> */}
        </div>
      </div>
    </div>
  );
}
