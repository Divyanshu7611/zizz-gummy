
import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { CUSTOMER_ORDERS_QUERY } from '~/graphql/customer-account/CustomerOrdersQuery';
import Button from '~/components/mini/Button';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { FaShoppingCart } from 'react-icons/fa';
import { LuSquareArrowOutUpRight } from "react-icons/lu";

export const meta: MetaFunction = () => {
  return [{ title: 'Your Orders' }];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables,
      },
    },
  );

  if (errors?.length || !data?.customer) {
    throw new Error('Customer orders not found');
  }

  return { customer: data.customer };
}

interface LoaderData {
  customer: CustomerOrdersFragment;
}

export default function Orders() {
  const { customer } = useLoaderData<LoaderData>();
  const { orders } = customer;
  console.log('consoling the order',orders)
  const hasOrders = orders.nodes.length > 0;

  return (
    <div className="orders">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
      {hasOrders ? <OrdersTable orders={orders} /> : <EmptyOrders />}
    </div>
  );
}

interface OrdersTableProps {
  orders: CustomerOrdersFragment['orders'];
}

function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="account-orders space-y-4">
      <PaginatedResourceSection connection={orders}>
        {({ node: order }: { node: OrderItemFragment }) => (
          <OrderItem key={order.id} order={order} />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

function EmptyOrders() {
  // Dummy order data for visualization
  const dummyOrder: OrderItemFragment = {
    id: 'dummy-order-1',
    number: '#1001',
    processedAt: new Date().toISOString(),
    financialStatus: 'PAID',
    totalPrice: { amount: '99.99', currencyCode: 'USD' },
    fulfillments: { edges: [{ node: { status: 'SUCCESS' } }] },
  };

  return (
    <div className="text-center py-8 bg-white rounded-lg shadow-md">
      <FaShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No Orders Yet
      </h3>
      <p className="text-gray-600 mb-4 max-w-sm mx-auto">
        You haven't placed any orders yet. Start shopping to see your orders here!
      </p>
      <Link
        to="/collections"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        Start Shopping
      </Link>
      <div className="mt-6 max-w-md mx-auto">
        <h4 className="text-base font-medium text-gray-700 mb-3">
          Example Order:
        </h4>
        <OrderItem order={dummyOrder} isDummy />
      </div>
    </div>
  );
}

interface OrderItemProps {
  order: OrderItemFragment;
  isDummy?: boolean;
}

function OrderItem({ order, isDummy = false }: OrderItemProps) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;

  return (
    <div
      className={`bg-white rounded-lg shadow-md mt-5 p-4 ${
        isDummy ? 'opacity-60' : ''
      }`}
    >
      <div className="space-y-3">
        <div>
          <Link
            to={`/account/orders/${btoa(order.id)}`}
            className="text-black font-bold hover:underline"
          >
            Order #{order.number}
          </Link>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Date: </span>
          {new Date(order.processedAt).toLocaleDateString()}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Payment: </span>
          {order.financialStatus}
        </div>
        {fulfillmentStatus && (
          <div className="text-sm">
            <span className="font-medium">Status: </span>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                fulfillmentStatus === 'SUCCESS'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {fulfillmentStatus}
            </span>
          </div>
        )}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Total: </span>
          <Money data={order.totalPrice} className="font-semibold" />
        </div>
        <div>
          <Link
            to={`/account/orders/${btoa(order.id)}`}
            className="text-blue-600 cursor-pointer text-sm font-medium"
          >
            <Button text='View Order Details' bgColor='bg-black' icon={<LuSquareArrowOutUpRight/>}/>
            
          </Link>
        </div>
      </div>
    </div>
  );
}