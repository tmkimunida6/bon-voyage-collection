export const Tabs = {
  variants: {
    enclosed: {
      tablist: {
        borderBottom: 'none',
      },
      tab: {
        borderBottomColor: 'brand.primary',
        _selected: {
          color: 'brand.primary',
          borderColor: 'brand.primary',
          borderBottomColor: 'transparent',
          fontWeight: "bold",
          pointerEvents: "none"
        },
        _hover: {
          backgroundColor: 'brand.primary',
          fontWeight: "bold",
          color: 'white'
        }
      },
    },
  },
}
