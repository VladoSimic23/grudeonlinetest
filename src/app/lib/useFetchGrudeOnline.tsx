// import React, { useEffect, useState } from "react";
// import { fetchClientApi } from "./fetchDb";

// const useFetchGrudeOnline = (category: string, numOfPosts: number) => {
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       const res = await fetchClientApi(category, numOfPosts);
//       setData(res);
//     };
//     getData();
//   }, [category, numOfPosts]);

//   return { data };
// };

// export default useFetchGrudeOnline;
import React, { useEffect, useState } from "react";
import { fetchClientApi } from "./fetchDb";

const useFetchGrudeOnline = (
  category: string,
  numOfPosts: number,
  isMobile: boolean
) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      // Conditionally fetch data only if isMobile is false
      if (!isMobile) {
        const res = await fetchClientApi(category, numOfPosts);
        setData(res);
      }
    };

    getData();
  }, [category, numOfPosts, isMobile]);

  return { data };
};

export default useFetchGrudeOnline;
