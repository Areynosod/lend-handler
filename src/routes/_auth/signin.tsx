import { createFileRoute } from '@tanstack/react-router'

import SignInForm from '@/features/auth/signin/SignInForm'

export const Route = createFileRoute('/_auth/signin')({
  component: SignInForm,
})
