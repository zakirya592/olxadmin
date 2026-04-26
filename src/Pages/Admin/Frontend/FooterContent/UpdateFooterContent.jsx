import { useState } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../../utils/NewRequest";

const UpdateFooterContent = ({
  isVisible,
  setVisibility,
  refreshFooterContentData,
}) => {
  const updateFooterContentData = JSON.parse(
    sessionStorage.getItem("updateFooterContent")
  );
  const [heading, setHeading] = useState(updateFooterContentData?.heading || "");
  const [description, setDescription] = useState(
    updateFooterContentData?.description || ""
  );

  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };

  const handleUpdateFooterContent = async () => {
    if (!heading.trim() || !description.trim()) {
      toast.error("Heading and description are required");
      return;
    }

    try {
      await NewRequest.put(`/footerContent/${updateFooterContentData?._id}`, {
        heading: heading.trim(),
        description: description.trim(),
      });

      toast.success("Footer content has been updated successfully", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      refreshFooterContentData();
      handleCloseUpdatePopup();
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error while updating footer content",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        }
      );
    }
  };

  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container bg-gray-100 h-auto sm:w-[45%] justify-center w-full">
            <div
              className="popup-form w-full"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <form className="w-full">
                <h2 className="text-loactioncolor font-sans font-semibold text-2xl">
                  Update Footer Content
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="heading" className="text-loactioncolor">
                      Heading
                    </label>
                    <input
                      type="text"
                      id="heading"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                      placeholder="Enter heading"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="description" className="text-loactioncolor">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateFooterContent}
                    className="px-5 py-2 rounded-sm w-[70%] bg-loactioncolor text-white font-body text-sm ml-2"
                  >
                    Update Footer Content
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

export default UpdateFooterContent;
