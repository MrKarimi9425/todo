const request = (uri, method, body) => {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const response = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export { request, response };
