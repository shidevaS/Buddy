/**
 * @tuiton/shared
 * Shared TypeScript types and API client used by both `web` and `mobile`.
 */

export type UserRole = 'student' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  streak?: number;
  totalXp?: number;
  level?: number;
};

/** Seeded admin identities (Phase 1 exit criterion). */
export const SEEDED_ADMINS: { name: string; email: string }[] = [
  { name: 'Shivani', email: 'shivani@tuiton.in' },
  { name: 'Devendra', email: 'devendra@tuiton.in' },
];

export type Pillar = 'subjects' | 'innovation';

export type Resource = {
  id: string;
  type: 'video' | 'notes' | 'quiz' | 'link';
  title: string;
  url?: string;
  content?: string;
  durationMinutes?: number;
};

export type Lesson = {
  id: string;
  title: string;
  order: number;
  resources: Resource[];
};

export type Module = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

export type Roadmap = {
  id: string;
  pillar: Pillar;
  title: string;
  grade?: string; // e.g. "6" .. "12" for subjects pillar
  track?: string; // e.g. "coding", "prompt-engg", "ai-tools", "ml", "app-building", "cyber-basics"
  description: string;
  modules: Module[];
};

export type ChallengeType = 'daily' | 'weekly' | 'monthly';

export type Challenge = {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  dueAt?: string;
  xp: number;
  badgeId?: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
};

export type LiveClass = {
  id: string;
  title: string;
  pillar: Pillar;
  instructor: string;
  startsAt: string;
  endsAt: string;
  jitsiRoom: string;
  jitsiJwt?: string;
  recordingUrl?: string;
  attendanceCaptured: boolean;
};

export type AuthProvider = 'email-otp' | 'google';

export type Session = {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
};

/* ------------------------------------------------------------------ */
/* API client                                                         */
/* ------------------------------------------------------------------ */

export type RequestInitOverride = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

class ApiErrorClass extends Error {
  public readonly status: number;
  public readonly code: string;
  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request<T = unknown>(path: string, init: RequestInitOverride = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  if (!res.ok) {
    let body: { code?: string; message?: string } = {};
    try {
      body = (await res.json()) ?? {};
    } catch {
      // ignore non-json error bodies
    }
    throw new ApiErrorClass(body.message ?? `Request failed (${res.status})`, res.status, body.code ?? 'unknown');
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const api = {
  get: <T = unknown>(path: string, headers?: RequestInitOverride['headers']) =>
    request<T>(path, { method: 'GET', headers }),

  post: <T = unknown>(path: string, body?: unknown, headers?: RequestInitOverride['headers']) =>
    request<T>(path, { method: 'POST', headers, body }),

  put: <T = unknown>(path: string, body?: unknown, headers?: RequestInitOverride['headers']) =>
    request<T>(path, { method: 'PUT', headers, body }),

  delete: <T = unknown>(path: string, headers?: RequestInitOverride['headers']) =>
    request<T>(path, { method: 'DELETE', headers }),
};

export { ApiErrorClass as ApiError };

export { API_BASE };

export default {
  SEEDED_ADMINS,
  api,
};
