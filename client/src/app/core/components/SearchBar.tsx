import React from 'react';
import { Input } from 'antd';
import type { SearchBarProps } from '../models/sharedComponent';
const { Search } = Input;


const SearchBar: React.FC<SearchBarProps> = ({
    searchValue,
    setSearchValue,
    placeholder = 'Search...',
    handleSearch,
}) => {
    return (
        <Search
            placeholder={placeholder}
            allowClear
            style={{ width: 500 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
        />
    );
};

export default SearchBar;
