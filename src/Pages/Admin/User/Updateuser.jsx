import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "./Login.css";
import { RxCross2 } from "react-icons/rx";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Updateuser = ({ isVisible, setVisibility, refreshBrandData }) => {
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateuserdata"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilefrontcnic, setSelectedFilefrontcnic] = useState(null);
  const [selectedFilebackcnic, setSelectedFilebackcnic] = useState(null);
  const [selectedFileBusinessimageshow, setselectedFileBusinessimageshow] = useState(null)
  const [isGemstone, setIsGemstone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [taxNo, settaxNo] = useState("");
  const [id_cardNo, setid_cardNo] = useState("");
  const [Businessimageshow, setBusinessimageshow] = useState("");
  const [imageshowfrontcnic, setimageshowfrontcnic] = useState("");
  const [imageshowbackcnic, setimageshowbackcnic] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [aboutMe, setaboutMe] = useState("");
  const [companyLandLine, setCompanyLandLine] = useState("");
  const [status, setstatus] = useState(0);
  const [companyLandlineError, setCompanyLandlineError] = useState("");
  const [imageshow, setimageshow] = useState("");
  const [loading, setloading] = useState(false)

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

    const handleChange = (e) => {
      const value = e.target.value;
      // Remove non-numeric characters to enforce the format
      const formattedValue = value.replace(/[^0-9]/g, "");

      // Check if the length is within the allowed range
      if (formattedValue.length <= 13) {
        const parts = [];
        if (formattedValue.length > 5) {
          parts.push(formattedValue.substring(0, 5));
          if (formattedValue.length > 12) {
            parts.push(formattedValue.substring(5, 12));
            parts.push(formattedValue.substring(12, 13));
          } else {
            parts.push(formattedValue.substring(5));
          }
        } else {
          parts.push(formattedValue);
        }
        setid_cardNo(parts.join("-")); // Join the parts with a dash
      }
    };

  const handlecompanyLandLine = (value) => {
    // Reset error message
    setCompanyLandlineError("");

    if (value.startsWith("966")) {
      if (value.length > 12) {
        setCompanyLandlineError(
          `${t("Number must be a maximum of 12 digits")}`
        );
      }
    }

    // Set the mobile number
    setCompanyLandLine(value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    NewRequest.get(`/users/${updateBrandData?._id || ""}`).then((response) => {
      const userdata = response.data;
      setpassword(userdata?.password || "");
      setname(userdata?.username || "");
      setstatus(userdata?.status || 0);
      setemail(userdata?.email || "");
      setCompanyLandLine(userdata?.phone || "");
      setaddress(userdata?.address || "");
      setaboutMe(userdata?.aboutMe || "");
      setdateOfBirth(userdata?.dateOfBirth || "");
      const imageUrl = userdata?.image || "";
      const finalUrl = imageUrl && imageUrl.startsWith("https") ? imageUrl : imageLiveUrl(imageUrl);
      setimageshow(finalUrl || "");
      setIsGemstone(userdata?.isGemstone || false);
      setid_cardNo(userdata?.id_cardNo || "");
      settaxNo(userdata?.taxNo || "");

      const imageUrlcnicfront = userdata?.frontImage || "";
      const finalUrlcnicfront = imageUrlcnicfront && imageUrlcnicfront.startsWith("https") ? imageUrlcnicfront : imageLiveUrl(imageUrlcnicfront);
      setimageshowfrontcnic(finalUrlcnicfront || "");

      const imageUrlcnicback = userdata?.backImage || "";
      const finalUrlcnicback = imageUrlcnicback && imageUrlcnicback.startsWith("https") ? imageUrlcnicback : imageLiveUrl(imageUrlcnicback);
      setimageshowbackcnic(finalUrlcnicback || "");

      const imageUrlBusiness = userdata?.pictureBusinessCertificate || "";
      const finalUrlcnicBusiness = imageUrlBusiness && imageUrlBusiness.startsWith("https") ? imageUrlBusiness : imageLiveUrl(imageUrlBusiness);
      setBusinessimageshow(finalUrlcnicBusiness || "");

    }).catch((err) => {
      console.log(err);
    });
  }, []);

    function handleChangebackfrontcnic(e) {
      setSelectedFilefrontcnic(e.target.files[0]);
      setimageshowfrontcnic(e.target.files[0]);
    }
    function handleChangebackbackcnic(e) {
      setSelectedFilebackcnic(e.target.files[0]);
      setimageshowbackcnic(e.target.files[0]);
    }
      function handleChangeBusiness(e) {
        setselectedFileBusinessimageshow(e.target.files[0]);
        setBusinessimageshow(e.target.files[0]);
      }

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
    if (isGemstone) {
      formData.append("isGemstone", true);
      formData.append("pictureBusinessCertificate", Businessimageshow);
      formData.append("frontImage", imageshowfrontcnic);
      formData.append("backImage", imageshowbackcnic);
      formData.append("taxNo", taxNo);
      formData.append("id_cardNo", id_cardNo);
    }
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
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 relative">
                    <label htmlFor="password" className={`text-loactioncolor`}>
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder={`Enter password`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                    <div
                      className="absolute inset-y-0 right-0 text-black mt-7 flex items-center pr-3 cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
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
                  <div className="flex justify-between flex-col sm:flex-row mb-10">
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

                {isGemstone && (
                  <>
                    {/* ID Card Number */}
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label
                        htmlFor="idCardNumber"
                        className={`text-loactioncolor`}
                      >
                        ID card / Passport Number
                      </label>
                      <input
                        type="text"
                        id="idCardNumber"
                        value={id_cardNo}
                        onChange={handleChange}
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                        placeholder="Enter your ID card / Passport Number"
                      />
                    </div>

                    {/* Tax Number */}
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label
                        htmlFor="taxNumber"
                        className={`text-loactioncolor`}
                      >
                        Tax No
                      </label>
                      <input
                        type="text"
                        id="taxNumber"
                        value={taxNo}
                        onChange={(e) => settaxNo(e.target.value)}
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                        placeholder="Enter Tax No"
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="flex justify-between flex-col sm:flex-row">
                      <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                        <label
                          htmlFor="Business"
                          className={`text-loactioncolor`}
                        >
                          Business Certificate
                        </label>
                        <div className="imgesection">
                          <img
                            src={
                              selectedFileBusinessimageshow
                                ? URL.createObjectURL(
                                    selectedFileBusinessimageshow
                                  )
                                : Businessimageshow != null
                                ? Businessimageshow
                                : ""
                            }
                            className="printerpic text-black"
                            alt="Uploaded Business Certificate"
                            style={{
                              width: "200px",
                              height: "200px",
                            }}
                          />
                          <div className="row " htmlFor="file-inputs">
                            <label
                              htmlFor="Business"
                              className="choosefile bg-loactioncolor hover:bg-primary"
                            >
                              Upload
                            </label>
                            <input
                              id="Business"
                              type="file"
                              onChange={handleChangeBusiness}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                        <label
                          htmlFor="frontCNIC"
                          className={`text-loactioncolor`}
                        >
                          Front CNIC
                        </label>
                        <div className="imgesection">
                          <img
                            src={
                              selectedFilefrontcnic
                                ? URL.createObjectURL(selectedFilefrontcnic)
                                : imageshowfrontcnic != null
                                ? imageshowfrontcnic
                                : ""
                            }
                            className="printerpic text-black"
                            alt="Front CNIC"
                            style={{
                              width: "200px",
                              height: "200px",
                            }}
                          />
                          <div className="row " htmlFor="file-inputs">
                            <label
                              htmlFor="frontCNIC"
                              className="choosefile bg-loactioncolor hover:bg-primary"
                            >
                              Upload
                            </label>
                            <input
                              id="frontCNIC"
                              type="file"
                              onChange={handleChangebackfrontcnic}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                        <label
                          htmlFor="backcnic"
                          className={`text-loactioncolor`}
                        >
                          Back CNIC
                        </label>
                        <div className="imgesection">
                          <img
                            src={
                              selectedFilebackcnic
                                ? URL.createObjectURL(selectedFilebackcnic)
                                : imageshowbackcnic != null
                                ? imageshowbackcnic
                                : ""
                            }
                            className="printerpic text-black"
                            alt="Back CNIC"
                            style={{
                              width:
                                selectedFilebackcnic || imageshowbackcnic
                                  ? "200px"
                                  : "200px",
                              height:
                                selectedFilebackcnic || imageshowbackcnic
                                  ? "200px"
                                  : "200px",
                            }}
                          />
                          <div className="row " htmlFor="backcnic">
                            <label
                              htmlFor="backcnic"
                              className="choosefile bg-loactioncolor hover:bg-primary"
                            >
                              Upload
                            </label>
                            <input
                              id="backcnic"
                              type="file"
                              onChange={handleChangebackbackcnic}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-loactioncolor text-white font-body text-sm ml-2"
                  >
                    {loading ? "Loading...." : "Update User"}
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
