import { Box } from "@mui/material";
import imageLiveUrl from "./urlConverter/imageLiveUrl";


export const AdminUsersColumn = [
  {
    field: "url",
    headerName: "Name",
    width: 300,
  },
  {
    field: "image",
    headerName: "Image",
    width: 250,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px",
          height: "30px",
          lineHeight: "22px",
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

export const AdminaboutColumn = [
  {
    field: "caption",
    headerName: "Text",
    width: 350,
    renderCell: (params) => (
      <Box dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];


export const AdminSubCategory = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "catagory",
    headerName: "Catagory",
    width: 180,
    valueGetter: (params) => {
      const catagory = params;
      return catagory && catagory.name ? catagory.name : null; 
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
    return params ? new Date(params) : null;
    },
  },
];

export const AdminFooterCategory = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "subCategory",
    headerName: "Catagory",
    width: 180,
    valueGetter: (params) => {
      const catagory = params;
      return catagory && catagory.name ? catagory.name : null;
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

export const AdminMegaMenu = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "image",
    headerName: "Image",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    field: "icon",
    headerName: "Icon",
    width: 180,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.icon)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    field: "subCategories",
    headerName: "Sub Catagory",
    width: 180,
    valueGetter: (params) => {
      const subCategories = params;
      return subCategories && subCategories.length > 0
        ? subCategories.map((sub) => sub.name).join(", ")
        : "";
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

// Master data
export const AdminBrand = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    width: 180,
    // valueGetter: (params) => {
    //   const catagory = params;
    //   return catagory && catagory.name ? catagory.name : null;
    // },
  },
  {
    field: "footerCategory",
    headerName: "Footer Category",
    width: 180,
    // valueGetter: (params) => {
    //   const catagory = params;
    //   return catagory && catagory.name ? catagory.name : null;
    // },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

export const AdminMake = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    width: 180,
    // valueGetter: (params) => {
    //   const catagory = params;
    //   return catagory && catagory.name ? catagory.name : null;
    // },
  },
  {
    field: "footerCategory",
    headerName: "Footer Category",
    width: 180,
    // valueGetter: (params) => {
    //   const catagory = params;
    //   return catagory && catagory.name ? catagory.name : null;
    // },
  },
  {
    field: "image",
    headerName: "Image",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

export const Adminuser = [
  {
    field: "username",
    headerName: "UserName",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "address",
    headerName: "Address",
    width: 180,
  },
  {
    field: "dateOfBirth",
    headerName: "Date Of Birth",
    width: 180,
  },
  {
    field: "aboutMe",
    headerName: "About Me",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },

  {
    field: "frontImage",
    headerName: "Front CNIC",
    width: 180,
    renderCell: (params) => (
      <>
        <img
          src={imageLiveUrl(params.row.frontImage)}
          alt="frontImage"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
          }}
          onClick={() => {
            window.open(
              imageLiveUrl(params.row.frontImage),
              "_blank",
              "width=400,height=300,top=0,left=0"
            );
          }}
        />
      </>
    ),
  },

  {
    field: "backImage",
    headerName: "Back CNIC",
    width: 180,
    renderCell: (params) => (
      <>
        <img
          src={imageLiveUrl(params.row.backImage)}
          alt="backImage"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
          }}
          onClick={() => {
            window.open(
              imageLiveUrl(params.row.backImage),
              "_blank",
              "width=400,height=300,top=0,left=0"
            );
          }}
        />
      </>
    ),
  },

  {
    field: "pictureBusinessCertificate",
    headerName: "Business Certificate",
    width: 180,
    renderCell: (params) => (
      <>
        <img
          src={imageLiveUrl(params.row.pictureBusinessCertificate)}
          alt="backImage"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
          }}
          onClick={() => {
            window.open(
              imageLiveUrl(params.row.pictureBusinessCertificate),
              "_blank",
              "width=400,height=300,top=0,left=0"
            );
          }}
        />
      </>
    ),
  },

  {
    field: "image",
    headerName: "Profile Image",
    width: 180,
    editable: true,
    renderCell: (params) => {
      const imageUrl = params.row.image;
      const finalUrl =
        imageUrl && imageUrl.startsWith("https")
          ? imageUrl
          : imageLiveUrl(imageUrl);

      return imageUrl ? (
        <img
          src={finalUrl}
          alt="User image"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
          }}
          onClick={() => {
            window.open(
              imageLiveUrl(params.row.image),
              "_blank",
              "width=400,height=300,top=0,left=0"
            );
          }}
        />
      ) : (
        <span>No Image</span>
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
];

export const AdminProduct = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
  },
  {
    field: "price",
    headerName: "price",
    width: 180,
  },
  {
    field: "Category",
    headerName: "Category",
    width: 180,
    valueGetter: (params) => {
      const catagory = params;
      return catagory && catagory.name ? catagory.name : null;
    },
  },

  {
    field: "SubCategory",
    headerName: "SubCategory",
    width: 180,
    valueGetter: (params) => {
      const SubCategory = params;
      return SubCategory && SubCategory.name ? SubCategory.name : null;
    },
  },

  {
    field: "User",
    headerName: "User",
    width: 180,
    valueGetter: (params) => {
      const Username = params;
      return Username && Username.username ? Username.username : null;
    },
  },

  {
    field: "status",
    headerName: "status",
    width: 180,
    renderCell: (params) => {
      const status = params.row.status;
      let padding, text;

      if (status == "active") {
        padding = "2px";
        text = "Approved";
      } else if (status == "pending") {
        padding = "5px";
        text = "Pending";
      } else {
        padding = "5px";
        text = "Rejected";
      }

      return (
        <div
          style={{
            color: status === "active" ? "green" : status === "pending" ? "orange" : "red",
          }}
        >
          {text}
        </div>
      );
    },
  },
];