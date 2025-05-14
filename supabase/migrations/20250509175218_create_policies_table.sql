-- Create custom types for better data integrity
CREATE TYPE policy_type AS ENUM (
  'terms',
  'privacy'
);

CREATE TYPE language_code AS ENUM (
  'en',
  'pl'
);

CREATE TABLE policies (
  policy_id uuid PRIMARY KEY,
  policy_type policy_type NOT NULL,
  version_number int NOT NULL CHECK (version_number > 0),
  language_code language_code NOT NULL,
  effective_date timestamp NOT NULL CHECK (effective_date > '2000-01-01'),
  -- Content fields
  content_html text NOT NULL,
  content_plain text NOT NULL,
  checkbox_text text NOT NULL,
  -- Metadata
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- Add uniqueness constraint for policy types, version and language_code
  UNIQUE (policy_type, version_number, language_code)
);

CREATE POLICY "all users can read Policies, no altering/deletion allowed" ON policies
  FOR ALL
    USING (TRUE)
    WITH CHECK (FALSE);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Add documentation
COMMENT ON TABLE policies IS 'Stores legal policy documents like terms of service and privacy policies';

COMMENT ON COLUMN policies.policy_id IS 'Unique identifier for each policy document';

COMMENT ON COLUMN policies.policy_type IS 'Type of policy (terms, privacy, etc.)';

COMMENT ON COLUMN policies.version_number IS 'Sequential version number of the policy';

COMMENT ON COLUMN policies.language_code IS 'Language code for the policy (ISO 639-1)';

COMMENT ON COLUMN policies.effective_date IS 'Date when this policy version becomes effective';

COMMENT ON COLUMN policies.content_html IS 'HTML version of the policy for presentation';

COMMENT ON COLUMN policies.content_plain IS 'Plain text version of the policy for audit/logs';

COMMENT ON COLUMN policies.checkbox_text IS 'Text displayed next to consent checkbox';

