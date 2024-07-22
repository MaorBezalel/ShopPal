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
  
export const ratingToString = (rating: number) => {
    if (rating <= 1) {
        return 'Poor';
    } else if (rating <= 2) {
        return 'Fair';
    } else if (rating <= 3) {
        return 'Good';
    } else if (rating <= 4) {
        return 'Very Good';
    } else if (rating <= 5) {
        return 'Excellent';
    } else {
        return 'Unknown';
    }
}