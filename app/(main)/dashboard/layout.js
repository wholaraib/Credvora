import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import Dashboard from "./page";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <Suspense
        fallback={
          <div className="min-h-[80vh] flex justify-center items-center">
            <BarLoader width="40%" color="#120e40c8" />
          </div>
        }
      >
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
