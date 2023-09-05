import React from "react";
import { Route, Routes } from "react-router-dom";
import { pages } from "../routing/routes";

export default function Pages() {
  return (
    <div style={{ flex: '1 1 auto' }}>
      <Routes>
        {pages.map((i) => {
          return <Route path={i.path} element={<i.Component kindtype={i?.kindtype} />} key={i.id} />;
        })
        }
      </Routes>
    </div>
  );
};