const sendResponse = (
  res,
  {
    statusCode = 200,
    success = true,
    message = "",
    data = null,
    pagination = null,
  }
) => {
  const response = {
    success,
    message,
    data,
  };

  // Add the pagination block dynamically only if pagination data exists
  if (pagination) {
    response.pagination = pagination;
  }

  res.status(statusCode).json(response);
};

export default sendResponse;
