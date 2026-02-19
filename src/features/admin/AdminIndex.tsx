import { useState } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase/database'
import {
  useAdminProfiles,
  useUpdateProfileRole,
} from '@/features/admin/utils/hooks'

type UserRole = Database['public']['Enums']['user_role']

export function AdminIndex() {
  const { data: profile } = useUserProfile()
  const isSuperAdmin = profile?.role === 'super_admin'

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [cursorStack, setCursorStack] = useState<
    Array<{ created_at: string; id: string }>
  >([])
  const [currentCursor, setCurrentCursor] = useState<{
    created_at: string
    id: string
  } | null>(null)

  const { data, isLoading, isFetching } = useAdminProfiles({
    search: debouncedSearch,
    cursor: currentCursor,
  })

  const updateRole = useUpdateProfileRole()

  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    if (debounceTimer) clearTimeout(debounceTimer)
    const timer = setTimeout(() => {
      setDebouncedSearch(value)
      setCurrentCursor(null)
      setCursorStack([])
    }, 300)
    setDebounceTimer(timer)
  }

  const handleNextPage = () => {
    if (data?.nextCursor) {
      setCursorStack((prev) => [
        ...prev,
        currentCursor ?? { created_at: '', id: '' },
      ])
      setCurrentCursor(data.nextCursor)
    }
  }

  const handlePrevPage = () => {
    if (cursorStack.length > 0) {
      const newStack = [...cursorStack]
      const prevCursor = newStack.pop()!
      setCursorStack(newStack)
      setCurrentCursor(prevCursor.id === '' ? null : prevCursor)
    }
  }

  const handleRoleChange = (profileId: string, newRole: UserRole) => {
    updateRole.mutate({ profileId, role: newRole })
  }

  const pageNumber = cursorStack.length + 1
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          Panel de Administración
        </h1>
        {profile && (
          <p className="text-muted-foreground text-sm">
            Bienvenido, {profile.first_name} ({profile.role})
          </p>
        )}
      </div>

      <div className="mb-4">
        <Input
          placeholder="Búsqueda por nombre o correo..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="md:hidden flex flex-col gap-3">
        {isLoading ? (
          <p className="text-muted-foreground py-8 text-center">Cargando...</p>
        ) : data?.profiles.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            No se encontraron perfiles.
          </p>
        ) : (
          data?.profiles.map((p) => (
            <div key={p.id} className="rounded-md border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {p.first_name} {p.last_name}
                </span>
                <RoleBadge role={p.role} />
              </div>
              <p className="text-muted-foreground text-sm break-all">
                {p.email}
              </p>
              <p className="text-muted-foreground text-xs">
                {p.created_at
                  ? new Date(p.created_at).toLocaleDateString()
                  : '—'}
              </p>
              {isSuperAdmin && p.id !== profile.id && (
                <Select
                  value={p.role ?? 'user'}
                  onValueChange={(value) =>
                    handleRoleChange(p.id, value as UserRole)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="super_admin">
                      Super Administrador
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
              {isSuperAdmin && p.id === profile.id && (
                <span className="text-muted-foreground text-xs">
                  Usuario actual
                </span>
              )}
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Nombre</th>
              <th className="px-4 py-3 text-left font-medium">Correo</th>
              <th className="px-4 py-3 text-left font-medium">Rol</th>
              <th className="px-4 py-3 text-left font-medium">Creado</th>
              {isSuperAdmin && (
                <th className="px-4 py-3 text-left font-medium">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={isSuperAdmin ? 5 : 4}
                  className="text-muted-foreground px-4 py-8 text-center"
                >
                  Cargando...
                </td>
              </tr>
            ) : data?.profiles.length === 0 ? (
              <tr>
                <td
                  colSpan={isSuperAdmin ? 5 : 4}
                  className="text-muted-foreground px-4 py-8 text-center"
                >
                  No se encontraron perfiles.
                </td>
              </tr>
            ) : (
              data?.profiles.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    {p.first_name} {p.last_name}
                  </td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3">
                    <RoleBadge role={p.role} />
                  </td>
                  <td className="text-muted-foreground px-4 py-3">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString()
                      : '—'}
                  </td>
                  {isSuperAdmin && (
                    <td className="px-4 py-3">
                      {p.id !== profile.id ? (
                        <Select
                          value={p.role ?? 'user'}
                          onValueChange={(value) =>
                            handleRoleChange(p.id, value as UserRole)
                          }
                        >
                          <SelectTrigger className="w-35">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Usuario</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="super_admin">
                              Super Administrador
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          Usuario actual
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Página {pageNumber}
          {isFetching && !isLoading && ' — Cargando...'}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={cursorStack.length === 0}
            onClick={handlePrevPage}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!data?.hasNextPage}
            onClick={handleNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

function RoleBadge({ role }: { role: UserRole | null }) {
  const getRoleLavel = (r: UserRole | null) => {
    switch (r) {
      case 'super_admin':
        return 'Super Administrador'
      case 'admin':
        return 'Administrador'
      case 'user':
        return 'Usuario'
      default:
        return 'Usuario'
    }
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        role === 'super_admin' &&
          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        role === 'admin' &&
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        role === 'user' &&
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      )}
    >
      {getRoleLavel(role)}
    </span>
  )
}
