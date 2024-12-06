
const handleAsync = (fn) => {
    return async (...args) => {
      try {
        return await fn(...args); 
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            alert('Server error, please try again later');
          } else {
            alert(error.response.data.message || 'Something went wrong!');
          }
        } else if (error.request) {
          alert('Network error, please try again later');
        } else {
          alert(error.message || 'Something went wrong!');
        }
      }
    };
  };

export default handleAsync;
