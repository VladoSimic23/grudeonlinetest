// const handleSearch = () => {
//   setLoading(true);
//   const params = new URLSearchParams(searchParams);
//   if (searchQuery) {
//     params.set("query", searchQuery);
//   } else {
//     params.delete("query");
//   }

//   // Switch to the searchResults route
//   const url = format({
//     pathname: "/search",
//     query: { q: decodeURIComponent(searchQuery) },
//   });
//   router.push(url);
//   setLoading(false);
// };
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import navStyles from "../../css/nav/nav.module.css";
import { useDebouncedCallback } from "use-debounce";

const SearchBar: React.FC = () => {
  const router: any = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (searchQuery) {
      params.set("s", searchQuery);
    } else {
      params.delete("s");
    }

    try {
      router.push(`/search/?s=${encodeURIComponent(searchQuery)}`);
    } catch (error: any) {
      console.error("Error navigating to search:", error.message);
    }
  }, 3000);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={navStyles.searchStyle}>
      <input
        type="text"
        autoFocus
        placeholder="Type and hit enter ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
