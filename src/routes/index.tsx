import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signin' })
    }
  },
})

function App() {
  return (
    <div className="flex w-full max-w-7xl mx-auto flex-col gap-4 p-6">
      <p>home screen</p>
    </div>
  )
}
