import apiService from "@/plugins/axios";
export const getCategory = () => apiService.get('/category');