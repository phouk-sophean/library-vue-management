import apiService from "@/plugins/axios";

export const getBorrow = () => apiService.get('/borrowing');
export const createBorrow = (data) => apiService.post('/borrowing', data);
export const updateBorrow = (id, data) => apiService.put(`/borrowing/${id}`, data);
export const deleteBorrow = (id) => apiService.delete(`/borrowing/${id}`);