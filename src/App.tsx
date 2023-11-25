import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ADMIN, CONSUMER } from "router/path";
import "style/index.css";

const Builder = lazy(() =>
  import("./pages/Admin").then((mod) => ({ default: mod.Admin }))
);

const Consumer = lazy(() =>
  import("./pages/Consumer").then((mod) => ({ default: mod.Consumer }))
);

const App = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={ADMIN} element={<Builder />} />
          <Route path={CONSUMER} element={<Consumer />} />
          <Route path="*" element={<Navigate to={ADMIN} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
