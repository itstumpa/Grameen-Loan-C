// import React from 'react';
// import { useRouteError } from 'react-router';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Footer/Footer';
// import Home from "../Pages/Home/Home.jsx";
// import img404 from "../assets/img404.png"
// const Error = () => {

// const error = useRouteError()
//   return (
//     <>
//     <Navbar/>
//     <div className='flex justify-center mt-20 items-center lg:flex-row  md:flex-col'>
//       <img className='md:w-[400px] w-[300px] h-[300px] md:h-[400px] md:flex items-center hidden mt-8' src={img404} alt="" />
//                   <section className="flex items-center  h-full p-16  dark:text-gray-800">
// 	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
// 		<div className="max-w-md text-center">
// 			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
// 				<span className="sr-only">Error</span>404
// 			</h2>
// 			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
// 			<p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
// 			<a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded primary-btn dark:text-gray-50">Back to homepage</a>
// 		</div>
// 	</div>
// </section>
//     </div>
//                   <Footer />
//   </>
  
//   )
// }

// export default Error;








import React from 'react';
import { useRouteError } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import errorImg from '../assets/404-Error.png' 
const Error = (useRouteError) => {
  return (
    <div className='bg-[]'>

    <Navbar/>
    
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className='max-w-[500px] items-center flex justify-center mx-auto'>

        <img src={errorImg} alt="" />
        </div>

        {/* Text Content */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have gone on a delivery route. Let's get you back on track!
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-emerald-400 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            Go to Homepage
          </button>
          <button className="px-8 py-3 bg-transparent hover:bg-gray-100 text-gray-700 font-semibold rounded-full border-2 border-gray-300 hover:border-emerald-400 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shadow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        
        @keyframes wave-reverse {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.3; }
        }
        
        @keyframes antenna {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        @keyframes wiggle-reverse {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0, 0); }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, 2px); }
          98% { transform: translate(1px, -2px); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shadow { animation: shadow 3s ease-in-out infinite; }
        .animate-wave { animation: wave 2s ease-in-out infinite; }
        .animate-wave-reverse { animation: wave-reverse 2s ease-in-out infinite; }
        .animate-blink { animation: blink 4s ease-in-out infinite; }
        .animate-antenna { animation: antenna 2s ease-in-out infinite; transform-origin: center bottom; }
        .animate-wiggle { animation: wiggle 3s ease-in-out infinite; transform-origin: center; }
        .animate-wiggle-reverse { animation: wiggle-reverse 3s ease-in-out infinite; transform-origin: center; }
        .animate-glitch { animation: glitch 5s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
    <Footer className="max-w-7xl mx-auto"/>
    </div>
  );
};

export default Error;