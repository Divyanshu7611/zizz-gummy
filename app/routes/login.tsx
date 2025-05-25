// import React, { useState } from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle your login or signup logic here
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 font-sans">
//       {/* Left: Company Info */}
//       <div className="lg:w-1/2 bg-white p-10 flex flex-col justify-center shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Zizz Wellness</h2>
//         <div className="mb-4 flex items-center gap-2">
//           <FaEnvelope className="text-gray-600" />
//           <span>support@zizzwellness.com</span>
//         </div>
//         <div className="mb-4 flex items-center gap-2">
//           <FaPhone className="text-gray-600" />
//           <span>+91-98765-43210</span>
//         </div>
//         <div className="mb-4 flex items-center gap-2">
//           <FaMapMarkerAlt className="text-gray-600" />
//           <span>Zizz Wellness HQ, Kota, India</span>
//         </div>
//         <div className="mt-6">
//           <p className="font-semibold mb-2">Follow Us</p>
//           <div className="flex gap-4 text-gray-700 text-xl">
//             <FaFacebook />
//             <FaInstagram />
//             <FaTwitter />
//             <FaPinterest />
//           </div>
//         </div>
//       </div>

//       {/* Right: Auth Form */}
//       <div className="lg:w-1/2 flex items-center justify-center p-10 bg-white shadow-md">
//         <div className="w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`px-4 py-2 text-sm font-semibold ${isLogin ? 'border-b-2 border-black' : 'text-gray-400'}`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`ml-4 px-4 py-2 text-sm font-semibold ${!isLogin ? 'border-b-2 border-black' : 'text-gray-400'}`}
//             >
//               Sign Up
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {!isLogin && (
//               <>
//                 <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded" required />
//                 <input type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded" required />
//               </>
//             )}
//             <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded" required />
//             <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded" required />

//             {!isLogin && (
//               <>
//                 <input type="text" placeholder="Address" className="w-full p-3 border border-gray-300 rounded" required />
//               </>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
//             >
//               {isLogin ? 'Login' : 'Sign Up'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Link } from '@remix-run/react';

export default function AccountPage() {
  return (
    <div className="flex flex-col lg:flex-row p-8 gap-10">
      {/* Left Side - Company Info */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">Zizz Wellness</h2>
        <p>Email: support@zizzwellness.com</p>
        <p>Phone: +91-98765-43210</p>
        <p>Address: Zizz Wellness HQ, Kota, India</p>
        <p className="mt-4">Follow us:</p>
        <div className="flex space-x-4 text-lg">
          <a href="#"><i className="fab fa-facebook" /></a>
          <a href="#"><i className="fab fa-instagram" /></a>
          <a href="#"><i className="fab fa-twitter" /></a>
          <a href="#"><i className="fab fa-pinterest" /></a>
        </div>
      </div>

      {/* Right Side - Login Button */}
      <div className="lg:w-1/2 flex flex-col items-start space-y-6">
        <h3 className="text-xl font-semibold">Login to your account</h3>
        <form method="get" action="/account/authorize">
          <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
            Login with Shopify
          </button>
        </form>
      </div>
    </div>
  );
}
