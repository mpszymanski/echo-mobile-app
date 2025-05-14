CREATE OR REPLACE FUNCTION public.current_user_id ()
  RETURNS uuid
  LANGUAGE plpgsql
  SECURITY INVOKER
  SET search_path = ''
  AS $$
BEGIN
  RETURN auth.uid ();
END;
$$;

