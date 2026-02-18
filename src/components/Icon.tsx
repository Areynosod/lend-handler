import { icons } from 'lucide-react'

interface Props {
  name: keyof typeof icons
  size?: number
  color?: string
  isFilled?: boolean
  strokeWidth?: number
  isButton?: boolean
  onPress?: () => void
  disabled?: boolean
}

export const Icon = ({
  name,
  size = 24,
  color = '#000',
  isFilled = false,
  strokeWidth = 2,
  isButton = false,
  onPress,
  disabled,
}: Props) => {
  const LucideIcon = icons[name]

  if (isButton) {
    return (
      <button type="button" onClick={onPress} disabled={disabled}>
        <LucideIcon
          color={color}
          size={size}
          fill={isFilled ? color : 'none'}
          strokeWidth={strokeWidth}
        />
      </button>
    )
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      fill={isFilled ? color : 'none'}
      strokeWidth={strokeWidth}
    />
  )
}
