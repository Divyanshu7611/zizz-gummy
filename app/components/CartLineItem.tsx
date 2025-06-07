// import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
// import type {CartLayout} from '~/components/CartMain';
// import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
// import {useVariantUrl} from '~/lib/variants';
// import {Link} from '@remix-run/react';
// import {ProductPrice} from './ProductPrice';
// import {useAside} from './Aside';
// import type {CartApiQueryFragment} from 'storefrontapi.generated';

// type CartLine = OptimisticCartLine<CartApiQueryFragment>;

// /**
//  * A single line item in the cart. It displays the product image, title, price.
//  * It also provides controls to update the quantity or remove the line item.
//  */
// export function CartLineItem({
//   layout,
//   line,
// }: {
//   layout: CartLayout;
//   line: CartLine;
// }) {
//   const {id, merchandise} = line;
//   const {product, title, image, selectedOptions} = merchandise;
//   const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
//   const {close} = useAside();

//   return (
//     <li className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-4">
//       {image && (
//         <Image
//           alt={title}
//           aspectRatio="1/1"
//           data={image}
//           height={100}
//           width={100}
//           className="rounded-md object-cover border border-gray-200"
//           loading="lazy"
//         />
//       )}

//       <div className="flex-1">
//         <Link
//           prefetch="intent"
//           to={lineItemUrl}
//           onClick={() => {
//             if (layout === 'aside') {
//               close();
//             }
//           }}
//           className="text-lg font-medium text-black hover:text-blue-800 transition-colors duration-150"
//         >
//           <strong>{product.title}</strong>
//         </Link>
//         <ProductPrice price={line?.cost?.totalAmount} />
//         {/* <ul className="mt-2 text-sm text-gray-600"> */}
//           {/* {selectedOptions.map((option) => (
//             <li key={option.name}>
//               <span>
//                 {option.name}: {option.value}
//               </span>
//             </li>
//           ))} */}
//         {/* </ul> */}
//         <CartLineQuantity line={line} />
//       </div>
//     </li>
//   );
// }

// /**
//  * Provides the controls to update the quantity of a line item in the cart.
//  * These controls are disabled when the line item is new, and the server
//  * hasn't yet responded that it was successfully added to the cart.
//  */
// function CartLineQuantity({line}: {line: CartLine}) {
//   if (!line || typeof line?.quantity === 'undefined') return null;
//   const {id: lineId, quantity, isOptimistic} = line;
//   const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
//   const nextQuantity = Number((quantity + 1).toFixed(0));

//   return (
//     <div className="flex space-x-2 mt-3 flex-col items-start">
//       <div>
//       <span className="text-sm font-medium text-gray-700">Quantity: {quantity}</span>
        
//       </div>

//       <div className='flex gap-2'>
//       <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
//         <button
//           aria-label="Decrease quantity"
//           disabled={quantity <= 1 || !!isOptimistic}
//           name="decrease-quantity"
//           value={prevQuantity}
//           className="p-2 px-3 bg-black rounded-xl cursor-pointer disabled:opacity-50 transition-colors duration-150"
//         >
//           <span className="text-lg font-bold text-white">−</span>
//         </button>
//       </CartLineUpdateButton>
//       <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
//         <button
//           aria-label="Increase quantity"
//           name="increase-quantity"
//           value={nextQuantity}
//           disabled={!!isOptimistic}
//           className="p-2 px-3 bg-black rounded-xl disabled:opacity-50 cursor-pointer transition-colors duration-150"
//         >
//           <span className="text-lg font-bold text-white">+</span>
//         </button>
//       </CartLineUpdateButton>

//       </div>
//       <div>

//       <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
//       </div>
//     </div>
//   );
// }

// /**
//  * A button that removes a line item from the cart. It is disabled
//  * when the line item is new, and the server hasn't yet responded
//  * that it was successfully added to the cart.
//  */
// function CartLineRemoveButton({
//   lineIds,
//   disabled,
// }: {
//   lineIds: string[];
//   disabled: boolean;
// }) {
//   return (
//     <CartForm
//       fetcherKey={getUpdateKey(lineIds)}
//       route="/cart"
//       action={CartForm.ACTIONS.LinesRemove}
//       inputs={{lineIds}}
//     >
//       <button
//         disabled={disabled}
//         type="submit"
//         className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors duration-150"
//       >
//         Remove
//       </button>
//     </CartForm>
//   );
// }

// function CartLineUpdateButton({
//   children,
//   lines,
// }: {
//   children: React.ReactNode;
//   lines: CartLineUpdateInput[];
// }) {
//   const lineIds = lines.map((line) => line.id);

//   return (
//     <CartForm
//       fetcherKey={getUpdateKey(lineIds)}
//       route="/cart"
//       action={CartForm.ACTIONS.LinesUpdate}
//       inputs={{lines}}
//     >
//       {children}
//     </CartForm>
//   );
// }

// /**
//  * Returns a unique key for the update action. This is used to make sure actions modifying the same line
//  * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
//  * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
//  * @param lineIds - line ids affected by the update
//  * @returns
//  */
// function getUpdateKey(lineIds: string[]) {
//   return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
// }




import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from '@remix-run/react';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import { toast } from 'sonner';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();

  return (
    <li className="flex items-center space-x-6 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 border border-gray-100">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          height={120}
          width={120}
          className="rounded-lg object-cover border border-gray-200"
          loading="lazy"
        />
      )}

      <div className="flex flex-col gap-2">
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
          className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          {product.title}
        </Link>

        <ul className="text-sm text-gray-600">
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <span>
                {option.name}: {option.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start justify-between">
          <ProductPrice price={line?.cost?.totalAmount} />
          <CartLineQuantity line={line} />
        </div>
      </div>
    </li>
  );
}

function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex flex-col items-end mt-1 gap-3">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 transition-colors duration-150"
          >
            <span className="text-lg font-medium">−</span>
          </button>
        </CartLineUpdateButton>

        <span className="px-4 py-1 text-gray-900 font-medium">{quantity}</span>

        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 transition-colors duration-150"
          >
            <span className="text-lg font-medium">+</span>
          </button>
        </CartLineUpdateButton>
      </div>

      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        onClick={()=>(toast.success('Item Removed'))}
        className="text-sm cursor-pointer font-medium text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors duration-150"
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}