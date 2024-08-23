"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import NewProductModal from "../ui/NewProductModal";
import TableOfStock from "../ui/TableOfStock";
import { NewItemIcon } from "../ui/Icons";
import { useData } from "../context/DataContext";

function Page() {
  const { products, setProducts, setRender } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-3">
        <h1 className="text-3xl">Control de Stock</h1>
        <Button variant="flat" color="secondary" onClick={openModal}>
          <NewItemIcon />
          Agregar Producto
        </Button>
      </div>
      <TableOfStock products={products} setProducts={setProducts} />
      <NewProductModal
        setRender={setRender}
        products={products}
        setProducts={setProducts}
        open={isModalOpen}
        close={closeModal}
      />
    </div>
  );
}

export default Page;
