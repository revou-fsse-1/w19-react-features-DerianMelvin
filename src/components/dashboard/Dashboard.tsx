import { useEffect, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import axios from "axios";
import { TableData } from "./TableData";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

type CategoryDataType = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);

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
      setDisplayError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFromAPI();
  }, []);

  return (
    <>
      <DashboardHeader />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
        <div className="w-4/5 max-w-3xl flex flex-col items-left gap-6 py-10 px-8 overflow-auto rounded-[2rem] bg-slate-50">
          {isLoading ? (
            <Loading />
          ) : displayError ? (
            <div className="w-full flex items-center justify-center text-center">
              <h1 className="text-4xl">ERROR</h1>
              <p className="text-xl text-gray-400">Unable to fetch data</p>
            </div>
          ) : (
            <>
              <div>
                <button
                  onClick={() => navigate("./add")}
                  className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
                >
                  Add Data
                </button>
              </div>

              <table className="w-full table-auto border-collapse">
                <thead className="text-left text-white bg-[#1A5BB7]">
                  <tr>
                    <th className="px-3 py-2 rounded-tl-xl">Id</th>
                    <th className="min-w-fit px-3 py-2 text-center">
                      Name
                    </th>
                    <th className="min-w-fit w-28 px-3 py-2 text-center">
                      Is Active
                    </th>
                    <th className="min-w-fit w-36 px-3 py-2 rounded-tr-xl text-center">
                      Manage
                    </th>
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
