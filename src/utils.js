export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 10)
}