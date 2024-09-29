import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import "./App.css";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useEffect, useState } from "react";
import { Product } from "./types/product";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductForm from "./components/ProductForm";

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentData, setCurrentData] = useState<Product>({} as Product);
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "product")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getProduct = (id: number) => {
    axios
      .get<Product>(BASE_URL + "product/" + id)
      .then((res) => {
        console.log(res);
        setCurrentData(res.data);
        onOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteHandle = (id: number) => {
    axios
      .delete(BASE_URL + "product/" + id)
      .then(() => {
        toast({
          title: "Exclusão de Produto",
          description: "Produto excluído com sucesso!",
          duration: 1000,
          isClosable: true,
        });
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) return <ProductSkeleton />;
  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex
        px="5"
        justifyContent={"space-between"}
        mb={5}
        alignItems={"center"}
      >
        <Heading fontSize={18}>Lista de Produtos</Heading>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => {
            setCurrentData({} as Product); // Reseta o currentData para inclusão
            setIsView(false);
            onOpen();
          }}
        >
          Incluir Produto
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Em Estoque</Th>
              <Th isNumeric>Preço</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar size={"sm"} name={product.name} />
                    <Text> {product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>
                  <Badge colorScheme={product.isInStore ? "green" : "red"}>
                    {product.isInStore ? "Sim" : "Não"}
                  </Badge>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <HStack gap={5}>
                    <Tooltip label="Editar Produto" fontSize="md">
                      <EditIcon
                        color={"blue"}
                        boxSize={22}
                        onClick={() => {
                          setIsView(false);
                          getProduct(product.id);
                        }}
                      />
                    </Tooltip>

                    <Popover>
                      <PopoverTrigger>
                        <Box>
                          <Tooltip label="Excluir Produto" fontSize="md">
                            <DeleteIcon color={"red"} boxSize={22} />
                          </Tooltip>
                        </Box>
                      </PopoverTrigger>

                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirme</PopoverHeader>
                        <PopoverBody>
                          Você deseja excluir esse registro?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            float={"right"}
                            colorScheme="red"
                            onClick={() => onDeleteHandle(product.id)}
                          >
                            Excluir
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <Tooltip label="Visualizar Produto" fontSize="md">
                      <ViewIcon
                        color={"green"}
                        boxSize={22}
                        onClick={() => {
                          setIsView(true);
                          getProduct(product.id);
                        }}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length == 0 && (
        <Heading p={5} textAlign={"center"} fontSize={14}>
          Sem dados para exibir
        </Heading>
      )}

      {isOpen && (
        <ProductForm
          currentData={currentData}
          isOpen={isOpen}
          onClose={onClose}
          fetchProduct={fetchData}
          isView={isView}
        />
      )}
    </Box>
  );
}

export default App;
