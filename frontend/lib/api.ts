// API Configuration
const getBaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (url) return url;

    // Warn if we're falling back to localhost in what looks like a deployed environment
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        console.warn('⚠️ API_URL is not set! Falling back to localhost, but the application seems to be deployed. This will likely cause connection errors. Please set NEXT_PUBLIC_API_URL environment variable.');
    }

    return 'http://127.0.0.1:5005';
};

const API_URL = getBaseUrl();
console.log('🔌 API Connected to:', API_URL);

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
                cache: 'no-store'
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

        deleteAll: async (token: string) => {
            const res = await fetch(`${API_URL}/api/blogs/admin/all`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete all blogs');
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
        },

        deleteAll: async (token: string) => {
            const res = await fetch(`${API_URL}/api/comments/admin/all`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete all comments');
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
        },

        getAllAdmin: async (token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/admin/all`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch scholarships');
            return res.json();
        },

        getByCategory: async (slug: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/by-category/${slug}`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch scholarships');
            return res.json();
        },

        getById: async (id: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/${id}`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch scholarship');
            return res.json();
        },

        create: async (data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to create scholarship');
            return res.json();
        },

        update: async (id: string, data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update scholarship');
            return res.json();
        },

        delete: async (id: string, token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete scholarship');
            return res.json();
        }
    },

    // Scholarship Categories
    categories: {
        getAll: async () => {
            const res = await fetch(`${API_URL}/api/scholarships/categories`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch categories');
            return res.json();
        },

        getAllWithCount: async () => {
            const res = await fetch(`${API_URL}/api/scholarships/categories/with-count`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch categories');
            return res.json();
        },

        getAllAdmin: async (token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/admin/categories`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch categories');
            return res.json();
        },

        getBySlug: async (slug: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/categories/${slug}`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch category');
            return res.json();
        },

        create: async (data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to create category');
            return res.json();
        },

        update: async (id: string, data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update category');
            return res.json();
        },

        delete: async (id: string, token: string) => {
            const res = await fetch(`${API_URL}/api/scholarships/categories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete category');
            return res.json();
        }
    },

    // Online Courses
    onlineCourses: {
        getAll: async () => {
            const res = await fetch(`${API_URL}/api/online-courses`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch courses');
            return res.json();
        },

        getAllAdmin: async (token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/admin/all`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch courses');
            return res.json();
        },

        getByUniversity: async (slug: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/by-university/${slug}`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch courses');
            return res.json();
        },

        getById: async (id: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/${id}`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch course');
            return res.json();
        },

        create: async (data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to create course');
            return res.json();
        },

        update: async (id: string, data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update course');
            return res.json();
        },

        delete: async (id: string, token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete course');
            return res.json();
        }
    },

    // Online Universities
    onlineUniversities: {
        getAll: async () => {
            const res = await fetch(`${API_URL}/api/online-courses/universities`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch universities');
            return res.json();
        },

        getAllWithCount: async () => {
            const res = await fetch(`${API_URL}/api/online-courses/universities/with-count`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch universities');
            return res.json();
        },

        getAllAdmin: async (token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/admin/universities`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch universities');
            return res.json();
        },

        getBySlug: async (slug: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/universities/${slug}`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch university');
            return res.json();
        },

        getWithCourses: async (slug: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/universities/${slug}/courses`, {
                next: { revalidate: 300 }
            });
            if (!res.ok) throw new Error('Failed to fetch university');
            return res.json();
        },

        create: async (data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/universities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to create university');
            return res.json();
        },

        update: async (id: string, data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/universities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update university');
            return res.json();
        },

        delete: async (id: string, token: string) => {
            const res = await fetch(`${API_URL}/api/online-courses/universities/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete university');
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
        },

        deleteAll: async (type: string, token: string) => {
            const res = await fetch(`${API_URL}/api/inquiries/all?type=${type}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete inquiries');
            return res.json();
        }
    },

    // Eligibility
    eligibility: {
        submit: async (data: any) => {
            const res = await fetch(`${API_URL}/api/eligibility`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to submit eligibility');
            return res.json();
        },

        getAll: async (token: string) => {
            const res = await fetch(`${API_URL}/api/eligibility`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch eligibility submissions');
            return res.json();
        },

        updateStatus: async (id: string, status: string, token: string) => {
            const res = await fetch(`${API_URL}/api/eligibility/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error('Failed to update eligibility status');
            return res.json();
        },

        deleteAll: async (token: string) => {
            const res = await fetch(`${API_URL}/api/eligibility/admin/all`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete all submissions');
            return res.json();
        }
    },

    // Scholarship Brackets
    brackets: {
        getAll: async () => {
            const res = await fetch(`${API_URL}/api/brackets`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch brackets');
            return res.json();
        },

        getByCourse: async (course: string) => {
            const res = await fetch(`${API_URL}/api/brackets/${course}`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Failed to fetch bracket');
            return res.json();
        },

        update: async (course: string, data: any, token: string) => {
            const res = await fetch(`${API_URL}/api/brackets/${course}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to update brackets');
            return res.json();
        },

        initialize: async (token: string) => {
            const res = await fetch(`${API_URL}/api/brackets/initialize`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to initialize brackets');
            return res.json();
        },

        calculateReward: async (course: string, score: number) => {
            const res = await fetch(`${API_URL}/api/brackets/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ course, score })
            });
            if (!res.ok) throw new Error('Failed to calculate reward');
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
        },

        getCurrentAdmin: async (token: string) => {
            const res = await fetch(`${API_URL}/api/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch admin info');
            return res.json();
        },

        updateUsername: async (newUsername: string, token: string) => {
            const res = await fetch(`${API_URL}/api/auth/username`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newUsername })
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to update username');
            }
            return res.json();
        },

        updatePassword: async (currentPassword: string, newPassword: string, token: string) => {
            const res = await fetch(`${API_URL}/api/auth/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to update password');
            }
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
