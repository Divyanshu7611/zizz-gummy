import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useRef, useState} from 'react';
import {FetcherWithComponents} from '@remix-run/react';
import { FaCheck } from "react-icons/fa6";
import { FiGift } from "react-icons/fi";

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const [showGiftCardInput, setShowGiftCardInput] = useState(false);
  const baseClasses = layout === 'page' 
    ? 'w-full p-3 bg-white'
    : 'fixed bottom-0 left-0 w-full px-3 py-2 pb-16 md:pb-4 bg-white border-t border-gray-200 shadow-lg z-10 sm:px-4 sm:py-3';

  return (
    <div aria-labelledby="cart-summary" className={`${baseClasses} max-h-[calc(100vh-4rem)] overflow-y-auto sm:overflow-visible`}>
      <dl className="space-y-1">
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
      {showGiftCardInput ? (
        <GiftCardInput giftCardCodes={cart.appliedGiftCards} />
      ) : (
        <CartDiscounts discountCodes={cart.discountCodes} />
      )}
      <div className="flex justify-between items-center mt-2">
        <button
          type="button"
          onClick={() => setShowGiftCardInput(!showGiftCardInput)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-150"
        >
          <FiGift className="mr-1 h-4 w-4" />
          {showGiftCardInput ? 'Apply Discount' : 'Apply Gift Card'}
        </button>
        <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
      </div>
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
    <div>
      <a
        href={checkoutUrl}
        target="_self"
        onClick={handleCheckout}
        className={`block w-full text-center py-2 px-3 rounded-md font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
        }`}
        aria-disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <span className="loader mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          </span>
        ) : (
          'Checkout'
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
    <div className="mt-2">
      <dl hidden={!codes.length} className="space-y-1">
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-700">Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="flex items-center space-x-2">
              <code className="text-xs text-gray-600">{codes?.join(', ')}</code>
              <button
                className="text-xs text-red-600 hover:text-red-800 transition-colors duration-150"
                aria-label="Remove discount code"
              >
                Remove
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      <UpdateDiscountForm discountCodes={codes} key="discount-form">
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Discount code input"
          />
          <button
            type="submit"
            className="py-1.5 px-3 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaCheck className="h-4 w-4" />
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
      key="discount-cart-form"
    >
      {children}
    </CartForm>
  );
}

function GiftCardInput({
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
    <div className="mt-2">
      <dl hidden={!codes.length} className="space-y-1">
        <div className="flex justify-between items-center">
          <dt className="text-sm font-medium text-gray-700">Gift Card(s)</dt>
          <UpdateGiftCardForm>
            <div className="flex items-center space-x-2">
              <code className="text-xs text-gray-600">{codes?.join(', ')}</code>
              <button
                onClick={removeAppliedCode}
                className="text-xs text-red-600 hover:text-red-800 transition-colors duration-150"
                aria-label="Remove gift card"
              >
                Remove
              </button>
            </div>
          </UpdateGiftCardForm>
        </div>
      </dl>
      <UpdateGiftCardForm saveAppliedCode={saveAppliedCode} key="gift-card-form">
        <div className="flex space-x-2 mt-1">
          <input
            ref={giftCardCodeInput}
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            className="flex-1 p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Gift card code input"
          />
          <button
            type="submit"
            className="py-1.5 px-3 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaCheck className="h-4 w-4" />
          </button>
        </div>
      </UpdateGiftCardForm>
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
      key="gift-card-cart-form"
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