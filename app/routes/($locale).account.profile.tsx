// import type {CustomerFragment} from 'customer-accountapi.generated';
// import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
// import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
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
// } from '@remix-run/react';

// export type ActionResponse = {
//   error: string | null;
//   customer: CustomerFragment | null;
// };

// export const meta: MetaFunction = () => {
//   return [{title: 'Profile'}];
// };

// export async function loader({context}: LoaderFunctionArgs) {
//   await context.customerAccount.handleAuthStatus();

//   return {};
// }

// export async function action({request, context}: ActionFunctionArgs) {
//   const {customerAccount} = context;

//   if (request.method !== 'PUT') {
//     return data({error: 'Method not allowed'}, {status: 405});
//   }

//   const form = await request.formData();

//   try {
//     const customer: CustomerUpdateInput = {};
//     const validInputKeys = ['firstName', 'lastName'] as const;
//     for (const [key, value] of form.entries()) {
//       if (!validInputKeys.includes(key as any)) {
//         continue;
//       }
//       if (typeof value === 'string' && value.length) {
//         customer[key as (typeof validInputKeys)[number]] = value;
//       }
//     }

//     // update customer and possibly password
//     const {data, errors} = await customerAccount.mutate(
//       CUSTOMER_UPDATE_MUTATION,
//       {
//         variables: {
//           customer,
//         },
//       },
//     );

//     if (errors?.length) {
//       throw new Error(errors[0].message);
//     }

//     if (!data?.customerUpdate?.customer) {
//       throw new Error('Customer profile update failed.');
//     }

//     return {
//       error: null,
//       customer: data?.customerUpdate?.customer,
//     };
//   } catch (error: any) {
//     return data(
//       {error: error.message, customer: null},
//       {
//         status: 400,
//       },
//     );
//   }
// }

// export default function AccountProfile() {
//   const account = useOutletContext<{customer: CustomerFragment}>();
//   const {state} = useNavigation();
//   const action = useActionData<ActionResponse>();
//   const customer = action?.customer ?? account?.customer;

//   return (
//     <div className="account-profile">
//       <h2>My profile</h2>
//       <br />
//       <Form method="PUT">
//         <legend>Personal information</legend>
//         <fieldset>
//           <label htmlFor="firstName">First name</label>
//           <input
//             id="firstName"
//             name="firstName"
//             type="text"
//             autoComplete="given-name"
//             placeholder="First name"
//             aria-label="First name"
//             defaultValue={customer.firstName ?? ''}
//             minLength={2}
//           />
//           <label htmlFor="lastName">Last name</label>
//           <input
//             id="lastName"
//             name="lastName"
//             type="text"
//             autoComplete="family-name"
//             placeholder="Last name"
//             aria-label="Last name"
//             defaultValue={customer.lastName ?? ''}
//             minLength={2}
//           />
//         </fieldset>
//         {action?.error ? (
//           <p>
//             <mark>
//               <small>{action.error}</small>
//             </mark>
//           </p>
//         ) : (
//           <br />
//         )}
//         <button type="submit" disabled={state !== 'idle'}>
//           {state !== 'idle' ? 'Updating' : 'Update'}
//         </button>
//       </Form>
//     </div>
//   );
// }



import type { CustomerFragment } from 'customer-accountapi.generated';
import type { CustomerUpdateInput } from '@shopify/hydrogen/customer-account-api-types';
import { CUSTOMER_UPDATE_MUTATION } from '~/graphql/customer-account/CustomerUpdateMutation';
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
} from '@remix-run/react';
import { FaUser, FaSave, FaExclamationCircle } from 'react-icons/fa';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: MetaFunction = () => {
  return [{ title: 'Profile' }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();
  return {};
}

export async function action({ request, context }: ActionFunctionArgs) {
  const { customerAccount } = context;

  if (request.method !== 'PUT') {
    return data({ error: 'Method not allowed' }, { status: 405 });
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    const { data: mutationData, errors } = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!mutationData?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: mutationData?.customerUpdate?.customer,
    };
  } catch (error: any) {
    return data(
      { error: error.message, customer: null },
      {
        status: 400,
      },
    );
  }
}

interface OutletContext {
  customer: CustomerFragment;
}

export default function AccountProfile() {
  const { customer } = useOutletContext<OutletContext>();
  const { state } = useNavigation();
  const action = useActionData<ActionResponse>();
  const activeCustomer = action?.customer ?? customer;

  return (
    <div className="account-profile p-6 md:p-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaUser className="mr-3 text-blue-600 text-2xl" />
          My Profile
        </h2>
        <Form method="PUT" className="space-y-6">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <legend className="text-xl font-semibold text-gray-800 mb-4 col-span-full">
              Personal Information
            </legend>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Enter your first name"
                aria-label="First name"
                defaultValue={activeCustomer.firstName ?? ''}
                minLength={2}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-base"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Enter your last name"
                aria-label="Last name"
                defaultValue={activeCustomer.lastName ?? ''}
                minLength={2}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-base"
              />
            </div>
          </fieldset>
          {action?.error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md flex items-center">
              <FaExclamationCircle className="mr-2 text-lg" />
              <p className="text-sm font-medium">{action.error}</p>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={state !== 'idle'}
              className={`flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors text-base ${
                state !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaSave className="mr-2" />
              {state !== 'idle' ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
