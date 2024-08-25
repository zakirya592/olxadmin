import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../../utils/NewRequest";

const AddfooterCategory = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [name, setname] = useState("");
  const [Page, setPage] = useState("");

  const [Category, setCategory] = useState("");
  const [Categorydropdown, setCategorydropdown] = useState([]);

  const getpagedata = async () => {
    try {
      const response = await NewRequest.get("/subCategory");
      setCategorydropdown(response?.data || []);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getpagedata();
  }, []);

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleAddCompany = async () => {
    try {
      const response = await NewRequest.post(
        "/footerCategory",
        {
          name: name,
          subCategory: Category,
          status: Page,
        },
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );
      console.log(response);
      toast.success(`Footer Category has been added successfully".`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Error", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(error);
    }
  };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50 ">
          <div className="popup-container bg-gray-100 h-auto sm:w-[45%] justify-center w-full">
            <div
              className="popup-form w-full "
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <form className="w-full">
                <h2
                  className={`text-loactioncolor font-sans font-semibold text-2xl`}
                >
                  Add Footer Category
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="name" className={`text-loactioncolor`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder={`Enter Name`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="Category" className={`text-loactioncolor`}>
                     Sub Category
                    </label>
                    <select
                      id="Category"
                      value={Category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      <option value="0"> Select </option>
                      {Categorydropdown &&
                        Categorydropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme._id}>
                              {itme.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className={`text-loactioncolor`}>
                      status
                    </label>
                    <select
                      id="status"
                      value={Page}
                      onChange={(e) => setPage(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      <option value="0"> status </option>
                      <option value="1">Active</option>
                      <option value="0">InActive</option>
                    </select>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-loactioncolor text-white font-body text-sm ml-2"
                  >
                    Add Footer Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddfooterCategory;