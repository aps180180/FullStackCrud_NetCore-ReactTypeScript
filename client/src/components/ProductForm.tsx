import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  Text,
  Switch,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { Product } from "../types/product";

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
  currentData?: Product;
  isView: boolean;
};

const ProductForm = ({
  isOpen,
  onClose,
  fetchProduct,
  currentData,
  isView,
}: ProductFormProps) => {
  const toast = useToast();

  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    description: currentData?.description || "",
    price: currentData?.price || 0,
    isInStore: currentData?.isInStore || false,
  });

  useEffect(() => {
    setProduct({
      id: currentData?.id || 0,
      name: currentData?.name || "",
      description: currentData?.description || "",
      price: currentData?.price || 0,
      isInStore: currentData?.isInStore || false,
    });
  }, [currentData]);

  const onSave = () => {
    console.log(currentData);
    if (product.id > 0) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const addProduct = () => {
    axios
      .post(BASE_URL + "product", product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Inclusão de Produto",
          description: "Produto incluído com sucesso!",
          isClosable: true,
          duration: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProduct = () => {
    axios
      .put(BASE_URL + "product/" + currentData?.id, product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Edição de Produto",
          description: "Produto alterado com sucesso!",
          isClosable: true,
          duration: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader shadow={"sm"}>
          {isView ? "Visualizar Produto" : product.id > 0 ? "Editar Produto" : "Incluir Produto"}            
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} alignItems={"self-start"}>
              <FormControl>
                <FormLabel>Nome do Produto</FormLabel>
                <Input
                  readOnly={isView}
                  type="text"
                  placeholder="Nome do Produto"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descrição do Produto</FormLabel>
                <Textarea
                  readOnly={isView}
                  placeholder="Descrição do Produto"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Preço</FormLabel>
                <Input
                  readOnly={isView}
                  type="number"
                  placeholder="Preço"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </FormControl>
              <Text>Em estoque</Text>
              <Switch
                readOnly={isView}
                isChecked={product.isInStore}
                onChange={(e) =>
                  setProduct({ ...product, isInStore: e.target.checked })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Fechar
            </Button>
            {!isView && (
              <Button colorScheme="blue" onClick={onSave}>
                Salvar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
