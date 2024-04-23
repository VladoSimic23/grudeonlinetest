"use client";
import React from "react";
import Slideshow from "./Slideshow";

const MobileIzdvojenoChild = ({ data }: any) => {
  return (
    <div>
      <Slideshow images={data} />
    </div>
  );
};

export default MobileIzdvojenoChild;
