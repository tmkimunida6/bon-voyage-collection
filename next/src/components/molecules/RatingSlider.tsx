'use client'

import {
  Box,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import { useState } from 'react'
import CustomIcon from '../atoms/CustomIcon'

const RatingSlider = () => {
  const [sliderValue, setSliderValue] = useState(0)
  const [rating, setRating] = useState<number | ''>('')
  const isUnrated = Number(rating) < 1

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
    color: 'brand.black',
  }

  const handleSliderChange = (val: number) => {
    setSliderValue(val)
    setRating(Math.ceil((val / 20) * 2) / 2)
  }

  return (
    <Box p={4} pt={6}>
      <Slider defaultValue={0} onChange={handleSliderChange}>
        <SliderMark value={0} {...labelStyles}>
          0
        </SliderMark>
        <SliderMark value={20} {...labelStyles}>
          1
        </SliderMark>
        <SliderMark value={40} {...labelStyles}>
          2
        </SliderMark>
        <SliderMark value={60} {...labelStyles}>
          3
        </SliderMark>
        <SliderMark value={80} {...labelStyles}>
          4
        </SliderMark>
        <SliderMark value={100} {...labelStyles}>
          5
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="transparent"
          color="brand.black"
          fontWeight="bold"
          mt={-10}
          ml={-2}
          w="40px"
        >
          {isUnrated ? '' : rating}
        </SliderMark>
        <SliderTrack bg="gray.200">
          <SliderFilledTrack bg="brand.primary" />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color="brand.star">
            <CustomIcon iconName="FaStar" />
          </Box>
        </SliderThumb>
      </Slider>
      <Input type="hidden" name="rating" value={isUnrated ? '' : rating} />
    </Box>
  )
}

export default RatingSlider
