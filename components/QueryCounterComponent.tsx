interface QueryCounterComponentProps {
  counter: number;
}

const QueryCounterComponent: React.FC<QueryCounterComponentProps> = ({
  counter,
}) => {
  return (
    <div className="roll-animation mb-6 inline-block rounded-md bg-green-100 px-2 py-1 font-semibold">
      <div className="-m-1 flex flex-wrap items-center">
        <div className="w-auto px-2 py-1">
          <span className="text-sm">
            💼 Já geramos {counter} consultas, e centenas de oportunidades!
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueryCounterComponent;
