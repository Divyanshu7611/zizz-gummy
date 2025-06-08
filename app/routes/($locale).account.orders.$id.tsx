// import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
// import { useLoaderData, type MetaFunction } from '@remix-run/react';
// import { Money, Image, flattenConnection } from '@shopify/hydrogen';
// import type { OrderLineItemFullFragment } from 'customer-accountapi.generated';
// import { CUSTOMER_ORDER_QUERY } from '~/graphql/customer-account/CustomerOrderQuery';
// import { FaBoxOpen, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
// import Button from '~/components/mini/Button';

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   return [{ title: `Order ${data?.order?.name}` }];
// };

// export async function loader({ params, context }: LoaderFunctionArgs) {
//   if (!params.id) {
//     return redirect('/account/orders');
//   }

//   const orderId = atob(params.id);
//   const { data, errors } = await context.customerAccount.query(
//     CUSTOMER_ORDER_QUERY,
//     {
//       variables: { orderId },
//     },
//   );

//   if (errors?.length || !data?.order) {
//     throw new Error('Order not found');
//   }

//   const { order } = data;

//   const lineItems = flattenConnection(order.lineItems);
//   const discountApplications = flattenConnection(order.discountApplications);

//   const fulfillmentStatus =
//     flattenConnection(order.fulfillments)[0]?.status ?? 'N/A';

//   const firstDiscount = discountApplications[0]?.value;

//   const discountValue =
//     firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

//   const discountPercentage =
//     firstDiscount?.__typename === 'PricingPercentageValue' &&
//     firstDiscount?.percentage;

//   return {
//     order,
//     lineItems,
//     discountValue,
//     discountPercentage,
//     fulfillmentStatus,
//   };
// }

// interface LoaderData {
//   order: any;
//   lineItems: OrderLineItemFullFragment[];
//   discountValue?: any;
//   discountPercentage?: number;
//   fulfillmentStatus: string;
// }

// export default function OrderRoute() {
//   const {
//     order,
//     lineItems,
//     discountValue,
//     discountPercentage,
//     fulfillmentStatus,
//   } = useLoaderData<LoaderData>();

//   return (
//     <div className="account-order p-6 mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//         <FaBoxOpen className="mr-2 text-black" />
//         Order {order.name}
//       </h2>
//       <p className="text-gray-600 mb-6 flex items-center">
//         <FaCalendarAlt className="mr-2 text-gray-500" />
//         Placed on {new Date(order.processedAt!).toLocaleDateString()}
//       </p>

//       <div>
//         {/* Order Items Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="px-4 py-3 text-left">Product</th>
//                 <th className="px-4 py-3 text-left">Price</th>
//                 <th className="px-4 py-3 text-left">Quantity</th>
//                 <th className="px-4 py-3 text-left">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {lineItems.map((lineItem, index) => (
//                 <OrderLineRow key={lineItem.id || index} lineItem={lineItem} />
//               ))}
//             </tbody>
//             <tfoot className="border-t">
//               {((discountValue && discountValue.amount) || discountPercentage) && (
//                 <tr>
//                   <td colSpan={3} className="px-4 py-3 font-semibold text-gray-700">
//                     Discounts
//                   </td>
//                   <td className="px-4 py-3 text-gray-700">
//                     {discountPercentage ? (
//                       <span>-{discountPercentage}% OFF</span>
//                     ) : (
//                       discountValue && <Money data={discountValue} />
//                     )}
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan={3} className="px-4 py-3 font-semibold text-gray-700">
//                   Subtotal
//                 </td>
//                 <td className="px-4 py-3 text-gray-700">
//                   <Money data={order.subtotal!} />
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={3} className="px-4 py-3 font-semibold text-gray-700">
//                   Tax
//                 </td>
//                 <td className="px-4 py-3 text-gray-700">
//                   <Money data={order.totalTax!} />
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={3} className="px-4 py-3 font-bold text-gray-800">
//                   Total
//                 </td>
//                 <td className="px-4 py-3 font-bold text-gray-800">
//                   <Money data={order.totalPrice!} />
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         {/* Shipping and Status */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//               <FaMapMarkerAlt className="mr-2 text-[#66BB6A]" />
//               Shipping Address
//             </h3>
//             {order?.shippingAddress ? (
//               <address className="text-gray-600 not-italic">
//                 <p>{order.shippingAddress.name}</p>
//                 {order.shippingAddress.formatted && (
//                   <p>{order.shippingAddress.formatted.join(', ')}</p>
//                 )}
//                 {order.shippingAddress.formattedArea && (
//                   <p>{order.shippingAddress.formattedArea}</p>
//                 )}
//               </address>
//             ) : (
//               <p className="text-gray-600">No shipping address defined</p>
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Status</h3>
//             <p
//               className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                 fulfillmentStatus === 'SUCCESS'
//                   ? 'bg-[#66BB6A] text-green-800'
//                   : 'bg-yellow-100 text-yellow-800'
//               }`}
//             >
//               {fulfillmentStatus}
//             </p>
//           </div>
//         </div>

//         {/* Order Status Link */}
//         <div className="mt-6">
//           <a
//             target="_blank"
//             href={order.statusPageUrl}
//             rel="noreferrer"
//           >
//             <Button text='View Order Status' bgColor='bg-black' icon={<FaExternalLinkAlt/>}/>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface OrderLineRowProps {
//   lineItem: OrderLineItemFullFragment;
// }

// function OrderLineRow({ lineItem }: OrderLineRowProps) {
//   return (
//     <tr className="border-b last:border-b-0">
//       <td className="px-4 py-3">
//         <div className="flex items-center">
//           {lineItem?.image && (
//             <div className="mr-4">
//               <Image
//                 data={lineItem.image}
//                 width={64}
//                 height={64}
//                 className="rounded-md object-cover"
//               />
//             </div>
//           )}
//           <div>
//             <p className="font-medium text-gray-800">{lineItem.title}</p>
//             <p className="text-sm text-gray-500">{lineItem.variantTitle}</p>
//           </div>
//         </div>
//       </td>
//       <td className="px-4 py-3">
//         <Money data={lineItem.price!} />
//       </td>
//       <td className="px-4 py-3">{lineItem.quantity}</td>
//       <td className="px-4 py-3">
//         <Money data={lineItem.totalDiscount!} />
//       </td>
//     </tr>
//   );
// }



import { redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Money, Image, flattenConnection } from '@shopify/hydrogen';
import type { OrderLineItemFullFragment } from 'customer-accountapi.generated';
import { CUSTOMER_ORDER_QUERY } from '~/graphql/customer-account/CustomerOrderQuery';
import { FaBoxOpen, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import Button from '~/components/mini/Button';

// Meta and Loader functions remain unchanged
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Order ${data?.order?.name}` }];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_ORDER_QUERY,
    {
      variables: { orderId },
    },
  );

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const { order } = data;

  const lineItems = flattenConnection(order.lineItems);
  const discountApplications = flattenConnection(order.discountApplications);

  const fulfillmentStatus =
    flattenConnection(order.fulfillments)[0]?.status ?? 'N/A';

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

interface LoaderData {
  order: any;
  lineItems: OrderLineItemFullFragment[];
  discountValue?: any;
  discountPercentage?: number;
  fulfillmentStatus: string;
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<LoaderData>();

  return (
    <div className="account-order p-6 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaBoxOpen className="mr-2 text-black" />
        Order {order.name}
      </h2>
      <p className="text-gray-600 mb-6 flex items-center">
        <FaCalendarAlt className="mr-2 text-gray-500" />
        Placed on {new Date(order.processedAt!).toLocaleDateString()}
      </p>

      <div>
        {/* Order Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto responsive-table">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((lineItem, index) => (
                <OrderLineRow key={lineItem.id || index} lineItem={lineItem} />
              ))}
            </tbody>
            <tfoot className="border-t">
              {((discountValue && discountValue.amount) || discountPercentage) && (
                <tr>
                  <td colSpan={3} className="px-4 py-3 font-semibold text-gray-700">
                    Discounts
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {discountPercentage ? (
                      <span>-{discountPercentage}% OFF</span>
                    ) : (
                      discountValue && <Money data={discountValue} />
                    )}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={3} className="px-4 py-3 font-semibold text-gray-700">
                  Subtotal
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <Money data={order.subtotal!} />
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-3 font-semibold text-gray-700">
                  Tax
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <Money data={order.totalTax!} />
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-3 font-bold text-gray-800">
                  Total
                </td>
                <td className="px-4 py-3 font-bold text-gray-800">
                  <Money data={order.totalPrice!} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Shipping and Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-[#66BB6A]" />
              Shipping Address
            </h3>
            {order?.shippingAddress ? (
              <address className="text-gray-600 not-italic">
                <p>{order.shippingAddress.name}</p>
                {order.shippingAddress.formatted && (
                  <p>{order.shippingAddress.formatted.join(', ')}</p>
                )}
                {order.shippingAddress.formattedArea && (
                  <p>{order.shippingAddress.formattedArea}</p>
                )}
              </address>
            ) : (
              <p className="text-gray-600">No shipping address defined</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Status</h3>
            <p
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                fulfillmentStatus === 'SUCCESS'
                  ? 'bg-[#66BB6A] text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {fulfillmentStatus}
            </p>
          </div>
        </div>

        {/* Order Status Link */}
        <div className="mt-6">
          <a
            target="_blank"
            href={order.statusPageUrl}
            rel="noreferrer"
          >
            <Button text='View Order Status' bgColor='bg-black' icon={<FaExternalLinkAlt/>}/>
          </a>
        </div>
      </div>

      {/* Add CSS for responsive table */}
      <style jsx>{`
        @media (max-width: 640px) {
          .responsive-table {
            border: 0;
          }

          .responsive-table thead {
            display: none;
          }

          .responsive-table tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            padding: 0.5rem;
          }

          .responsive-table tbody td {
            display: block;
            text-align: left;
            padding: 0.5rem;
            border: none;
            position: relative;
          }

          .responsive-table tbody td:before {
            content: attr(data-label);
            font-weight: 600;
            color: #374151;
            display: block;
            margin-bottom: 0.25rem;
          }

          .responsive-table tfoot tr {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            border: none;
          }

          .responsive-table tfoot td {
            flex: 1 1 50%;
            text-align: left;
            padding: 0.5rem;
            border: none;
          }

          .responsive-table tfoot td[colspan="3"] {
            flex: 1 1 50%;
            font-weight: 600;
          }

          .responsive-table tbody td[data-label="Product"] {
            display: flex;
            flex-direction: column;
          }

          .responsive-table tbody td[data-label="Product"] > div {
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

interface OrderLineRowProps {
  lineItem: OrderLineItemFullFragment;
}

function OrderLineRow({ lineItem }: OrderLineRowProps) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="px-4 py-3" data-label="Product">
        <div className="flex items-center">
          {lineItem?.image && (
            <div className="mr-4">
              <Image
                data={lineItem.image}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-800">{lineItem.title}</p>
            <p className="text-sm text-gray-500">{lineItem.variantTitle}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3" data-label="Price">
        <Money data={lineItem.price!} />
      </td>
      <td className="px-4 py-3" data-label="Quantity">
        {lineItem.quantity}
      </td>
      <td className="px-4 py-3" data-label="Total">
        <Money data={lineItem.totalDiscount!} />
      </td>
    </tr>
  );
}