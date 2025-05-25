// import {
//   data as remixData,
//   type LoaderFunctionArgs,
// } from '@shopify/remix-oxygen';
// import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
// import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

// export function shouldRevalidate() {
//   return true;
// }

// export async function loader({context}: LoaderFunctionArgs) {
//   const {data, errors} = await context.customerAccount.query(
//     CUSTOMER_DETAILS_QUERY,
//   );

//   if (errors?.length || !data?.customer) {
//     throw new Error('Customer not found');
//   }

//   return remixData(
//     {customer: data.customer},
//     {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//       },
//     },
//   );
// }

// export default function AccountLayout() {
//   const {customer} = useLoaderData<typeof loader>();

//   const heading = customer
//     ? customer.firstName
//       ? `Welcome BHAI, ${customer.firstName}`
//       : `Welcome to your account. BHAI`
//     : 'Account Details';

//   return (
//     <div className="account">
//       <h1>{heading}</h1>
//       <br />
//       <AccountMenu />
//       <br />
//       <br />
//       <Outlet context={{customer}} />
//     </div>
//   );
// }

// function AccountMenu() {
//   function isActiveStyle({
//     isActive,
//     isPending,
//   }: {
//     isActive: boolean;
//     isPending: boolean;
//   }) {
//     return {
//       fontWeight: isActive ? 'bold' : undefined,
//       color: isPending ? 'grey' : 'black',
//     };
//   }

//   return (
//     <nav role="navigation">
//       <NavLink to="/account/orders" style={isActiveStyle}>
//         Orders &nbsp;
//       </NavLink>
//       &nbsp;|&nbsp;
//       <NavLink to="/account/profile" style={isActiveStyle}>
//         &nbsp; Profile &nbsp;
//       </NavLink>
//       &nbsp;|&nbsp;
//       <NavLink to="/account/addresses" style={isActiveStyle}>
//         &nbsp; Addresses &nbsp;
//       </NavLink>
//       &nbsp;|&nbsp;
//       <Logout />
//     </nav>
//   );
// }







// function Logout() {
//   return (
//     <Form className="account-logout" method="POST" action="/account/logout">
//       &nbsp;<button type="submit">Sign out</button>
//     </Form>
//   );
// }






// app/routes/account.tsx
import {
  data as remixData,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account`
    : 'Account Details';

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          {heading}
        </h2>
        <AccountMenu />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet context={{customer}} />
      </main>
    </div>
  );
}

// function AccountMenu() {
//   function isActiveStyle({
//     isActive,
//     isPending,
//   }: {
//     isActive: boolean;
//     isPending: boolean;
//   }) {
//     return {
//       fontWeight: isActive ? 'bold' : undefined,
//       color: isPending ? 'grey' : 'black',
//     };
//   }

//   const linkClasses =
//     'block px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700';

//   return (
//     <nav className="flex flex-col space-y-3">
//       <NavLink
//         to="/account/orders"
//         style={isActiveStyle}
//         className={linkClasses}
//       >
//         🧾 Orders
//       </NavLink>
//       <NavLink
//         to="/account/profile"
//         style={isActiveStyle}
//         className={linkClasses}
//       >
//         👤 Profile
//       </NavLink>
//       <NavLink
//         to="/account/addresses"
//         style={isActiveStyle}
//         className={linkClasses}
//       >
//         📍 Addresses
//       </NavLink>
//       <Logout />
//     </nav>
//   );
// }


function AccountMenu() {
  function isActiveStyle({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return {
      fontWeight: isActive ? '600' : 'normal',
      color: isActive ? '#111827' : isPending ? '#9CA3AF' : '#4B5563',
    };
  }

  const linkBase =
    'flex items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-200';

  const navLinks = [
    {to: '/account/orders', label: 'Orders', icon: '🧾'},
    {to: '/account/profile', label: 'Profile', icon: '👤'},
    {to: '/account/addresses', label: 'Addresses', icon: '📍'},
  ];

  return (
    <nav className="flex flex-col gap-1">
      {navLinks.map(({to, label, icon}) => (
        <NavLink
          key={to}
          to={to}
          style={isActiveStyle}
          className={({isActive}) =>
            `${linkBase} ${
              isActive
                ? 'bg-gray-200 text-gray-900 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <span className="text-lg">{icon}</span>
          <span className="text-sm">{label}</span>
        </NavLink>
      ))}

      <Logout />
    </nav>
  );
}
function Logout() {
  return (
    <Form className="pt-6 border-t mt-4" method="POST" action="/account/logout">
      <button
        type="submit"
        className="block w-full text-left text-red-600 hover:bg-red-100 px-4 py-2 rounded transition"
      >
        🚪 Sign out
      </button>
    </Form>
  );
}
