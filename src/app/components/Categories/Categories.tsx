"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "../../css/mainCss/mainStyle.module.css";

const Categoires = ({ toggle }: { toggle: any }) => {
  const pathname = usePathname();
  return (
    <ul className={styles.navLinks}>
      <li onClick={toggle}>
        <Link className={`${pathname === "/" ? styles.active : ""}`} href={"/"}>
          Naslovnica
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${pathname === "/category/vijesti" ? styles.active : ""}`}
          href={"/category/vijesti"}
        >
          Vijesti
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${
            pathname === "/category/crna-kronika" ? styles.active : ""
          }`}
          href={"/category/crna-kronika"}
        >
          Crna Kronika
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${pathname === "/category/sport" ? styles.active : ""}`}
          href={"/category/sport"}
        >
          Sport
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${
            pathname === "/category/politika" ? styles.active : ""
          }`}
          href={"/category/politika"}
        >
          Politika
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${
            pathname === "/category/gospodarstvo" ? styles.active : ""
          }`}
          href={"/category/gospodarstvo"}
        >
          Gospodarstvo
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${pathname === "/category/kultura" ? styles.active : ""}`}
          href={"/category/kultura"}
        >
          Kultura
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${
            pathname === "/category/zanimljivosti" ? styles.active : ""
          }`}
          href={"/category/zanimljivosti"}
        >
          Zanimljivosti
        </Link>
      </li>
      <li onClick={toggle}>
        <Link
          className={`${
            pathname === "/category/lifestyle" ? styles.active : ""
          }`}
          href={"/category/lifestyle"}
        >
          Lifestyle
        </Link>
      </li>
      <li onClick={toggle}>
        <Link href={"https://www.osmrtnica.ba/"}>Osmrtnice</Link>
      </li>
    </ul>
  );
};

export default Categoires;
