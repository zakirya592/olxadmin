import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Sidebar from "./components/Admin/Sidebar/Sidebar";
import Category from "./Pages/Admin/Frontend/Category/Category";
import SubCategory from "./Pages/Admin/Frontend/subCategory/SubCategory";
import FooterCategory from "./Pages/Admin/Frontend/FooterCategory/FooterCategory";
import Megamenu from "./Pages/Admin/Frontend/Megamenu/Megamenu";
import Brand from "./Pages/Admin/MasterData/Brand/Brand";
import Condition from "./Pages/Admin/MasterData/Condition/Condition";
import DeviceType from "./Pages/Admin/MasterData/DeviceType/DeviceType";
import Type from "./Pages/Admin/MasterData/Type/Type";
import Make from "./Pages/Admin/MasterData/Make/Make";
import Furnished from "./Pages/Admin/MasterData/Furnished/Furnished";
import Bedroom from "./Pages/Admin/MasterData/Bedroom/Bedroom";
import Users from "./Pages/Admin/User/Users";
import Bathroom from "./Pages/Admin/MasterData/Bathroom/Bathroom";
import Storey from "./Pages/Admin/MasterData/Storey/Storey";
import Construction from "./Pages/Admin/MasterData/Construction/Construction";
import Feature from "./Pages/Admin/MasterData/Feature/Feature";
import Areaunit from "./Pages/Admin/MasterData/Areaunit/Areaunit";
import ConstructionState from "./Pages/Admin/MasterData/ConstructionState/ConstructionState";
import OperatingSystem from "./Pages/Admin/MasterData/OperatingSystem/OperatingSystem";
import HardDriveType from "./Pages/Admin/MasterData/HardDriveType/HardDriveType";
import FunctionType from "./Pages/Admin/MasterData/FunctionType/FunctionType";
import SensorSize from "./Pages/Admin/MasterData/SensorSize/SensorSize";
import Wifi from "./Pages/Admin/MasterData/Wifi/Wifi";
import Resolution from "./Pages/Admin/MasterData/Resolution/Resolution";
import EngineType from "./Pages/Admin/MasterData/EngineType/EngineType";
import EngineCapacity from "./Pages/Admin/MasterData/EngineCapacity/EngineCapacity";
import ScreenSize from "./Pages/Admin/MasterData/ScreenSize/ScreenSize";
import MaxAperatureRange from "./Pages/Admin/MasterData/MaxAperatureRange/MaxAperatureRange";
import MinFocalLengthRange from "./Pages/Admin/MasterData/MinFocalLengthRange/MinFocalLengthRange";
import RegistrationCity from "./Pages/Admin/MasterData/RegistrationCity/RegistrationCity";
import HiringPerson from "./Pages/Admin/MasterData/HiringPerson/HiringPerson";
import CareerLevel from "./Pages/Admin/MasterData/CareerLevel/CareerLevel";
import PositionType from "./Pages/Admin/MasterData/PositionType/PositionType";
import TypeofAd from "./Pages/Admin/MasterData/TypeofAd/TypeofAd";
import Breed from "./Pages/Admin/MasterData/Breed/Breed";
import Sex from "./Pages/Admin/MasterData/Sex/Sex";
import Materialtype from "./Pages/Admin/MasterData/Materialtype/Materialtype";
import Handmade from "./Pages/Admin/MasterData/Handmade/Handmade";
import Origin from "./Pages/Admin/MasterData/Origin/Origin";
import Language from "./Pages/Admin/MasterData/Language/Language";
import MaxFocalLengthRange from "./Pages/Admin/MasterData/MaxFocalLengthRange/MaxFocalLengthRange";
import SelectionDataProvider from "./Contextapi/Selectioncardcontext";
import Product from "./Pages/Admin/Product/Product";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Adminlogin from "./Pages/Admin/Login/AdminLogin";
import Silder from "./Pages/Admin/Frontend/Silder/Silder";
import About from "./Pages/Admin/About/About";
import ContactUs from "./Pages/Admin/ContactUs/ContactUs";

const queryClient = new QueryClient();

function App() {
 
   const MainLayout = ({ children }) => {
     return (
       <div className="main-layout-container">
         <Sidebar />
         <span className="right-layout">{children}</span>
       </div>
     );
   };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SelectionDataProvider>
          <Routes>
            <Route path="/" element={<Adminlogin />} />
            <Route
              path="/Admin/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/user" element={<Users />} />{" "}
                    <Route path="dashboard" element={<Dashboard />} />
                    {/* Frontend */}
                    <Route path="/Category" element={<Category />} />
                    <Route path="/subcategory" element={<SubCategory />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/ContactUs" element={<ContactUs />} />
                    <Route
                      path="/footerCategory"
                      element={<FooterCategory />}
                    />
                    <Route path="/Megamenu" element={<Megamenu />} />
                    <Route path="/Silder" element={<Silder />} />
                    {/* Masterdata */}
                    <Route path="/Brand" element={<Brand />} />
                    <Route path="/Condition" element={<Condition />} />
                    <Route path="/DeviceType" element={<DeviceType />} />
                    <Route path="/types" element={<Type />} />
                    <Route path="/make" element={<Make />} />
                    <Route path="/Furnished" element={<Furnished />} />
                    <Route path="/Bedroom" element={<Bedroom />} />
                    <Route path="/Bathroom" element={<Bathroom />} />
                    <Route path="/Storey" element={<Storey />} />
                    <Route path="/construction" element={<Construction />} />
                    <Route path="/Feature" element={<Feature />} />
                    <Route path="/Areaunit" element={<Areaunit />} />
                    <Route
                      path="/ConstructionState"
                      element={<ConstructionState />}
                    />
                    <Route
                      path="/OperatingSystem"
                      element={<OperatingSystem />}
                    />
                    <Route path="/HardDriveType" element={<HardDriveType />} />
                    <Route path="/FunctionType" element={<FunctionType />} />
                    <Route path="/SensorSize" element={<SensorSize />} />
                    <Route path="/Wifi" element={<Wifi />} />
                    <Route path="/Resolution" element={<Resolution />} />
                    <Route path="/EngineType" element={<EngineType />} />
                    <Route
                      path="/EngineCapacity"
                      element={<EngineCapacity />}
                    />
                    <Route path="/ScreenSize" element={<ScreenSize />} />
                    <Route
                      path="/MaxAperatureRange"
                      element={<MaxAperatureRange />}
                    />
                    <Route
                      path="/MinFocalLengthRange"
                      element={<MinFocalLengthRange />}
                    />
                    <Route
                      path="/RegistrationCity"
                      element={<RegistrationCity />}
                    />
                    <Route
                      path="/MaxFocalLengthRange"
                      element={<MaxFocalLengthRange />}
                    />
                    <Route path="/HiringPerson" element={<HiringPerson />} />
                    <Route path="/CareerLevel" element={<CareerLevel />} />
                    <Route path="/PositionType" element={<PositionType />} />
                    <Route path="/TypeofAd" element={<TypeofAd />} />
                    <Route path="/Breed" element={<Breed />} />
                    <Route path="/Sex" element={<Sex />} />
                    <Route path="/Materialtype" element={<Materialtype />} />
                    <Route path="/Handmade" element={<Handmade />} />
                    <Route path="/Origin" element={<Origin />} />
                    <Route path="/Language" element={<Language />} />
                    <Route path="/Product" element={<Product />} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </SelectionDataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}


export default App;
