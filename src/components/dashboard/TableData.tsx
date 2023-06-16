import axios from "axios";
import { useNavigate } from "react-router-dom";

type TableDataProps = {
  id: string;
  name: string;
  isActive: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateCategoryData: (id: string) => void;
};

export const TableData = ({
  id,
  name,
  isActive,
  setIsLoading,
  updateCategoryData,
}: TableDataProps) => {
  const navigate = useNavigate();

  const deleteSelectedData = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      updateCategoryData(id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <tr className="text-lg border-x border-b border-x-slate-300 border-b-slate-300">
      <td className="px-3 py-2">{id}</td>
      <td className="px-3 py-2 text-center">{name}</td>
      <td className="px-3 py-2 text-center text-xl">
        {isActive ? "✔️" : "❌"}
      </td>
      <td className="flex gap-3 px-3 py-2 text-white text-xl center">
        <button
          onClick={() => navigate(`./${id}`)}
          className="h-fit px-3 py-2 rounded-xl bg-blue-600"
        >
          ✏️
        </button>
        <button
          onClick={() => deleteSelectedData()}
          className="h-fit px-3 py-2 rounded-xl bg-rose-600"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};
