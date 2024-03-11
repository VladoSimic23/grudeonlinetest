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

export default async function Home() {
  return (
    <>
      <MobileComponent />
      <MobileHomeClient />
      <GrudeOnlineNaslovna />
      <OstaleVijestiNaslovna />
      <div className={styles.grid2}>
        <SportNaslovna />
        <GospodarstvoNaslovna />
      </div>
      <LifestyleNaslovna />
      {/* <GalerijaNaslovna /> */}
    </>
  );
}
