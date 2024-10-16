export const Button = {
  variants: {
    primary: {
      bg: 'brand.primary',
      color: 'white',
    },
    secondary: {
      bg: 'brand.gray',
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
  },
  baseStyle: {
    width: 'max-content',
    _hover: {
      _disabled: {
        background: '',
      },
    },
  },
}
