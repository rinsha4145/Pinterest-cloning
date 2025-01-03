import { toast } from "react-toastify";

const handleAsync = (fn) => {
    return async (...args) => {
      try {
        return await fn(...args); 
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            toast.error('Server error, please try again later');
          } else {
            toast.warning(error.response.data.message || 'Something went wrong!');
          }
        } else if (error.request) {
          toast.error('Network error, please try again later');
        } else {
          toast.error(error.message || 'Something went wrong!');
        }
      }
    };
  };

export default handleAsync;
