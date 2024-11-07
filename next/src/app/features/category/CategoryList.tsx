import { Accordion, Button, HStack } from '@chakra-ui/react'
import CustomAccordionItem from '@/components/molecules/CustomAccordionItem'
import { useCategoryStore } from '@/store/store'
import { CategoriesType } from '@/types/types'

type CategoryListProps = {
  categories: Array<CategoriesType> | null
  onClose: () => void
}

export default function CategoryList({
  categories,
  onClose,
}: CategoryListProps) {
  const { setSelectedCategory } = useCategoryStore()

  const onSelectCategory = (category: { id: number; name: string }) => {
    setSelectedCategory(category)
    onClose()
  }

  return (
    <Accordion allowMultiple>
      {categories?.map((category) => (
        <CustomAccordionItem title={category.name} key={category.id}>
          {category.children.map((child_category) => (
            <CustomAccordionItem
              title={child_category.name}
              key={child_category.id}
              triggerBgColor="white"
            >
              <HStack flexWrap="wrap" spacing={4} px={4} py={2}>
                {child_category.children.map((grand_child_category) => (
                  <Button
                    variant="ghost"
                    key={grand_child_category.id}
                    fontWeight="normal"
                    fontSize="sm"
                    height="auto"
                    padding={0}
                    sx={{
                      '&:not(:last-child)::after': {
                        content: '""',
                        marginLeft: 4,
                        display: 'block',
                        width: '1px',
                        height: '1em',
                        backgroundColor: 'brand.black',
                      },
                    }}
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() =>
                      onSelectCategory({
                        id: grand_child_category.id as number,
                        name: grand_child_category.name,
                      })
                    }
                  >
                    {grand_child_category.name}
                  </Button>
                ))}
              </HStack>
            </CustomAccordionItem>
          ))}
        </CustomAccordionItem>
      ))}
    </Accordion>
  )
}
