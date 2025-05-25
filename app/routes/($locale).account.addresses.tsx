// import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
// import type {
//   AddressFragment,
//   CustomerFragment,
// } from 'customer-accountapi.generated';
// import {
//   data,
//   type ActionFunctionArgs,
//   type LoaderFunctionArgs,
// } from '@shopify/remix-oxygen';
// import {
//   Form,
//   useActionData,
//   useNavigation,
//   useOutletContext,
//   type MetaFunction,
//   type Fetcher,
// } from '@remix-run/react';
// import {
//   UPDATE_ADDRESS_MUTATION,
//   DELETE_ADDRESS_MUTATION,
//   CREATE_ADDRESS_MUTATION,
// } from '~/graphql/customer-account/CustomerAddressMutations';

// export type ActionResponse = {
//   addressId?: string | null;
//   createdAddress?: AddressFragment;
//   defaultAddress?: string | null;
//   deletedAddress?: string | null;
//   error: Record<AddressFragment['id'], string> | null;
//   updatedAddress?: AddressFragment;
// };

// export const meta: MetaFunction = () => {
//   return [{title: 'Addresses'}];
// };

// export async function loader({context}: LoaderFunctionArgs) {
//   await context.customerAccount.handleAuthStatus();

//   return {};
// }

// export async function action({request, context}: ActionFunctionArgs) {
//   const {customerAccount} = context;

//   try {
//     const form = await request.formData();

//     const addressId = form.has('addressId')
//       ? String(form.get('addressId'))
//       : null;
//     if (!addressId) {
//       throw new Error('You must provide an address id.');
//     }

//     // this will ensure redirecting to login never happen for mutatation
//     const isLoggedIn = await customerAccount.isLoggedIn();
//     if (!isLoggedIn) {
//       return data(
//         {error: {[addressId]: 'Unauthorized'}},
//         {
//           status: 401,
//         },
//       );
//     }

//     const defaultAddress = form.has('defaultAddress')
//       ? String(form.get('defaultAddress')) === 'on'
//       : false;
//     const address: CustomerAddressInput = {};
//     const keys: (keyof CustomerAddressInput)[] = [
//       'address1',
//       'address2',
//       'city',
//       'company',
//       'territoryCode',
//       'firstName',
//       'lastName',
//       'phoneNumber',
//       'zoneCode',
//       'zip',
//     ];

//     for (const key of keys) {
//       const value = form.get(key);
//       if (typeof value === 'string') {
//         address[key] = value;
//       }
//     }

//     switch (request.method) {
//       case 'POST': {
//         // handle new address creation
//         try {
//           const {data, errors} = await customerAccount.mutate(
//             CREATE_ADDRESS_MUTATION,
//             {
//               variables: {address, defaultAddress},
//             },
//           );

//           if (errors?.length) {
//             throw new Error(errors[0].message);
//           }

//           if (data?.customerAddressCreate?.userErrors?.length) {
//             throw new Error(data?.customerAddressCreate?.userErrors[0].message);
//           }

//           if (!data?.customerAddressCreate?.customerAddress) {
//             throw new Error('Customer address create failed.');
//           }

//           return {
//             error: null,
//             createdAddress: data?.customerAddressCreate?.customerAddress,
//             defaultAddress,
//           };
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             return data(
//               {error: {[addressId]: error.message}},
//               {
//                 status: 400,
//               },
//             );
//           }
//           return data(
//             {error: {[addressId]: error}},
//             {
//               status: 400,
//             },
//           );
//         }
//       }

//       case 'PUT': {
//         // handle address updates
//         try {
//           const {data, errors} = await customerAccount.mutate(
//             UPDATE_ADDRESS_MUTATION,
//             {
//               variables: {
//                 address,
//                 addressId: decodeURIComponent(addressId),
//                 defaultAddress,
//               },
//             },
//           );

//           if (errors?.length) {
//             throw new Error(errors[0].message);
//           }

//           if (data?.customerAddressUpdate?.userErrors?.length) {
//             throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
//           }

//           if (!data?.customerAddressUpdate?.customerAddress) {
//             throw new Error('Customer address update failed.');
//           }

//           return {
//             error: null,
//             updatedAddress: address,
//             defaultAddress,
//           };
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             return data(
//               {error: {[addressId]: error.message}},
//               {
//                 status: 400,
//               },
//             );
//           }
//           return data(
//             {error: {[addressId]: error}},
//             {
//               status: 400,
//             },
//           );
//         }
//       }

//       case 'DELETE': {
//         // handles address deletion
//         try {
//           const {data, errors} = await customerAccount.mutate(
//             DELETE_ADDRESS_MUTATION,
//             {
//               variables: {addressId: decodeURIComponent(addressId)},
//             },
//           );

//           if (errors?.length) {
//             throw new Error(errors[0].message);
//           }

//           if (data?.customerAddressDelete?.userErrors?.length) {
//             throw new Error(data?.customerAddressDelete?.userErrors[0].message);
//           }

//           if (!data?.customerAddressDelete?.deletedAddressId) {
//             throw new Error('Customer address delete failed.');
//           }

//           return {error: null, deletedAddress: addressId};
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             return data(
//               {error: {[addressId]: error.message}},
//               {
//                 status: 400,
//               },
//             );
//           }
//           return data(
//             {error: {[addressId]: error}},
//             {
//               status: 400,
//             },
//           );
//         }
//       }

//       default: {
//         return data(
//           {error: {[addressId]: 'Method not allowed'}},
//           {
//             status: 405,
//           },
//         );
//       }
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return data(
//         {error: error.message},
//         {
//           status: 400,
//         },
//       );
//     }
//     return data(
//       {error},
//       {
//         status: 400,
//       },
//     );
//   }
// }

// export default function Addresses() {
//   const {customer} = useOutletContext<{customer: CustomerFragment}>();
//   const {defaultAddress, addresses} = customer;

//   return (
//     <div className="account-addresses">
//       <h2>Addresses</h2>
//       <br />
//       {!addresses.nodes.length ? (
//         <p>You have no addresses saved.</p>
//       ) : (
//         <div>
//           <div>
//             <legend>Create address</legend>
//             <NewAddressForm />
//           </div>
//           <br />
//           <hr />
//           <br />
//           <ExistingAddresses
//             addresses={addresses}
//             defaultAddress={defaultAddress}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// function NewAddressForm() {
//   const newAddress = {
//     address1: '',
//     address2: '',
//     city: '',
//     company: '',
//     territoryCode: '',
//     firstName: '',
//     id: 'new',
//     lastName: '',
//     phoneNumber: '',
//     zoneCode: '',
//     zip: '',
//   } as CustomerAddressInput;

//   return (
//     <AddressForm
//       addressId={'NEW_ADDRESS_ID'}
//       address={newAddress}
//       defaultAddress={null}
//     >
//       {({stateForMethod}) => (
//         <div>
//           <button
//             disabled={stateForMethod('POST') !== 'idle'}
//             formMethod="POST"
//             type="submit"
//           >
//             {stateForMethod('POST') !== 'idle' ? 'Creating' : 'Create'}
//           </button>
//         </div>
//       )}
//     </AddressForm>
//   );
// }

// function ExistingAddresses({
//   addresses,
//   defaultAddress,
// }: Pick<CustomerFragment, 'addresses' | 'defaultAddress'>) {
//   return (
//     <div>
//       <legend>Existing addresses</legend>
//       {addresses.nodes.map((address) => (
//         <AddressForm
//           key={address.id}
//           addressId={address.id}
//           address={address}
//           defaultAddress={defaultAddress}
//         >
//           {({stateForMethod}) => (
//             <div>
//               <button
//                 disabled={stateForMethod('PUT') !== 'idle'}
//                 formMethod="PUT"
//                 type="submit"
//               >
//                 {stateForMethod('PUT') !== 'idle' ? 'Saving' : 'Save'}
//               </button>
//               <button
//                 disabled={stateForMethod('DELETE') !== 'idle'}
//                 formMethod="DELETE"
//                 type="submit"
//               >
//                 {stateForMethod('DELETE') !== 'idle' ? 'Deleting' : 'Delete'}
//               </button>
//             </div>
//           )}
//         </AddressForm>
//       ))}
//     </div>
//   );
// }

// export function AddressForm({
//   addressId,
//   address,
//   defaultAddress,
//   children,
// }: {
//   addressId: AddressFragment['id'];
//   address: CustomerAddressInput;
//   defaultAddress: CustomerFragment['defaultAddress'];
//   children: (props: {
//     stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
//   }) => React.ReactNode;
// }) {
//   const {state, formMethod} = useNavigation();
//   const action = useActionData<ActionResponse>();
//   const error = action?.error?.[addressId];
//   const isDefaultAddress = defaultAddress?.id === addressId;
//   return (
//     <Form id={addressId}>
//       <fieldset>
//         <input type="hidden" name="addressId" defaultValue={addressId} />
//         <label htmlFor="firstName">First name*</label>
//         <input
//           aria-label="First name"
//           autoComplete="given-name"
//           defaultValue={address?.firstName ?? ''}
//           id="firstName"
//           name="firstName"
//           placeholder="First name"
//           required
//           type="text"
//         />
//         <label htmlFor="lastName">Last name*</label>
//         <input
//           aria-label="Last name"
//           autoComplete="family-name"
//           defaultValue={address?.lastName ?? ''}
//           id="lastName"
//           name="lastName"
//           placeholder="Last name"
//           required
//           type="text"
//         />
//         <label htmlFor="company">Company</label>
//         <input
//           aria-label="Company"
//           autoComplete="organization"
//           defaultValue={address?.company ?? ''}
//           id="company"
//           name="company"
//           placeholder="Company"
//           type="text"
//         />
//         <label htmlFor="address1">Address line*</label>
//         <input
//           aria-label="Address line 1"
//           autoComplete="address-line1"
//           defaultValue={address?.address1 ?? ''}
//           id="address1"
//           name="address1"
//           placeholder="Address line 1*"
//           required
//           type="text"
//         />
//         <label htmlFor="address2">Address line 2</label>
//         <input
//           aria-label="Address line 2"
//           autoComplete="address-line2"
//           defaultValue={address?.address2 ?? ''}
//           id="address2"
//           name="address2"
//           placeholder="Address line 2"
//           type="text"
//         />
//         <label htmlFor="city">City*</label>
//         <input
//           aria-label="City"
//           autoComplete="address-level2"
//           defaultValue={address?.city ?? ''}
//           id="city"
//           name="city"
//           placeholder="City"
//           required
//           type="text"
//         />
//         <label htmlFor="zoneCode">State / Province*</label>
//         <input
//           aria-label="State/Province"
//           autoComplete="address-level1"
//           defaultValue={address?.zoneCode ?? ''}
//           id="zoneCode"
//           name="zoneCode"
//           placeholder="State / Province"
//           required
//           type="text"
//         />
//         <label htmlFor="zip">Zip / Postal Code*</label>
//         <input
//           aria-label="Zip"
//           autoComplete="postal-code"
//           defaultValue={address?.zip ?? ''}
//           id="zip"
//           name="zip"
//           placeholder="Zip / Postal Code"
//           required
//           type="text"
//         />
//         <label htmlFor="territoryCode">Country Code*</label>
//         <input
//           aria-label="territoryCode"
//           autoComplete="country"
//           defaultValue={address?.territoryCode ?? ''}
//           id="territoryCode"
//           name="territoryCode"
//           placeholder="Country"
//           required
//           type="text"
//           maxLength={2}
//         />
//         <label htmlFor="phoneNumber">Phone</label>
//         <input
//           aria-label="Phone Number"
//           autoComplete="tel"
//           defaultValue={address?.phoneNumber ?? ''}
//           id="phoneNumber"
//           name="phoneNumber"
//           placeholder="+16135551111"
//           pattern="^\+?[1-9]\d{3,14}$"
//           type="tel"
//         />
//         <div>
//           <input
//             defaultChecked={isDefaultAddress}
//             id="defaultAddress"
//             name="defaultAddress"
//             type="checkbox"
//           />
//           <label htmlFor="defaultAddress">Set as default address</label>
//         </div>
//         {error ? (
//           <p>
//             <mark>
//               <small>{error}</small>
//             </mark>
//           </p>
//         ) : (
//           <br />
//         )}
//         {children({
//           stateForMethod: (method) => (formMethod === method ? state : 'idle'),
//         })}
//       </fieldset>
//     </Form>
//   );
// }




import type { CustomerAddressInput } from '@shopify/hydrogen/customer-account-api-types';
import type { AddressFragment, CustomerFragment } from 'customer-accountapi.generated';
import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type MetaFunction,
  type Fetcher,
} from '@remix-run/react';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';
import { FaMapMarkerAlt, FaPlus, FaSave, FaTrash, FaExclamationCircle } from 'react-icons/fa';
import { useState } from 'react';

export type ActionResponse = {
  addressId?: string | null;
  createdAddress?: AddressFragment;
  defaultAddress?: string | null;
  deletedAddress?: string | null;
  error: Record<AddressFragment['id'], string> | null;
  updatedAddress?: AddressFragment;
};

export const meta: MetaFunction = () => {
  return [{ title: 'Your Addresses' }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();
  return {};
}

export async function action({ request, context }: ActionFunctionArgs) {
  const { customerAccount } = context;

  try {
    const form = await request.formData();
    const addressId = form.has('addressId') ? String(form.get('addressId')) : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data({ error: { [addressId]: 'Unauthorized' } }, { status: 401 });
    }

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address: CustomerAddressInput = {};
    const keys: (keyof CustomerAddressInput)[] = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        try {
          const { data, errors } = await customerAccount.mutate(CREATE_ADDRESS_MUTATION, {
            variables: { address, defaultAddress },
          });

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressCreate?.userErrors?.length) {
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          }

          if (!data?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data({ error: { [addressId]: error.message } }, { status: 400 });
          }
          return data({ error: { [addressId]: error } }, { status: 400 });
        }
      }

      case 'PUT': {
        try {
          const { data, errors } = await customerAccount.mutate(UPDATE_ADDRESS_MUTATION, {
            variables: {
              address,
              addressId: decodeURIComponent(addressId),
              defaultAddress,
            },
          });

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: data?.customerAddressUpdate?.customerAddress,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data({ error: { [addressId]: error.message } }, { status: 400 });
          }
          return data({ error: { [addressId]: error } }, { status: 400 });
        }
      }

      case 'DELETE': {
        try {
          const { data, errors } = await customerAccount.mutate(DELETE_ADDRESS_MUTATION, {
            variables: { addressId: decodeURIComponent(addressId) },
          });

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressDelete?.userErrors?.length) {
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          }

          if (!data?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return { error: null, deletedAddress: addressId };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data({ error: { [addressId]: error.message } }, { status: 400 });
          }
          return data({ error: { [addressId]: error } }, { status: 400 });
        }
      }

      default: {
        return data({ error: { [addressId]: 'Method not allowed' } }, { status: 405 });
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return data({ error: error.message }, { status: 400 });
    }
    return data({ error }, { status: 400 });
  }
}

interface OutletContext {
  customer: CustomerFragment;
}

export default function Addresses() {
  const { customer } = useOutletContext<OutletContext>();
  const { defaultAddress, addresses } = customer;
  const [isNewAddressFormOpen, setIsNewAddressFormOpen] = useState(false);

  return (
    <div className="account-addresses">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <FaMapMarkerAlt className="mr-3 text-blue-600 text-2xl" />
        Your Addresses
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-6">
        {!addresses.nodes.length ? (
          <div className="text-center py-12">
            <FaMapMarkerAlt className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4 text-lg">
              You haven't saved any addresses yet.
            </p>
            <button
              onClick={() => setIsNewAddressFormOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add New Address
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Add New Address</h3>
                <button
                  onClick={() => setIsNewAddressFormOpen(!isNewAddressFormOpen)}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  {isNewAddressFormOpen ? 'Cancel' : 'Add Address'}
                </button>
              </div>
              {isNewAddressFormOpen && (
                <NewAddressForm onClose={() => setIsNewAddressFormOpen(false)} />
              )}
            </div>
            <hr className="border-gray-200" />
            <ExistingAddresses addresses={addresses} defaultAddress={defaultAddress} />
          </div>
        )}
      </div>
    </div>
  );
}

interface NewAddressFormProps {
  onClose: () => void;
}

function NewAddressForm({ onClose }: NewAddressFormProps) {
  const newAddress: CustomerAddressInput = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    territoryCode: '',
    firstName: '',
    id: 'new',
    lastName: '',
    phoneNumber: '',
    zoneCode: '',
    zip: '',
  };

  return (
    <AddressForm addressId={'NEW_ADDRESS_ID'} address={newAddress} defaultAddress={null}>
      {({ stateForMethod }) => (
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
            className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
              stateForMethod('POST') !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaSave className="mr-2" />
            {stateForMethod('POST') !== 'idle' ? 'Creating...' : 'Create Address'}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

interface ExistingAddressesProps {
  addresses: CustomerFragment['addresses'];
  defaultAddress: CustomerFragment['defaultAddress'];
}

function ExistingAddresses({ addresses, defaultAddress }: ExistingAddressesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Existing Addresses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.nodes.map((address) => (
          <AddressForm
            key={address.id}
            addressId={address.id}
            address={address}
            defaultAddress={defaultAddress}
          >
            {({ stateForMethod }) => (
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  disabled={stateForMethod('PUT') !== 'idle'}
                  formMethod="PUT"
                  type="submit"
                  className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    stateForMethod('PUT') !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaSave className="mr-2" />
                  {stateForMethod('PUT') !== 'idle' ? 'Saving...' : 'Save'}
                </button>
                <button
                  disabled={stateForMethod('DELETE') !== 'idle'}
                  formMethod="DELETE"
                  type="submit"
                  className={`flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${
                    stateForMethod('DELETE') !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaTrash className="mr-2" />
                  {stateForMethod('DELETE') !== 'idle' ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </AddressForm>
        ))}
      </div>
    </div>
  );
}

interface AddressFormProps {
  addressId: AddressFragment['id'];
  address: CustomerAddressInput;
  defaultAddress: CustomerFragment['defaultAddress'];
  children: (props: {
    stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
  }) => React.ReactNode;
}

export function AddressForm({
  addressId,
  address,
  defaultAddress,
  children,
}: AddressFormProps) {
  const { state, formMethod } = useNavigation();
  const action = useActionData<ActionResponse>();
  const error = action?.error?.[addressId];
  const isDefaultAddress = defaultAddress?.id === addressId;

  return (
    <Form id={addressId} className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="hidden" name="addressId" defaultValue={addressId} />
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            aria-label="First name"
            autoComplete="given-name"
            defaultValue={address?.firstName ?? ''}
            id="firstName"
            name="firstName"
            placeholder="First name"
            required
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            aria-label="Last name"
            autoComplete="family-name"
            defaultValue={address?.lastName ?? ''}
            id="lastName"
            name="lastName"
            placeholder="Last name"
            required
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            aria-label="Company"
            autoComplete="organization"
            defaultValue={address?.company ?? ''}
            id="company"
            name="company"
            placeholder="Company (optional)"
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            aria-label="Phone Number"
            autoComplete="tel"
            defaultValue={address?.phoneNumber ?? ''}
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+16135551111"
            pattern="^\+?[1-9]\d{3,14}$"
            type="tel"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 *
          </label>
          <input
            aria-label="Address line 1"
            autoComplete="address-line1"
            defaultValue={address?.address1 ?? ''}
            id="address1"
            name="address1"
            placeholder="Address line 1"
            required
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            aria-label="Address line 2"
            autoComplete="address-line2"
            defaultValue={address?.address2 ?? ''}
            id="address2"
            name="address2"
            placeholder="Address line 2 (optional)"
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            aria-label="City"
            autoComplete="address-level2"
            defaultValue={address?.city ?? ''}
            id="city"
            name="city"
            placeholder="City"
            required
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="zoneCode" className="block text-sm font-medium text-gray-700 mb-1">
            State / Province *
          </label>
          <input
            aria-label="State/Province"
            autoComplete="address-level1"
            defaultValue={address?.zoneCode ?? ''}
            id="zoneCode"
            name="zoneCode"
            placeholder="State / Province"
            required
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
            Zip / Postal Code *
          </label>
          <input
            aria-label="Zip"
            autoComplete="postal-code"
            defaultValue={address?.zip ?? ''}
            id="zip"
            name="zip"
            placeholder="Zip / Postal Code"
            required
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="territoryCode" className="block text-sm font-medium text-gray-700 mb-1">
            Country Code *
          </label>
          <input
            aria-label="Country Code"
            autoComplete="country"
            defaultValue={address?.territoryCode ?? ''}
            id="territoryCode"
            name="territoryCode"
            placeholder="e.g., US, CA"
            required
            type="text"
            maxLength={2}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2 flex items-center">
          <input
            defaultChecked={isDefaultAddress}
            id="defaultAddress"
            name="defaultAddress"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
            Set as default address
          </label>
        </div>
        {error && (
          <div className="md:col-span-2 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
            <FaExclamationCircle className="mr-2 text-lg" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </fieldset>
      {children({
        stateForMethod: (method) => (formMethod === method ? state : 'idle'),
      })}
    </Form>
  );
}