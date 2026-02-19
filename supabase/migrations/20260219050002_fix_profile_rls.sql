BEGIN;

-- =====================================================


DROP POLICY IF EXISTS "Admins can view non-admin profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update non-admin profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete non-admin profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage users" ON public.profiles;
DROP POLICY IF EXISTS "Super admin full access" ON public.profiles;



DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM (
      'user',
      'admin',
      'super_admin'
    );
  END IF;
END$$;

-- =====================================================
--  ALTER ROLE COLUMN TO ENUM


ALTER TABLE public.profiles
  ALTER COLUMN role DROP DEFAULT;

ALTER TABLE public.profiles
  ALTER COLUMN role TYPE public.user_role
  USING role::public.user_role;

ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'user';

-- =====================================================
-- ENABLE RLS

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE SECURITY DEFINER FUNCTIONS

CREATE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role IN ('admin', 'super_admin')
  FROM public.profiles
  WHERE id = auth.uid();
$$;

CREATE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role = 'super_admin'
  FROM public.profiles
  WHERE id = auth.uid();
$$;

-- =====================================================
-- USER POLICIES

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile (no role change)"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND role = (
    SELECT role FROM public.profiles WHERE id = auth.uid()
  )
);

-- =====================================================
-- Admin can manage only 'user'

CREATE POLICY "Admins can manage users"
ON public.profiles
FOR ALL
USING (
  public.is_admin()
  AND role = 'user'
);

--  SUPER ADMIN POLICIES
-- Full access

CREATE POLICY "Super admin full access"
ON public.profiles
FOR ALL
USING (public.is_super_admin());

COMMIT;
