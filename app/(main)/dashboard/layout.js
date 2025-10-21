import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import Dashboard from "./page";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      {/* Dashboard Page */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#120e40c8" />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
