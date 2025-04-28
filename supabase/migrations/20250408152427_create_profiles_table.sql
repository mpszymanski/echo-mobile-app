create table profiles
(
    profile_id   uuid primary key         not null default uuid_generate_v4(),
    user_id      uuid unique              not null references auth.users (id) on delete cascade,
    display_name text                     not null,
    avatar_url   varchar(255)             not null default '',
    created_at   timestamp with time zone not null default now(),
    updated_at   timestamp with time zone not null default now()
);

create index idx_profiles_user_id on profiles (user_id);

comment on table profiles is 'User profiles with personal or business information';

alter table profiles enable row level security;

create policy "users can access their own profiles"
    on profiles
    for all  -- can be: select, insert, update, delete
    using (user_id = current_user_id())  -- for select/delete
    with check (user_id = current_user_id());  -- for insert/update;