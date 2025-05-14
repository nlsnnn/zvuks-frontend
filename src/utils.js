export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const handleApiError = (error, methodName) => {
  // console.error(`Ошибка в методе ${methodName}:`, {
  //   message: error.message,
  //   status: error.response?.status,
  //   data: error.response?.data,
  // });

  if (error.response) {
    const { status, data } = error.response;

    if (data?.detail) {
      if (Array.isArray(data.detail)) {
        throw new Error(data.detail.map((err) => err.msg).join(", "));
      } else {
        throw new Error(data.detail);
      }
    }

    switch (status) {
      case 400:
        throw new Error(`Неверные данные для ${methodName.toLowerCase()}`);
      case 401:
        throw new Error("Неавторизованный доступ");
      case 403:
        throw new Error("Доступ запрещен");
      case 500:
        throw new Error(`Ошибка сервера при ${methodName.toLowerCase()}`);
      default:
        throw new Error(`Ошибка сервера: ${status}`);
    }
  }

  if (error.code === "ECONNABORTED") {
    throw new Error("Превышено время ожидания запроса");
  } else if (error.message.includes("Network Error")) {
    throw new Error("Ошибка сети. Проверьте подключение к интернету");
  }

  throw new Error(`Неизвестная ошибка при ${methodName.toLowerCase()}`);
};
