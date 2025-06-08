import {
  data as remixData,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {useState} from 'react';
import { FaBox, FaUser, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account`
    : 'Account Details';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30`}
        >
          <div className="p-6 rounded-r-xl">
            <h2 className="text-xl font-semibold text-gray-800">Account Menu</h2>
            <AccountMenu />
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{heading}</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Outlet context={{customer}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  function isActiveStyle({isActive, isPending}:any) {
    return {
      className: `block py-2 px-4 rounded-md transition-colors ${
        isActive
          ? 'bg-blue-600 text-white font-semibold'
          : isPending
          ? 'text-gray-400'
          : 'text-gray-600 hover:bg-blue-50'
      }`,
    };
  }

  return (
       <nav className="mt-6 space-y-2 min-h-screen flex flex-col">
      <NavLink to="/account/orders" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
        <FaBox className="text-lg" />
        Orders
      </NavLink>
      <NavLink to="/account/profile" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
        <FaUser className="text-lg" />
        Profile
      </NavLink>
      <NavLink to="/account/addresses" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
        <FaMapMarkerAlt className="text-lg" />
        Addresses
      </NavLink>
      <div className="flex items-center gap-2 text-gray-700 hover:text-black transition cursor-pointer">
        <FaSignOutAlt className="text-lg" />
        <Logout />
      </div>
    </nav>

  );
}

function Logout() {
  return (
    <Form method="POST" action="/account/logout">
      <button
        type="submit"
        className="block text-left rounded-md text-gray-600 hover:bg-blue-50 transition-colors"
      >
        Sign out
      </button>
    </Form>
  );
}