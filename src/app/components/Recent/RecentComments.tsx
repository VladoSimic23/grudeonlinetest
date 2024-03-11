import Link from "next/link";
import footerStyles from "../../css/footerCss/footerstyle.module.css";

const RecentComments = async ({ data }: any) => {
  return (
    <div className={footerStyles.recentContainer}>
      <h4>NOVI KOMENTARI</h4>
      <div>
        {data?.nodes?.map((item: any, index: number) => {
          return (
            <div key={index} className={footerStyles.borderBottomFooter}>
              <p>
                <span>{item?.author?.node?.name} o </span>
                <Link
                  href={`/${item?.commentedOn?.node?.slug}`}
                  aria-label={item?.title}
                >
                  {item?.commentedOn?.node?.title}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentComments;
