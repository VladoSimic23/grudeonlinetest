import Link from "next/link";
import React from "react";

const Categoires = ({ toggle }: { toggle: any }) => {
  return (
    <ul>
      <li onClick={toggle}>
        <Link href={"/"}>Naslovnica</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/vijesti/"}>Vijesti</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/crna-kronika"}>Crna Kronika</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/sport/"}>Sport</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/politika"}>Politika</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/gospodarstvo/"}>Gospodarstvo</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/kultura"}>Kultura</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/zanimljivosti"}>Zanimljivosti</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"/category/lifestyle"}>Lifestyle</Link>
      </li>
      <li onClick={toggle}>
        <Link href={"#"}>Osmrtnice</Link>
      </li>
    </ul>
  );
};

export default Categoires;
