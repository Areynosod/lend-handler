import SignUpForm from '@/features/auth/signup/SignUpForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup')({
  component: SignUpForm,
})
