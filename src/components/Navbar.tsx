import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useLogout } from '@/hooks/useLogout'

export function Navbar() {
  const { data: profile } = useUserProfile()
  const logout = useLogout()
  const [menuOpen, setMenuOpen] = useState(false)

  const showAdminLink = profile?.role && profile.role !== 'user'

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="text-base sm:text-lg font-semibold tracking-tight truncate"
          >
            Manejador de Préstamos
          </Link>

          {showAdminLink && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link to="/admin">Panel Admin</Link>
            </Button>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {profile && (
            <span className="text-muted-foreground text-sm truncate max-w-37.5">
              {profile.first_name}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            disabled={logout.isPending}
            onClick={() => logout.mutate()}
          >
            {logout.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="sm:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </Button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t px-4 py-3 flex flex-col gap-2">
          {showAdminLink && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="w-full justify-start"
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/admin">Panel Admin</Link>
            </Button>
          )}

          {profile && (
            <span className="text-muted-foreground text-sm px-3 py-1">
              {profile.first_name}
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={logout.isPending}
            onClick={() => logout.mutate()}
          >
            {logout.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </Button>
        </div>
      )}
    </nav>
  )
}
