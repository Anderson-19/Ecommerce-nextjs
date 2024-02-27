import Image from 'next/image';

import { OrderStatus, Title } from "@/components";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {

  const { id } = params;
  const { order } = await getOrderById(id);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">

            <OrderStatus isPaid={order?.isPaid!} />

            {/* Items */}
            {
              order?.OrderItem.map(order => (

                <div key={`${order.product.slug}-${order.size}`} className="flex mb-5">
                  <Image
                    src={`/products/${order.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={order.product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <span>
                      {order.product.title} - Size: {order.size} ({order.quantity})
                    </span>
                    <p className="font-bold">{currencyFormat(order.price * order.quantity)}</p>

                  </div>

                </div>

              ))
            }
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}</p>
              <p>{order?.OrderAddress?.address}</p>
              <p>{order?.OrderAddress?.address2}</p>
              <p>{order?.OrderAddress?.postalCode}</p>
              <p>{order?.OrderAddress?.city}, {order?.OrderAddress?.countryId}</p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">{order?.itemsInOrder} artículos</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order?.subTotal!)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order?.tax!)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(order?.total!)}</span>

            </div>

            <div className="mt-5 mb-2 w-full">
              <OrderStatus isPaid={order?.isPaid!} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}