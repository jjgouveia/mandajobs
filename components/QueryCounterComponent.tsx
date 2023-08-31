interface QueryCounterComponentProps {
  counter: number;
}

const QueryCounterComponent: React.FC<QueryCounterComponentProps> = ({
  counter,
}) => {
  return (
    <div className="roll-animation mb-2 mt-1 inline-block rounded-md bg-blue-300 px-1 py-1 font-semibold">
      <div className="-m-1 flex flex-wrap items-center">
        <div className="w-auto px-2 py-1">
          <span className="text-sm  text-slate-900">
            💼 Consultas geradas: {counter + 828}!
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueryCounterComponent;
