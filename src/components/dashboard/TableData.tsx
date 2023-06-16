type TableDataProps = {
  id: string;
  name: string;
  isActive: boolean;
};

export const TableData = ({ id, name, isActive }: TableDataProps) => {
  return (
    <tr className="text-lg border-b border-b-slate-300">
      <td className="px-3 py-2">{id}</td>
      <td className="px-3 py-2 text-center">{name}</td>
      <td className="px-3 py-2 text-center text-xl">{isActive ? "✔️" : "❌"}</td>
      <td className="flex gap-3 px-3 py-2 text-white text-xl center">
        <button className="h-fit px-3 py-2 rounded-xl bg-blue-600">✏️</button>
        <button className="h-fit px-3 py-2 rounded-xl bg-rose-600">🗑️</button>
      </td>
    </tr>
  );
};
