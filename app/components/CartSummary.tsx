// // import type {CartApiQueryFragment} from 'storefrontapi.generated';
// // import type {CartLayout} from '~/components/CartMain';
// // import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
// // import {useRef} from 'react';
// // import {FetcherWithComponents} from '@remix-run/react';

// // type CartSummaryProps = {
// //   cart: OptimisticCart<CartApiQueryFragment | null>;
// //   layout: CartLayout;
// // };

// // export function CartSummary({cart, layout}: CartSummaryProps) {
// //   const className =
// //     layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

// //   return (
// //     <div aria-labelledby="cart-summary" className={className}>
// //       <h4>Totals</h4>
// //       <dl className="cart-subtotal">
// //         <dt>Subtotal</dt>
// //         <dd>
// //           {cart.cost?.subtotalAmount?.amount ? (
// //             <Money data={cart.cost?.subtotalAmount} />
// //           ) : (
// //             '-'
// //           )}
// //         </dd>
// //       </dl>
// //       <CartDiscounts discountCodes={cart.discountCodes} />
// //       <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
// //       <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
// //     </div>
// //   );
// // }
// // function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
// //   if (!checkoutUrl) return null;

// //   return (
// //     <div>
// //       <a href={checkoutUrl} target="_self">
// //         <p>Continue to Checkout &rarr;</p>
// //       </a>
// //       <br />
// //     </div>
// //   );
// // }

// // function CartDiscounts({
// //   discountCodes,
// // }: {
// //   discountCodes?: CartApiQueryFragment['discountCodes'];
// // }) {
// //   const codes: string[] =
// //     discountCodes
// //       ?.filter((discount) => discount.applicable)
// //       ?.map(({code}) => code) || [];

// //   return (
// //     <div>
// //       {/* Have existing discount, display it with a remove option */}
// //       <dl hidden={!codes.length}>
// //         <div>
// //           <dt>Discount(s)</dt>
// //           <UpdateDiscountForm>
// //             <div className="cart-discount">
// //               <code>{codes?.join(', ')}</code>
// //               &nbsp;
// //               <button>Remove</button>
// //             </div>
// //           </UpdateDiscountForm>
// //         </div>
// //       </dl>

// //       {/* Show an input to apply a discount */}
// //       <UpdateDiscountForm discountCodes={codes}>
// //         <div>
// //           <input type="text" name="discountCode" placeholder="Discount code" />
// //           &nbsp;
// //           <button type="submit">Apply</button>
// //         </div>
// //       </UpdateDiscountForm>
// //     </div>
// //   );
// // }

// // function UpdateDiscountForm({
// //   discountCodes,
// //   children,
// // }: {
// //   discountCodes?: string[];
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <CartForm
// //       route="/cart"
// //       action={CartForm.ACTIONS.DiscountCodesUpdate}
// //       inputs={{
// //         discountCodes: discountCodes || [],
// //       }}
// //     >
// //       {children}
// //     </CartForm>
// //   );
// // }

// // function CartGiftCard({
// //   giftCardCodes,
// // }: {
// //   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
// // }) {
// //   const appliedGiftCardCodes = useRef<string[]>([]);
// //   const giftCardCodeInput = useRef<HTMLInputElement>(null);
// //   const codes: string[] =
// //     giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

// //   function saveAppliedCode(code: string) {
// //     const formattedCode = code.replace(/\s/g, ''); // Remove spaces
// //     if (!appliedGiftCardCodes.current.includes(formattedCode)) {
// //       appliedGiftCardCodes.current.push(formattedCode);
// //     }
// //     giftCardCodeInput.current!.value = '';
// //   }

// //   function removeAppliedCode() {
// //     appliedGiftCardCodes.current = [];
// //   }

// //   return (
// //     <div>
// //       {/* Have existing gift card applied, display it with a remove option */}
// //       <dl hidden={!codes.length}>
// //         <div>
// //           <dt>Applied Gift Card(s)</dt>
// //           <UpdateGiftCardForm>
// //             <div className="cart-discount">
// //               <code>{codes?.join(', ')}</code>
// //               &nbsp;
// //               <button onSubmit={() => removeAppliedCode}>Remove</button>
// //             </div>
// //           </UpdateGiftCardForm>
// //         </div>
// //       </dl>

// //       {/* Show an input to apply a discount */}
// //       <UpdateGiftCardForm
// //         giftCardCodes={appliedGiftCardCodes.current}
// //         saveAppliedCode={saveAppliedCode}
// //       >
// //         <div>
// //           <input
// //             type="text"
// //             name="giftCardCode"
// //             placeholder="Gift card code"
// //             ref={giftCardCodeInput}
// //           />
// //           &nbsp;
// //           <button type="submit">Apply</button>
// //         </div>
// //       </UpdateGiftCardForm>
// //     </div>
// //   );
// // }

// // function UpdateGiftCardForm({
// //   giftCardCodes,
// //   saveAppliedCode,
// //   children,
// // }: {
// //   giftCardCodes?: string[];
// //   saveAppliedCode?: (code: string) => void;
// //   removeAppliedCode?: () => void;
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <CartForm
// //       route="/cart"
// //       action={CartForm.ACTIONS.GiftCardCodesUpdate}
// //       inputs={{
// //         giftCardCodes: giftCardCodes || [],
// //       }}
// //     >
// //       {(fetcher: FetcherWithComponents<any>) => {
// //         const code = fetcher.formData?.get('giftCardCode');
// //         if (code && saveAppliedCode) {
// //           saveAppliedCode(code as string);
// //         }
// //         return children;
// //       }}
// //     </CartForm>
// //   );
// // }





// import type {CartApiQueryFragment} from 'storefrontapi.generated';
// import type {CartLayout} from '~/components/CartMain';
// import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
// import {useRef} from 'react';
// import {FetcherWithComponents} from '@remix-run/react';

// type CartSummaryProps = {
//   cart: OptimisticCart<CartApiQueryFragment | null>;
//   layout: CartLayout;
// };

// export function CartSummary({cart, layout}: CartSummaryProps) {
//   const className =
//     layout === 'page'
//       ? 'cart-summary-page p-6 bg-white'
//       : 'cart-summary-aside p-4 bg-gray-50';

//   return (
//     <div aria-labelledby="cart-summary " className={className}>
//       <h4 className="text-xl font-semibold text-gray-900 mb-4">Totals</h4>
//       <dl className="cart-subtotal space-y-2">
//         <div className="flex justify-between">
//           <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
//           <dd className="text-sm font-semibold text-gray-900">
//             {cart.cost?.subtotalAmount?.amount ? (
//               <Money data={cart.cost?.subtotalAmount} />
//             ) : (
//               '-'
//             )}
//           </dd>
//         </div>
//       </dl>
//       {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}
//       {/* <CartGiftCard giftCardCodes={cart.appliedGiftCards} /> */}
//       <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
//     </div>
//   );
// }

// function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
//   if (!checkoutUrl) return null;

//   return (
//     <div className="mt-6">
//       <a
//         href={checkoutUrl}
//         target="_self"
//         className="inline-block w-full text-center py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         Continue to Checkout →
//       </a>
//     </div>
//   );
// }

// function CartDiscounts({
//   discountCodes,
// }: {
//   discountCodes?: CartApiQueryFragment['discountCodes'];
// }) {
//   const codes: string[] =
//     discountCodes
//       ?.filter((discount) => discount.applicable)
//       ?.map(({code}) => code) || [];

//   return (
//     <div className="mt-4">
//       {/* Have existing discount, display it with a remove option */}
//       <dl hidden={!codes.length} className="space-y-2">
//         <div className="flex justify-between items-center">
//           <dt className="text-sm font-medium text-gray-700">Discount(s)</dt>
//           <UpdateDiscountForm>
//             <div className="cart-discount flex items-center space-x-2">
//               <code className="text-sm text-gray-600">{codes?.join(', ')}</code>
//               <button
//                 className="text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
//                 aria-label="Remove discount code"
//               >
//                 Remove
//               </button>
//             </div>
//           </UpdateDiscountForm>
//         </div>
//       </dl>

//       {/* Show an input to apply a discount */}
//       <UpdateDiscountForm discountCodes={codes}>
//         <div className="flex space-x-2 mt-2">
//           <input
//             type="text"
//             name="discountCode"
//             placeholder="Enter discount code"
//             className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Discount code input"
//           />
//           <button
//             type="submit"
//             className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Apply
//           </button>
//         </div>
//       </UpdateDiscountForm>
//     </div>
//   );
// }

// function UpdateDiscountForm({
//   discountCodes,
//   children,
// }: {
//   discountCodes?: string[];
//   children: React.ReactNode;
// }) {
//   return (
//     <CartForm
//       route="/cart"
//       action={CartForm.ACTIONS.DiscountCodesUpdate}
//       inputs={{
//         discountCodes: discountCodes || [],
//       }}
//     >
//       {children}
//     </CartForm>
//   );
// }

// function CartGiftCard({
//   giftCardCodes,
// }: {
//   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
// }) {
//   const appliedGiftCardCodes = useRef<string[]>([]);
//   const giftCardCodeInput = useRef<HTMLInputElement>(null);
//   const codes: string[] =
//     giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

//   function saveAppliedCode(code: string) {
//     const formattedCode = code.replace(/\s/g, ''); // Remove spaces
//     if (!appliedGiftCardCodes.current.includes(formattedCode)) {
//       appliedGiftCardCodes.current.push(formattedCode);
//     }
//     giftCardCodeInput.current!.value = '';
//   }

//   function removeAppliedCode() {
//     appliedGiftCardCodes.current = [];
//   }

//   return (
//     <div className="mt-4">
//       {/* Have existing gift card applied, display it with a remove option */}
//       <dl hidden={!codes.length} className="space-y-2">
//         <div className="flex justify-between items-center">
//           <dt className="text-sm font-medium text-gray-700">Applied Gift Card(s)</dt>
//           <UpdateGiftCardForm>
//             <div className="cart-discount flex items-center space-x-2">
//               <code className="text-sm text-gray-600">{codes?.join(', ')}</code>
//               <button
//                 onClick={removeAppliedCode}
//                 className="text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
//                 aria-label="Remove gift card"
//               >
//                 Remove
//               </button>
//             </div>
//           </UpdateGiftCardForm>
//         </div>
//       </dl>

//       {/* Show an input to apply a gift card */}
//       <UpdateGiftCardForm
//         giftCardCodes={appliedGiftCardCodes.current}
//         saveAppliedCode={saveAppliedCode}
//       >
//         <div className="flex space-x-2 mt-2">
//           <input
//             type="text"
//             name="giftCardCode"
//             placeholder="Enter gift card code"
//             ref={giftCardCodeInput}
//             className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Gift card code input"
//           />
//           <button
//             type="submit"
//             className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Apply
//           </button>
//         </div>
//       </UpdateGiftCardForm>
//     </div>
//   );
// }

// function UpdateGiftCardForm({
//   giftCardCodes,
//   saveAppliedCode,
//   children,
// }: {
//   giftCardCodes?: string[];
//   saveAppliedCode?: (code: string) => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <CartForm
//       route="/cart"
//       action={CartForm.ACTIONS.GiftCardCodesUpdate}
//       inputs={{
//         giftCardCodes: giftCardCodes || [],
//       }}
//     >
//       {(fetcher: FetcherWithComponents<any>) => {
//         const code = fetcher.formData?.get('giftCardCode');
//         if (code && saveAppliedCode) {
//           saveAppliedCode(code as string);
//         }
//         return children;
//       }}
//     </CartForm>
//   );
// }


// import type {CartApiQueryFragment} from 'storefrontapi.generated';
// import type {CartLayout} from '~/components/CartMain';
// import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
// import {useRef} from 'react';
// import {FetcherWithComponents} from '@remix-run/react';

// type CartSummaryProps = {
//   cart: OptimisticCart<CartApiQueryFragment | null>;
//   layout: CartLayout;
// };

// export function CartSummary({cart, layout}: CartSummaryProps) {
//   const baseClasses = layout === 'page' 
//     ? 'w-full p-6 bg-white' 
//     : 'fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 shadow-lg';

//   return (
//     <div aria-labelledby="cart-summary" className={baseClasses}>
//       <h4 className="text-xl font-semibold text-gray-900 mb-4">Totals</h4>
//       <dl className="space-y-2">
//         <div className="flex justify-between">
//           <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
//           <dd className="text-sm font-semibold text-gray-900">
//             {cart.cost?.subtotalAmount?.amount ? (
//               <Money data={cart.cost?.subtotalAmount} />
//             ) : (
//               '-'
//             )}
//           </dd>
//         </div>
//       </dl>
//       <CartDiscounts discountCodes={cart.discountCodes} />
//       <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
//       <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
//     </div>
//   );
// }

// function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
//   if (!checkoutUrl) return null;

//   return (
//     <div className="mt-6">
//       <a
//         href={checkoutUrl}
//         target="_self"
//         className="block w-full text-center py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         Continue to Checkout →
//       </a>
//     </div>
//   );
// }

// function CartDiscounts({
//   discountCodes,
// }: {
//   discountCodes?: CartApiQueryFragment['discountCodes'];
// }) {
//   const codes: string[] =
//     discountCodes
//       ?.filter((discount) => discount.applicable)
//       ?.map(({code}) => code) || [];

//   return (
//     <div className="mt-4">
//       <dl hidden={!codes.length} className="space-y-2">
//         <div className="flex justify-between items-center">
//           <dt className="text-sm font-medium text-gray-700">Discount(s)</dt>
//           <UpdateDiscountForm>
//             <div className="flex items-center space-x-2">
//               <code className="text-sm text-gray-600">{codes?.join(', ')}</code>
//               <button
//                 className="text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
//                 aria-label="Remove discount code"
//               >
//                 Remove
//               </button>
//             </div>
//           </UpdateDiscountForm>
//         </div>
//       </dl>

//       <UpdateDiscountForm discountCodes={codes}>
//         <div className="flex space-x-2 mt-2">
//           <input
//             type="text"
//             name="discountCode"
//             placeholder="Enter discount code"
//             className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Discount code input"
//           />
//           <button
//             type="submit"
//             className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Apply
//           </button>
//         </div>
//       </UpdateDiscountForm>
//     </div>
//   );
// }

// function UpdateDiscountForm({
//   discountCodes,
//   children,
// }: {
//   discountCodes?: string[];
//   children: React.ReactNode;
// }) {
//   return (
//     <CartForm
//       route="/cart"
//       action={CartForm.ACTIONS.DiscountCodesUpdate}
//       inputs={{
//         discountCodes: discountCodes || [],
//       }}
//     >
//       {children}
//     </CartForm>
//   );
// }

// function CartGiftCard({
//   giftCardCodes,
// }: {
//   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
// }) {
//   const appliedGiftCardCodes = useRef<string[]>([]);
//   const giftCardCodeInput = useRef<HTMLInputElement>(null);
//   const codes: string[] =
//     giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

//   function saveAppliedCode(code: string) {
//     const formattedCode = code.replace(/\s/g, '');
//     if (!appliedGiftCardCodes.current.includes(formattedCode)) {
//       appliedGiftCardCodes.current.push(formattedCode);
//     }
//     giftCardCodeInput.current!.value = '';
//   }

//   function removeAppliedCode() {
//     appliedGiftCardCodes.current = [];
//   }

//   return (
//     <div className="mt-4">
//       <dl hidden={!codes.length} className="space-y-2">
//         <div className="flex justify-between items-center">
//           <dt className="text-sm font-medium text-gray-700">Applied Gift Card(s)</dt>
//           <UpdateGiftCardForm>
//             <div className="flex items-center space-x-2">
//               <code className="text-sm text-gray-600">{codes?.join(', ')}</code>
//               <button
//                 onClick={removeAppliedCode}
//                 className="text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
//                 aria-label="Remove gift card"
//               >
//                 Remove
//               </button>
//             </div>
//           </UpdateGiftCardForm>
//         </div>
//       </dl>
// {/* 
//       <UpdateGiftCardForm
//         giftCardCodes={appliedGiftCardCodes.current}
//         saveAppliedCode={saveAppliedCode}
//       >
//         <div className="flex space-x-2 mt-2">
//           <input
//             type="text"
//             name="giftCardCode"
//             placeholder="Enter gift card code"
//             ref={giftCardCodeInput}
//             className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Gift card code input"
//           />
//           <button
//             type="submit"
//             className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Apply
//           </button>
//         </div>
//       </UpdateGiftCardForm> */}
//     </div>
//   );
// }

// function UpdateGiftCardForm({
//   giftCardCodes,
//   saveAppliedCode,
//   children,
// }: {
//   giftCardCodes?: string[];
//   saveAppliedCode?: (code: string) => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <CartForm
//       route="/cart"
//       action={CartForm.ACTIONS.GiftCardCodesUpdate}
//       inputs={{
//         giftCardCodes: giftCardCodes || [],
//       }}
//     >
//       {(fetcher: FetcherWithComponents<any>) => {
//         const code = fetcher.formData?.get('giftCardCode');
//         if (code && saveAppliedCode) {
//           saveAppliedCode(code as string);
//         }
//         return children;
//       }}
//     </CartForm>
//   );
// }




import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useRef, useState} from 'react';
import {FetcherWithComponents} from '@remix-run/react';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const baseClasses = layout === 'page' 
    ? 'w-full p-6 bg-white' 
    : 'fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 shadow-lg';

  return (
    <div aria-labelledby="cart-summary" className={baseClasses}>
      <h4 className="text-xl font-semibold text-gray-900 mb-4">Totals</h4>
      <dl className="space-y-2">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
          <dd className="text-sm font-semibold text-gray-900">
            {cart.cost?.subtotalAmount?.amount ? (
              <Money data={cart.cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
      </dl>
      <CartDiscounts discountCodes={cart.discountCodes} />
      <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
      <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!checkoutUrl) return null;

  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 2000); // 2-second delay for the loader
  };

  return (
    <div className="mt-6">
      <a
        href={checkoutUrl}
        target="_self"
        onClick={handleCheckout}
        className={`block w-full text-center py-3 px-4 rounded-md font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
        }`}
        aria-disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <span className="loader mr-2 h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          </span>
        ) : (
          'Continue to Checkout →'
        )}
      </a>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="mt-4">
      <dl hidden={!codes.length} className="space-y-2">
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-700">Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="flex items-center space-x-2">
              <code className="text-sm text-gray-600">{codes?.join(', ')}</code>
              <button
                className="text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
                aria-label="Remove discount code"
              >
                Remove
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            name="discountCode"
            placeholder="Enter discount code"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Discount code input"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const codes: string[] =
    giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, '');
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    giftCardCodeInput.current!.value = '';
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  return (
    <div className="mt-4">
      <dl hidden={!codes.length} className="space-y-2">
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-700">Applied Gift Card(s)</dt>
          <UpdateGiftCardForm>
            <div className="flex items-center space-x-2">
              <code className="text-sm text-gray-600">{codes?.join(', ')}</code>
              <button
                onClick={removeAppliedCode}
                className="text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
                aria-label="Remove gift card"
              >
                Remove
              </button>
            </div>
          </UpdateGiftCardForm>
        </div>
      </dl>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}