// utils/convertSearchParams.ts

export const convertSearchParams = (params: URLSearchParams) => {
    const result: Record<string, any> = {};
  
    params.forEach((value, key) => {
      if (!isNaN(Number(value))) {
        result[key] = Number(value);
      } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        result[key] = value.toLowerCase() === 'true';
      } else if (Date.parse(value)) {
        result[key] = new Date(value);
      } else {
        result[key] = value;
      }
    });
  
    return result;
  };
  