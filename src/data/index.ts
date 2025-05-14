import { SupabaseAuthRepository } from './supabase/adapters/auth';
import { SupabaseProfileRepository } from './supabase/adapters/profiles';
import type { AuthRepository } from './interfaces/auth';
import type { ProfileRepository } from './interfaces/profiles';
import { PolicyRepository } from '~/data/interfaces/policies';
import { SupabasePolicyRepository } from '~/data/supabase/adapters/policies';

// Create instances of the repositories
const authRepository: AuthRepository = new SupabaseAuthRepository();
const profileRepository: ProfileRepository = new SupabaseProfileRepository();
const policyRepository: PolicyRepository = new SupabasePolicyRepository();

// Export the repositories
export const auth = authRepository;
export const profiles = profileRepository;
export const policies = policyRepository;

// Export types
export type { Profile, ProfileData } from './interfaces/profiles';
export type { AuthData } from './interfaces/auth';
