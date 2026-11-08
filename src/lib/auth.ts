/**
 * Mock authentication state for OmniLearn India
 * This provides client-side authentication state management
 * for the application's auth flows.
 */

// User profile type
export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  school?: string;
  grade?: string;
  streak?: number;
  totalXp?: number;
  level?: number;
};

// Mock user session
let userSession: UserProfile | null = null;

// Initialize from localStorage if available
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem('omnilearn-user');
    if (stored) {
      userSession = JSON.parse(stored);
    }
  } catch (e) {
    // Ignore localStorage errors
  }
}

// Auth state functions
export const auth = {
  /** Get current user profile */
  getUser: (): UserProfile | null => {
    return userSession;
  },

  /** Check if user is authenticated */
  isAuthenticated: (): boolean => {
    return userSession !== null;
  },

  /** Login with email and password */
  login: async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    // Mock authentication - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate credentials (mock)
    const validUsers: Record<string, { password: string; role: UserRole }> = {
      'student@omnilearn.in': { password: 'student123', role: 'student' },
      'parent@omnilearn.in': { password: 'parent123', role: 'parent' },
      'tutor@omnilearn.in': { password: 'tutor123', role: 'tutor' },
    };

    const userData = validUsers[email];
    if (userData && userData.password === password) {
      const profile: UserProfile = {
        id: email,
        name: email.split('@')[0].replace(/[._]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        email,
        role: userData.role,
      };
      
      userSession = profile;
      
      // Persist to localStorage
      if (rememberMe) {
        try {
          localStorage.setItem('omnilearn-user', JSON.stringify(profile));
        } catch (e) {
          // Ignore
        }
      }
      
      return true;
    }
    
    return false;
  },

  /** Register new user */
  register: async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists (mock)
    const existingUsers: string[] = [];
    try {
      const stored = localStorage.getItem('omnilearn-users');
      if (stored) {
        existingUsers.push(...JSON.parse(stored));
      }
    } catch (e) {
      // Ignore
    }
    
    if (existingUsers.includes(email)) {
      return false; // User already exists
    }
    
    const profile: UserProfile = {
      id: email,
      name,
      email,
      role,
    };
    
    userSession = profile;
    
    // Save to localStorage
    try {
      localStorage.setItem('omnilearn-users', JSON.stringify([...existingUsers, email]));
    } catch (e) {
      // Ignore
    }
    
    return true;
  },

  /** Logout */
  logout: (): void => {
    userSession = null;
    
    try {
      localStorage.removeItem('omnilearn-user');
      localStorage.removeItem('omnilearn-users');
    } catch (e) {
      // Ignore
    }
  },

  /** Update user profile */
  updateProfile: (updates: Partial<UserProfile>): void => {
    if (userSession) {
      userSession = { ...userSession, ...updates };
      
      try {
        localStorage.setItem('omnilearn-user', JSON.stringify(userSession));
      } catch (e) {
        // Ignore
      }
    }
  },
};

export default auth;