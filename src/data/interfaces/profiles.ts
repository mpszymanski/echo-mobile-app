export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileData {
  userId: string;
  displayName: string;
  avatarUrl?: string;
}

export interface ProfileRepository {
  create(data: ProfileData): Promise<Profile>;
  getByUserId(userId: string): Promise<Profile | null>;
  update(userId: string, data: Partial<ProfileData>): Promise<Profile>;
}
