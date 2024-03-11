"use client";
import React, { useEffect, useState } from "react";
import Categoires from "../Categories/Categories";
import SearchBar from "../SearchComp/SearchBars";
import styles from "../../css/mainCss/mainStyle.module.css";
import navStyles from "../../css/nav/nav.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import SearchBar from "../SearchComp/SearchBars";

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isOver993, setIsSmallMenu] = useState(994);
  //const [windowSize, setWindowSize] = useState(window.innerWidth || 0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth || 800 : 800,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width:
          typeof window !== "undefined" ? window.innerWidth : windowSize.width,
      });
    };

    if (typeof window !== "undefined") {
      // Set the initial window size
      handleResize();

      // Add event listener to update window size on resize
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowSize.width]);

  const cancelMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearch(true);
  };

  return (
    <div className={navStyles.navMobileWrap}>
      <div className={styles.container}>
        <div className={navStyles.imageContainer}>
          <Image
            src={"/Grude_online_Logotip2.png"}
            // fill
            // sizes="(max-width: 992px) 350px, (min-width: 993px) 330px"
            width={isMobileMenuOpen ? 50 : 330}
            height={42}
            alt="Grude-Online"
            priority
          />
        </div>
      </div>
      <div className={navStyles.navWrap}>
        <div className={styles.container}>
          <div className={navStyles.navbar}>
            {/**/}
            <div className={navStyles.navMenu}>
              <div
                className={`${navStyles.navItems} ${
                  isMobileMenuOpen ? navStyles.mobileOpen : ""
                }`}
              >
                {!isSearch && windowSize.width > 993 && (
                  <Categoires toggle={cancelMobileMenu} />
                )}
                {isMobileMenuOpen && <Categoires toggle={cancelMobileMenu} />}
              </div>
            </div>
            {/**/}
            {isSearch && windowSize.width > 993 && <SearchBar />}
            {isMobileMenuOpen && <SearchBar />}

            {!isSearch && windowSize.width > 993 && (
              <span
                className={navStyles.navMarginLeft}
                onClick={() => setIsSearch(true)}
              >
                <FaSearch />
              </span>
            )}
            {isSearch && windowSize.width > 993 && (
              <span
                className={navStyles.navMarginLeft}
                onClick={() => setIsSearch(false)}
              >
                <IoClose />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={navStyles.mobileMenuToggle} onClick={toggleMobileMenu}>
        <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>
    </div>
  );
};

export default Navbar;
