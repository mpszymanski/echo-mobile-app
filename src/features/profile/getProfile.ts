import { profiles } from '~/data';
import type { Profile } from '~/data';

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    return await profiles.getByUserId(userId);
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};
