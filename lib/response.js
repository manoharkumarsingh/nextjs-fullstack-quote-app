const getResponse = (data, code, error = "") => {
  switch (code) {
    case 200: {
      return {
        status: code,
        message: "Success",
        error: error,
        result: {
          ...data,
        },
      };
    }

    case 201: {
      return {
        status: 201,
        message: "Created",
        error: error,
        result: {
          ...data,
        },
      };
    }
    case 400: {
      return {
        status: code,
        message: "Bad Request",
        error: error
          ? error
          : "Invalid data format. Please check the request payload.",
      };
    }

    case 401: {
      return {
        status: code,
        message: "Unauthorized",
        error: error
          ? error
          : "Authentication required. Please provide valid credentials.",
      };
    }

    case 403: {
      return {
        status: code,
        message: "Forbidden",
        error: error
          ? error
          : "You do not have permission to access this resource.",
      };
    }

    case 404: {
      return {
        status: code,
        message: "Not Found",
        error: error ? error : "The requested resource was not found.",
      };
    }
    case 500: {
      return {
        status: code,
        message: "Internal Server Error",
        error: error
          ? error
          : "An unexpected error occurred. Please try again later.",
      };
    }
    case 501: {
      return {
        status: code,
        message: "Service Unavailable",
        error: error
          ? error
          : "The server is currently unable to handle the request. Please try again later.",
      };
    }
  }
};

export default getResponse;
