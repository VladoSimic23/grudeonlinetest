import Link from "next/link";
import footerStyles from "../../css/footerCss/footerstyle.module.css";

const RecentPosts = async ({ data }: any) => {
  return (
    <div className={footerStyles.recentContainer}>
      <h4>NOVE OBJAVE</h4>
      <div>
        {data?.map((item: any, index: number) => {
          return (
            <div key={index} className={footerStyles.borderBottomFooter}>
              <p>
                <Link href={`/${item?.slug}`} aria-label={item?.title}>
                  {item?.title}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPosts;
