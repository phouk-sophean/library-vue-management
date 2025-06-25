import apiService from "@/plugins/axios";

export const getMember = () => apiService.get('/member');
export const createMember = (data) => apiService.post('/member', data);
export const updateMember = (id, data) => apiService.put(`/member/${id}`, data);
export const deleteMember = (id) => apiService.delete(`/member/${id}`);