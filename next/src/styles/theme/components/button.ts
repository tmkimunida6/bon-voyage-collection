export const Button = {
  variants: {
    primary: {
      bg: 'brand.primary',
      borderColor: 'brand.primary',
      color: 'white',
      borderWidth: 2,
      _hover: {
        bg: 'white',
        color: 'brand.primary',
      },
    },
    ghost: {
      _hover: {
        bg: 'transparent',
      },
      _focus_visible: {
        boxShadow: 'none',
      },
      _active: {
        bg: 'transparent',
      },
    },
    outline: {
      bg: 'white',
      borderColor: 'brand.primary',
      borderWidth: 2,
      color: 'brand.primary',
      _hover: {
        bg: 'brand.primary',
        color: 'white',
      },
    },
  },
  baseStyle: {
    width: 'max-content',
    _disabled: {
      pointerEvents: 'none',
    },
  },
}
