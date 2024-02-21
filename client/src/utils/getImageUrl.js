export const getImageUrl = (url) => {
  if (!url) return "";
  else if (url.startsWith("uploads/"))
    return import.meta.env.VITE_SERVER_URL + url;
  else return url;
};
