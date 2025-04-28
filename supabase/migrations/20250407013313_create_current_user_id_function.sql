create or replace function public.current_user_id()
    returns uuid
    language plpgsql
    security invoker
    set search_path = ''
as
$$
begin
    return auth.uid();
end;
$$;