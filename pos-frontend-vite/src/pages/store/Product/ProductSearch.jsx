import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiX } from "react-icons/fi";
import { searchProducts } from "@/Redux Toolkit/features/product/productThunks";
import { useSelector } from "react-redux";

const ProductSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const token = localStorage.getItem("jwt");
      const results = await dispatch(
        searchProducts({ query: searchQuery, storeId: store.id, token })
      ).unwrap();
      if (onSearch) {
        onSearch(results);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch(null);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500 hover:text-gray-700"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button
        type="submit"
        disabled={!searchQuery.trim() || isSearching}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        {isSearching ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default ProductSearch;
