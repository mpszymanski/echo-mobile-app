import { supabase } from '../client';
import { ProfileRepository, ProfileData, Profile } from '~/data/interfaces/profiles';

export class SupabaseProfileRepository implements ProfileRepository {
  private mapToProfile(data: any): Profile {
    return {
      id: data.id,
      userId: data.user_id,
      displayName: data.display_name,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async create(data: ProfileData): Promise<Profile> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: data.userId,
          display_name: data.displayName,
          avatar_url: data.avatarUrl || '',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return this.mapToProfile(profile);
  }

  async getByUserId(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }

    return this.mapToProfile(data);
  }

  async update(userId: string, data: Partial<ProfileData>): Promise<Profile> {
    const updateData: any = {};

    if (data.displayName !== undefined) {
      updateData.display_name = data.displayName;
    }

    if (data.avatarUrl !== undefined) {
      updateData.avatar_url = data.avatarUrl;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return this.mapToProfile(profile);
  }
}
