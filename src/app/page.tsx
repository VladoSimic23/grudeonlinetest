//import styles from "./page.module.css";

import GalerijaNaslovna from "./components/NaslovnaComponents/Galerija/GalerijaNaslovna";
import GospodarstvoNaslovna from "./components/NaslovnaComponents/Gospodarstvo/GospodarstvoNaslovna";
import MobileComponent from "./components/MobileHomepage/MobileComponent";
import GrudeOnlineNaslovna from "./components/NaslovnaComponents/GrudeOnline/GrudeOnlineNaslovna";
import LifestyleNaslovna from "./components/NaslovnaComponents/Lifetstyle/LifestyleNaslovna";
import OstaleVijestiNaslovna from "./components/NaslovnaComponents/OstaleVijesti/OstaleVijestiNaslovna";
import SportNaslovna from "./components/NaslovnaComponents/Sport/SportNaslovna";
import styles from "./css/mainCss/mainStyle.module.css";
import MobileHomeClient from "./components/MobileHomepage/MobileHomeClient";
import { Metadata } from "next";
import NaslovneVijesti from "./components/NaslovneVijesti/NaslovneVijesti";
import Sidebar from "./components/Sidebar/Sidebar";
import { isMobileDevice } from "./lib/deviceCheck";
import { headers } from "next/headers";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: "Grude Online - Grudski News Portal",
  description: "Generated by create next app",
};

export default async function Home() {
  const isMob = isMobileDevice();
  const heads = headers();

  return (
    <>
      {!isMob && (
        <Suspense fallback={<h2>Loading...</h2>}>
          <NaslovneVijesti />
        </Suspense>
      )}
      <div className={styles.grid23}>
        <div className={styles.tabletContainer}>
          {isMob && (
            <>
              <Suspense fallback={<h2>Loading...</h2>}>
                <MobileComponent />
              </Suspense>
              <MobileHomeClient />
            </>
          )}
          {!isMob && (
            <>
              <Suspense fallback={<h2>Loading...</h2>}>
                <GrudeOnlineNaslovna />
              </Suspense>
              <Suspense fallback={<h2>Loading...</h2>}>
                <OstaleVijestiNaslovna />
              </Suspense>
              <Suspense fallback={<h2>Loading...</h2>}>
                <LifestyleNaslovna />
              </Suspense>
            </>
          )}

          <div className={styles.grid2}>
            {!isMob && (
              <>
                <Suspense fallback={<h2>Loading...</h2>}>
                  <SportNaslovna />
                </Suspense>
                <Suspense fallback={<h2>Loading...</h2>}>
                  <GospodarstvoNaslovna />
                </Suspense>
              </>
            )}
          </div>
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
      {/* <GalerijaNaslovna /> */}
    </>
  );
}
