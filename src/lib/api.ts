import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { supabase } from './supabase';
import toast from 'react-hot-toast';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { data, error: refreshError } = await supabase.auth.refreshSession();
            
            if (refreshError || !data.session) {
              await supabase.auth.signOut();
              window.location.href = '/login';
              return Promise.reject(error);
            }

            originalRequest.headers.Authorization = `Bearer ${data.session.access_token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            await supabase.auth.signOut();
            window.location.href = '/login';
            return Promise.reject(error);
          }
        }

        // Handle different error types
        if (error.response?.status >= 500) {
          toast.error('Server error. Please try again later.');
        } else if (error.response?.status === 403) {
          toast.error('You do not have permission to perform this action.');
        } else if (error.response?.status === 404) {
          toast.error('Resource not found.');
        } else if (error.code === 'NETWORK_ERROR') {
          toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();

// Specific API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (userData: { email: string; password: string; name: string }) =>
    apiClient.post('/auth/register', userData),
  
  logout: () => apiClient.post('/auth/logout'),
  
  resetPassword: (email: string) =>
    apiClient.post('/auth/reset-password', { email }),
  
  updatePassword: (data: { password: string; token: string }) =>
    apiClient.post('/auth/update-password', data),
};

export const portfolioApi = {
  getAll: (params?: { category?: string; page?: number; limit?: number }) =>
    apiClient.get('/portfolio', { params }),
  
  getById: (id: string) => apiClient.get(`/portfolio/${id}`),
  
  create: (data: Partial<PortfolioItem>) =>
    apiClient.post('/portfolio', data),
  
  update: (id: string, data: Partial<PortfolioItem>) =>
    apiClient.put(`/portfolio/${id}`, data),
  
  delete: (id: string) => apiClient.delete(`/portfolio/${id}`),
};

export const contactApi = {
  submit: (data: { name: string; email: string; subject: string; message: string }) =>
    apiClient.post('/contact', data),
  
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get('/contact', { params }),
  
  updateStatus: (id: string, status: string) =>
    apiClient.patch(`/contact/${id}`, { status }),
};

export const adminApi = {
  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get('/admin/users', { params }),
  
  updateUser: (id: string, data: Partial<User>) =>
    apiClient.put(`/admin/users/${id}`, data),
  
  deleteUser: (id: string) => apiClient.delete(`/admin/users/${id}`),
  
  getAnalytics: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get('/admin/analytics', { params }),
  
  getAuditLogs: (params?: { page?: number; limit?: number; userId?: string }) =>
    apiClient.get('/admin/audit-logs', { params }),
};