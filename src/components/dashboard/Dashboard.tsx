import { useEffect, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import axios from "axios";
import { TableData } from "./TableData";
import { Loading } from "../Loading";

type CategoryDataType = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export const Dashboard = () => {
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFromAPI = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://mock-api.arikmpt.com/api/category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategoryData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFromAPI();
  }, []);

  return (
    <>
      <DashboardHeader />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
        <div className="w-4/5 max-w-3xl flex flex-col items-left gap-6 py-8 px-8 overflow-auto rounded-[2rem] bg-slate-50">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div>
                <button className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]">
                  Add Data
                </button>
              </div>

              <table className="w-full table-auto border-collapse border border-slate-600">
                <thead className="text-left bg-slate-400">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Is Active</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData?.map((data) => (
                    <TableData
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      isActive={data.is_active}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
    </>
  );
};
