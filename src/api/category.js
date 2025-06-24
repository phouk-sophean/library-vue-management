import apiService from "@/plugins/axios";

export const getCategory = () => apiService.get('/category');
export const createCategory = (data) => apiService.post('/category', data);
export const updateCategory = (id, data) => apiService.put(`/category/${id}`, data);
export const deleteCategory = (id) => apiService.delete(`/category/${id}`);