// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5005';

/**
 * Centralized API client for all backend requests
 */
export const api = {
    // Base URL
    baseURL: API_URL,

    // Blogs
    blogs: {
        getAll: async () => {
            const res = await fetch(`${API_URL}/api/blogs`, {
                next: { revalidate: 60 } // ISR: revalidate every 60 seconds
            });
            if (!res.ok) throw new Error('Failed to fetch blogs');
            return res.json();
        },

        getBySlug: async (slug: string) => {
            const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) throw new Error('Failed to fetch blog');
            return res.json();
        },

        getAllAdmin: async (token: string) => {
            const res = await fetch(`${API_URL}/api/blogs/admin/all`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch admin blogs');
            return res.json();
        },

        create: async (data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const error = await res.text();
                throw new Error(error);
            }
            return res.json();
        },

        update: async (id: string, data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update blog');
            return res.json();
        },

        delete: async (id: string, token: string) => {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete blog');
            return res.json();
        },

        like: async (id: string) => {
            const res = await fetch(`${API_URL}/api/blogs/${id}/like`, {
                method: 'POST'
            });
            if (!res.ok) throw new Error('Failed to like blog');
            return res.json();
        }
    },

    // Comments
    comments: {
        getByPostId: async (postId: string) => {
            const res = await fetch(`${API_URL}/api/comments/post/${postId}`, {
                next: { revalidate: 30 }
            });
            if (!res.ok) throw new Error('Failed to fetch comments');
            return res.json();
        },

        getAll: async (token: string) => {
            const res = await fetch(`${API_URL}/api/comments`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch comments');
            return res.json();
        },

        create: async (postId: string, data: any) => {
            const res = await fetch(`${API_URL}/api/comments/post/${postId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to submit comment');
            return res.json();
        },

        updateStatus: async (id: string, status: string, token: string) => {
            const res = await fetch(`${API_URL}/api/comments/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error('Failed to update comment status');
            return res.json();
        },

        delete: async (id: string, token: string) => {
            const res = await fetch(`${API_URL}/api/comments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete comment');
            return res.json();
        }
    },

    // Scholarships
    scholarships: {
        getAll: async () => {
            const res = await fetch(`${API_URL}/api/scholarships`, {
                next: { revalidate: 300 } // Revalidate every 5 minutes
            });
            if (!res.ok) throw new Error('Failed to fetch scholarships');
            return res.json();
        }
    },

    // Inquiries
    inquiries: {
        create: async (data: any) => {
            const res = await fetch(`${API_URL}/api/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to submit inquiry');
            return res.json();
        },

        getAll: async (token: string) => {
            const res = await fetch(`${API_URL}/api/inquiries`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch inquiries');
            return res.json();
        },

        updateStatus: async (id: string, status: string, token: string) => {
            const res = await fetch(`${API_URL}/api/inquiries/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error('Failed to update inquiry status');
            return res.json();
        }
    },

    // Auth
    auth: {
        login: async (username: string, password: string) => {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Login failed');
            return res.json();
        }
    },

    // Upload
    upload: {
        image: async (file: File, token: string) => {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch(`${API_URL}/api/upload/image`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (!res.ok) throw new Error('Failed to upload image');
            return res.json();
        }
    }
};

// Helper function for client-side API calls
export const apiClient = {
    get: async (endpoint: string, token?: string) => {
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    },

    post: async (endpoint: string, data: any, token?: string) => {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    }
};
