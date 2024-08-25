import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "./Login.css";
import { RxCross2 } from "react-icons/rx";

const Updateuser = ({ isVisible, setVisibility, refreshBrandData }) => {
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateuserdata"));
  const [name, setname] = useState(updateBrandData?.username || "");
  const [email, setemail] = useState(updateBrandData?.email || "");
  const [password, setpassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(
    updateBrandData?.dateOfBirth || ""
  );
  const [address, setaddress] = useState(updateBrandData?.address || "");
  const [aboutMe, setaboutMe] = useState(updateBrandData?.aboutMe || "");
  const [companyLandLine, setCompanyLandLine] = useState(
    updateBrandData?.phone || ""
  );

  const [status, setstatus] = useState(updateBrandData?.status || 0);
  const [companyLandlineError, setCompanyLandlineError] = useState("");
  const [loading, setloading] = useState(false)

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState(updateBrandData?.image || "");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  const handlecompanyLandLine = (value) => {
    // Reset error message
    setCompanyLandlineError("");

    // Check if the country code is for Saudi Arabia
    if (value.startsWith("966")) {
      // Check for mobile number (should start with '9665')
      // if (value.length > 1 && value[3] !== '5') {
      //     setCompanyLandlineError('Mobile number must start with 9665');
      // }

      // Check for maximum length (12 digits including country code)
      if (value.length > 12) {
        setCompanyLandlineError(
          `${t("Number must be a maximum of 12 digits")}`
        );
      }
    }

    // Set the mobile number
    setCompanyLandLine(value);
  };

  const handleAddCompany = async () => {
    setloading(true)
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("aboutMe", aboutMe);
    formData.append("phone", companyLandLine);
    formData.append("address", address);
    formData.append("status", status);
    formData.append("image", imageshow);
    try {
      const response = await NewRequest.put(
        `/users/${updateBrandData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setloading(false);
      toast.success(`Sign Up has been successfully".`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleCloseCreatePopup();
      refreshBrandData()
    } catch (error) {
      console.log(error);
       setloading(false);
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
          <div className="popup-container bg-gray-100  h-auto sm:w-[45%] justify-center w-full">
            <div
              className="popup-form w-full "
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="flex justify-end items-end text-end  w-full">
                <RxCross2
                  size={24}
                  onClick={handleCloseCreatePopup}
                  className="cursor-pointer"
                />
              </div>
              <form className="w-full">
                <h2
                  className={`text-loactioncolor font-sans font-semibold text-2xl`}
                >
                  Update User
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  {/* Username */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="name" className={`text-loactioncolor`}>
                      User Name
                    </label>
                    <input
                      type="text"
                      required
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder={`User Name`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  {/* Email */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="email" className={`text-loactioncolor`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder={`Enter you Email`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  <PhoneInput
                    international
                    country={"pk"}
                    defaultCountry={"pk"}
                    value={companyLandLine}
                    // onChange={setCompanyLandLine}
                    onChange={handlecompanyLandLine}
                    inputProps={{
                      id: "landline",
                      placeholder: "Company Landline",
                      autoComplete: "off",
                    }}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "0px",
                      border: "none",
                    }}
                    // required
                  />
                  {companyLandlineError && (
                    <p className="text-red-600">{companyLandlineError}</p>
                  )}
                  {/* Password */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="password" className={`text-loactioncolor`}>
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder={`Enter password`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  {/*  Date Of Birth */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="dateOfBirth"
                      className={`text-loactioncolor`}
                    >
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setdateOfBirth(e.target.value)}
                      //   placeholder={`User Name`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  {/* Address */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="address" className={`text-loactioncolor`}>
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      placeholder={`Enter your Address`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className={`text-loactioncolor`}>
                      status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      <option value="0">Inactive</option>
                      <option value="1">Active</option>
                    </select>
                  </div>
                  {/* aboutMe */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="aboutMe" className={`text-loactioncolor`}>
                      About Me
                    </label>
                    <textarea
                      type="text"
                      id="aboutMe"
                      value={aboutMe}
                      onChange={(e) => setaboutMe(e.target.value)}
                      placeholder={`Enter your About Me`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  {/* IMage */}
                  <div className="flex justify-between flex-col sm:flex-row">
                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                      {/* <center> */}
                      <label htmlFor="Image" className={`text-loactioncolor`}>
                        Image
                      </label>
                      <div className="imgesection">
                        <img
                          src={
                            selectedFile
                              ? URL.createObjectURL(selectedFile)
                              : imageshow != null
                              ? imageshow
                              : ""
                          }
                          className="printerpic"
                          style={{
                            width:
                              selectedFile || imageshow ? "200px" : "200px",
                            height:
                              selectedFile || imageshow ? "200px" : "200px",
                          }}
                        />

                        <div className="row " htmlFor="file-inputs">
                          <label
                            htmlFor="file-inputs"
                            className="choosefile bg-loactioncolor hover:bg-primary"
                          >
                            choose file
                          </label>
                          <input
                            id="file-inputs"
                            type="file"
                            onChange={handleChangeback}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>

                      {/* </center> */}
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-loactioncolor text-white font-body text-sm ml-2"
                  >
                     {loading?'Loading....': 'Update User'}
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

export default Updateuser;