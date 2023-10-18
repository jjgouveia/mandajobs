type Props = {
  title: string;
  description: string;
  icon: any;
};

export default function Card({
  title,
  description,
  icon,
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="group block h-full shadow-md rounded-xl border border-slate-500/30 bg-zinc-700/60 p-7">
      <div className="flex flex-col flex-wrap gap-3">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-12 h-12 flex justify-center items-center border border-slate-500/10 rounded-3xl">
            {icon}
          </div>
          <h3 className=" text-slate-100 text-xl text-center font-semibold tracking-wide">
            {title}
          </h3>
        </div>
        <p className="font-medium text-lg leading-relaxed text-slate-100 text-justify select-none">
          {description}
        </p>
      </div>
    </div>
  );
}
