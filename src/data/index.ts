import { SupabaseAuthRepository } from './supabase/adapters/auth';
import { SupabaseProfileRepository } from './supabase/adapters/profiles';
import type { AuthRepository } from './interfaces/auth';
import type { ProfileRepository } from './interfaces/profiles';

// Create instances of the repositories
const authRepository: AuthRepository = new SupabaseAuthRepository();
const profileRepository: ProfileRepository = new SupabaseProfileRepository();

// Export the repositories
export const auth = authRepository;
export const profiles = profileRepository;

// Export types
export type { Profile, ProfileData } from './interfaces/profiles';
export type { AuthData } from './interfaces/auth';
