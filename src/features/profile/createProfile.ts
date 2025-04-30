import { profiles } from '~/data';
import type { Profile } from '~/data';

export const createProfile = async (userId: string, displayName: string, avatarUrl?: string): Promise<Profile> => {
  try {
    return await profiles.create({ userId, displayName, avatarUrl });
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};