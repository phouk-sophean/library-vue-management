import api from "@/plugins/axios";

// BOOK API
export const getBooks = () => api.get("/book");
export const createBook = (data) => api.post("/book", data);
export const updateBook = (id, data) => api.put(`/book/${id}`, data);
export const deleteBook = (id) => api.delete(`/book/${id}`);

// CATEGORY API
export const getCategories = () => api.get("/category");