export const Form = {
  Input: {
    baseStyle: {
      field: {
        background: '#fff',
        backgroundColor: 'white',
        _placeholder: {
          color: 'gray.400',
        },
      },
    },
  },
  Select: {
    baseStyle: {
      field: {
        background: '#fff',
        color: '#333',
        borderRadius: '0.375rem',
      },
    },
  },
  Textarea: {
    variants: {
      outline: {
        bgColor: '#fff',
      },
    },
  },
  FormLabel: {
    baseStyle: {
      fontWeight: 'bold',
    },
  },
  Checkbox: {
    baseStyle: {
      container: {
        alignItems: 'flex-start',
      },
      control: {
        _checked: {
          bg: 'brand.primary',
          borderColor: 'brand.primary',
          _hover: {
            bg: 'brand.primary',
            borderColor: 'brand.primary',
          },
        },
      },
    },
  },
}
