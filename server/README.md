# Search Functionality Utils

## utils/queryUtils.js

```js
export const buildSearchFilter = (searchValue, fields) => {
  if (!searchValue || !fields.length) return {};

  const regex = new RegExp(searchValue, 'i');
  return {
    $or: fields.map(field => ({
      [field]: { $regex: regex }
    }))
  };
};
```

This helper function provides the funtionality for fetching data related to search fields and search value.





