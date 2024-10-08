import React, { useEffect, useState } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import NewRequest from '../../../../utils/NewRequest';
import Product from '../Product/Product';
import Activeproduct from "../../../assets/Images/Activeproduct.png"
import Rejectedproduct from "../../../assets/Images/Rejectedproduct.jpg"
import totalproduct from "../../../assets/Images/totalproduct.png"
import Pendingproduct from "../../../assets/Images/Pendingproduct.jpg"

function Dashboard() {
    
  const [loading, setLoading] = useState(true);
 const [productCounts, setProductCounts] = useState({ active: 0, pending: 0, rejected: 0 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await NewRequest.get("/product/countProductsByStatus");
      setProductCounts(response?.data || { active: 0, pending: 0, rejected: 0 });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = productCounts.active + productCounts.pending + productCounts.rejected;

  return (
    <>
      <div className={`p-0 h-full sm:ml-72`}>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4 bg-gradient-to-r from-[#C3E2DC] mt-5">
          <div className="h-auto w-full bg-[#345ECC] rounded-lg">
            <div>
              <div className="flex justify-between items-center px-3 py-3">
                <img
                  src={Activeproduct}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
                {loading ? (
                  <CircularProgress style={{ color: "#ffffff" }} />
                ) : (
                  <p className="font-sans font-semibold text-3xl text-white -mt-4">
                    {productCounts.active}
                  </p>
                )}
              </div>
              <div className="w-full text-end -mt-1 px-2">
                <p className="font-sans font-normal text-sm text-gray-200">
                  Active Products
                </p>
              </div>
            </div>
          </div>
          <div className="h-auto w-full bg-[#F73F3F] rounded-lg">
            <div>
              <div className="flex justify-between items-center px-3 py-3">
                <img
                  src={Rejectedproduct}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
                {loading ? (
                  <CircularProgress style={{ color: "#ffffff" }} />
                ) : (
                  <p className="font-sans font-semibold text-3xl text-white -mt-4">
                    {productCounts.rejected}
                  </p>
                )}
              </div>
              <div className="w-full text-end -mt-1 px-2">
                <p className="font-sans font-normal text-md text-gray-200">
                  Rejected Products
                </p>
              </div>
            </div>
          </div>
          <div className="h-auto w-full bg-[#1CC085] rounded-md">
            <div>
              <div className="flex justify-between items-center px-3 py-3">
                <img
                  src={Pendingproduct}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
                {loading ? (
                  <CircularProgress style={{ color: "#ffffff" }} />
                ) : (
                  <p className="font-sans font-semibold text-3xl text-white -mt-4">
                    {productCounts.pending}
                  </p>
                )}
              </div>
              <div className="w-full text-end -mt-1 px-2">
                <p className="font-sans font-normal text-md text-gray-200">
                  Pending Products
                </p>
              </div>
            </div>
          </div>
          <div className="h-auto w-full bg-[#01A6BC] rounded-md">
            <div>
              <div className="flex justify-between items-center px-3 py-3">
                <img
                  src={totalproduct}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
                {loading ? (
                  <CircularProgress style={{ color: "#ffffff" }} />
                ) : (
                  <p className="font-sans font-semibold text-3xl text-white -mt-4">
                    {totalProducts}
                  </p>
                )}
              </div>
              <div className="w-full text-end -mt-1 px-2">
                <p className="font-sans font-normal text-md text-gray-200">
                  Total Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Product />
    </>
  );
}

export default Dashboard