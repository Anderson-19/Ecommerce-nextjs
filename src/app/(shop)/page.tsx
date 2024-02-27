import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function ShopPage({ searchParams }: Props) {

  const { page } = searchParams;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page: ( page ? +page : 1) });

  if ( products.length === 0 ) redirect('/');

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={ products } />

      <Pagination totalPages={totalPages}/>
    </>
  );
}
