import { Box } from "@chakra-ui/react";

export default function CurrentLocationMarker() {
  return (
    <Box
      w={6}
      h={6}
      borderRadius="50%"
      bg="blue.500"
      border="2px solid white"
      boxShadow="0 0 5px rgba(0, 0, 0, 0.5)"
      position="relative"
    >
      <Box
        w={8}
        h={8}
        borderRadius="50%"
        bg="blue.200"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        opacity="0.3"
      />
    </Box>
  )
}