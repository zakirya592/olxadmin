import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RxCross2 } from "react-icons/rx";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import NewRequest from "../../../../utils/NewRequest";

const ViewUser = ({ isVisible, setVisibility, refreshBrandData }) => {

    const updateBrandData = JSON.parse(sessionStorage.getItem("viewuserdata"));
    const [isGemstone, setIsGemstone] = useState(false);
    const [selectedFilefrontcnic, setSelectedFilefrontcnic] = useState(null);
    const [selectedFilebackcnic, setSelectedFilebackcnic] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [taxNo, settaxNo] = useState("");
    const [id_cardNo, setid_cardNo] = useState("");
    const [imageshow, setimageshow] = useState("");
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

    const handleCloseCreatePopup = () => {
        setVisibility(false);
    };

    const handlecompanyLandLine = (value) => {
        setCompanyLandlineError("");
        if (value.startsWith("966")) {
            if (value.length > 12) {
                setCompanyLandlineError(
                    `${t("Number must be a maximum of 12 digits")}`
                );
            }
        }
        setCompanyLandLine(value);
    };

    useEffect(() => {
        NewRequest.get(`/users/${updateBrandData?._id || ""}`).then((response) => {
            const userdata = response.data;
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
                                    View User
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
                                            readOnly
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
                                            readOnly
                                            required
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            placeholder={`Enter you Email`}
                                            className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                                        />
                                    </div>
                                    <PhoneInput international
                                        country={"pk"}
                                        defaultCountry={"pk"}
                                        value={companyLandLine}
                                        readOnly
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
                                    />
                                    {companyLandlineError && (
                                        <p className="text-red-600">{companyLandlineError}</p>
                                    )}
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
                                            readOnly
                                            required
                                            value={address}
                                            onChange={(e) => setaddress(e.target.value)}
                                            placeholder={`Enter your Address`}
                                            className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                                        />
                                    </div>
                                    {/* status */}
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
                                            readOnly
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
                                            </div>

                                            {/* </center> */}
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
                                                    //   onChange={handleChange}
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
                                                        htmlFor="Image"
                                                        className={`text-loactioncolor`}
                                                    >
                                                        Business Certificate
                                                    </label>
                                                    <div className="imgesection">
                                                        <img
                                                            src={
                                                                selectedFile
                                                                    ? URL.createObjectURL(selectedFile)
                                                                    : Businessimageshow != null
                                                                        ? Businessimageshow
                                                                        : ""
                                                            }
                                                            className="printerpic text-black"
                                                            alt="Uploaded Business Certificate"
                                                            style={{
                                                                width:
                                                                    selectedFile || Businessimageshow ? "200px" : "200px",
                                                                height:
                                                                    selectedFile || Businessimageshow ? "200px" : "200px",
                                                            }}
                                                        />
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
                                                                width:"200px",
                                                                height:"200px",
                                                            }}
                                                        />
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
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewUser;
