import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Flex,
  Heading,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Badge,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex
        px="5"
        justifyContent={"space-between"}
        mb={5}
        alignItems={"center"}
      >
        <Heading>
          <Skeleton>Lista de Produtos</Skeleton>
        </Heading>
        <Skeleton>
          <Button colorScheme="blue" leftIcon={<AddIcon />}>
            <Skeleton>Incluir Produto</Skeleton>
          </Button>
        </Skeleton>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>
                <Skeleton>Id</Skeleton>
              </Th>
              <Th>
                <Skeleton>Nome</Skeleton>
              </Th>
              <Th>
                <Skeleton>Descricao</Skeleton>
              </Th>
              <Th>
                <Skeleton>Em Estoque</Skeleton>
              </Th>
              <Th isNumeric>
                <Skeleton>Preço</Skeleton>
              </Th>
              <Th>
                <Skeleton>Ações</Skeleton>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton>01</Skeleton>{" "}
                </Td>
                <Td>
                  <HStack>
                    <SkeletonCircle>AD</SkeletonCircle>
                    <Text>
                      <Skeleton>Nome</Skeleton>
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Skeleton>Descrição</Skeleton>
                </Td>
                <Td>
                  <Badge colorScheme={"green"}>
                    <Skeleton>Sim</Skeleton>
                  </Badge>
                </Td>
                <Td isNumeric>
                  <Skeleton>123</Skeleton>
                </Td>
                <Td>
                  <HStack>
                    <SkeletonCircle>1</SkeletonCircle>
                    <SkeletonCircle>2</SkeletonCircle>
                    <SkeletonCircle>3</SkeletonCircle>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProductSkeleton;
