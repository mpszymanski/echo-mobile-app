import { profiles } from '~/data';
import type { Profile, ProfileData } from '~/data';

export const updateProfile = async (userId: string, data: Partial<ProfileData>): Promise<Profile> => {
  try {
    return await profiles.update(userId, data);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};