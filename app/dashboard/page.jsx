"use client";

import { useState, useMemo } from "react";
import { StockChart } from "../ui/StockChart";
import { MovementsChart } from "../ui/MovementsChart";
import { MesesChart } from "../ui/MesesChart";
import Filter from "../ui/Filter";
import { filterMovementsByDate } from "../../js/utils";
import { useData } from "../context/DataContext";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Page() {
  const { products, movements } = useData();
  const [dateRange, setDateRange] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const total = () => {
    return products.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
  };

  const filteredMovements = useMemo(() => {
    const movementsByDate = filterMovementsByDate(movements, dateRange);
    if (!selectedProduct) {
      return movementsByDate;
    }
    return movementsByDate.filter(
      (movement) => movement.producto_id === parseInt(selectedProduct)
    );
  }, [movements, dateRange, selectedProduct]);

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl  mb-3">Dashboard</h1>
      <div className="grid grid-cols-5 md:grid-rows-5 grid-rows-8 gap-3 w-full max-h-[85vh]">
        <Card
          className="md:col-span-3 md:row-span-2 col-span-5 row-span-2"
          isBlurred
          shadow="md"
        >
          <CardBody className="md:px-20">
            <StockChart data={products} />
          </CardBody>
        </Card>
        <Card
          className="
          md:col-span-1 md:row-span-1 col-span-5 row-span-1"
          isBlurred
          shadow="md"
        >
          <CardBody className="flex justify-center items-center text-6xl text-violet-500 font-bold">
            <p>${total()}</p>
          </CardBody>
        </Card>
        <Card
          className="
          md:col-span-1 md:row-span-1 col-span-5 row-span-1"
          isBlurred
          shadow="md"
        >
          <CardBody className="flex justify-center items-center text-6xl text-violet-500 font-bold">
            <p>${total() * 3}</p>
          </CardBody>
        </Card>
        <Card
          className="md:col-span-2 md:row-span-4 col-span-5 row-span-2"
          isBlurred
          shadow="md"
        >
          <CardBody>
            <MesesChart />
          </CardBody>
        </Card>
        <Card
          className="md:col-span-3 md:row-span-3 col-span-5 row-span-3"
          isBlurred
          shadow="md"
        >
          <CardHeader className="flex justify-end items-center uppercase">
            <Filter
              products={products}
              setDateRange={setDateRange}
              setSelectedProduct={setSelectedProduct}
            />
          </CardHeader>
          <CardBody>
            <MovementsChart
              selectedProduct={selectedProduct}
              products={products}
              movements={filteredMovements}
            />
          </CardBody>
          <CardHeader />
        </Card>
      </div>
    </main>
  );
}
