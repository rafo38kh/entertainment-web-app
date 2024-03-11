export type Props<T> = {
  data?: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
};

const GenericList = <T extends unknown>({
  data = [],
  renderItem,
  keyExtractor,
}: Props<T>) => {
  return (
    <ul className="flex gap-4 overflow-x-scroll no-scrollbar mt-4">
      {data?.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </ul>
  );
};

export default GenericList;
