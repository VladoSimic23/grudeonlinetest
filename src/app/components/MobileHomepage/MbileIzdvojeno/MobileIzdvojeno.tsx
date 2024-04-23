import { getPostsByCategory } from "@/app/lib/service";
import React from "react";
import MobileIzdvojenoChild from "./MobileIzdvojenoChild";

const MobileIzdvojeno = async () => {
  const data = await getPostsByCategory("izdvojeno", 5);

  return (
    <div>
      <MobileIzdvojenoChild data={data} />
    </div>
  );
};

export default MobileIzdvojeno;
