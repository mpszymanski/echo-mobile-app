CREATE TABLE profiles (
  profile_id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4 (),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text NOT NULL,
  avatar_url varchar(255) NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_user_id ON profiles (user_id);

COMMENT ON TABLE profiles IS 'User profiles with personal or business information';

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can access their own profiles" ON profiles
  FOR ALL -- can be: select, insert, update, delete
    USING (user_id = current_user_id ()) -- for select/delete
    WITH CHECK (user_id = current_user_id ());

-- for insert/update;
