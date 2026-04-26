import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DataTable from "../../../../components/DataTable/DataTable";
import { AdminFooterContent } from "../../../../../utils/Datatablesource";
import NewRequest from "../../../../../utils/NewRequest";
import AddFooterContent from "./AddFooterContent";
import UpdateFooterContent from "./UpdateFooterContent";

const FooterContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await NewRequest.get("/footerContent");
      setData(response?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch footer content");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const handleShowUpdatePopup = (row) => {
    sessionStorage.setItem("updateFooterContent", JSON.stringify(row));
    setUpdatePopupVisibility(true);
  };

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Are you sure to delete this record?",
      text: "You will not be able to recover this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,Delete",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#1E3B8B",
      cancelButtonColor: "#FF0032",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await NewRequest.delete("/footerContent/" + row?._id);
          if (isDeleted) {
            toast.success("Footer content has been deleted successfully!");
            const filteredData = data.filter((item) => item?._id !== row?._id);
            setData(filteredData);
          } else {
            toast.error("Failed to delete footer content");
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.error ||
              "Something went wrong while deleting footer content"
          );
        }
      }
    });
  };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      return;
    }
  };

  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div className="flex justify-center items-center">
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-4 bg-white shadow-xl rounded-md">
              <div className="flex px-3 flex-row justify-start">
                <button
                  onClick={handleShowCreatePopup}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                >
                  <i className="fas fa-plus mr-2"></i>Add Footer Content
                </button>
              </div>

              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title="Footer Content"
                  columnsName={AdminFooterContent}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}
                  dropDownOptions={[
                    {
                      label: "Edit",
                      icon: (
                        <EditIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleShowUpdatePopup,
                    },
                    {
                      label: "Delete",
                      icon: (
                        <DeleteIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleDelete,
                    },
                  ]}
                  uniqueId="footerContentMainTableId"
                />
              </div>
            </div>
          </div>
        </div>

        {isCreatePopupVisible && (
          <AddFooterContent
            isVisible={isCreatePopupVisible}
            setVisibility={setCreatePopupVisibility}
            refreshFooterContentData={fetchData}
          />
        )}

        {isUpdatePopupVisible && (
          <UpdateFooterContent
            isVisible={isUpdatePopupVisible}
            setVisibility={setUpdatePopupVisibility}
            refreshFooterContentData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default FooterContent;
