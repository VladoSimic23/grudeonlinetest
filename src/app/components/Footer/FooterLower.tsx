import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import footerStyles from "../../css/footerCss/footerstyle.module.css";
import styles from "../../css/mainCss/mainStyle.module.css";
import Link from "next/link";

const FooterLower = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={footerStyles.footerLower}>
      <div className={styles.container}>
        <div className={footerStyles.flexFooter}>
          <Link
            href={"https://www.facebook.com/GrudeOnline/"}
            target="_blank"
            aria-label="Posjetite naš Facebook profil"
          >
            <FontAwesomeIcon icon={faFacebookF} />
            <span>FACEBOOK</span>
          </Link>
          <Link
            href={"https://www.instagram.com/grudeonline/"}
            target="_blank"
            aria-label="Posjetite naš Instagram profil"
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span>INSTAGRAM</span>
          </Link>
          <Link
            href={"https://www.youtube.com/channel/UC0tJO-t-CtXhSqIHpE7JaCg"}
            target="_blank"
            aria-label="Posjetite naš Youtube kanal"
          >
            <FontAwesomeIcon icon={faYoutube} />
            <span>YOUTUBE</span>
          </Link>
        </div>
        <div className={footerStyles.copyrights}>
          <p>@ 2007 - {currentYear} Grude Online. All Right Reserved.</p>

          <a href="#">BACK TO TOP</a>
        </div>
      </div>
    </div>
  );
};

export default FooterLower;
