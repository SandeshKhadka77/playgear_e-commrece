import React from 'react';
import ProductCard from '../components/ProductCard'; 

const HomePage = () => {
  // Mock Data - Representing your three niches
  const products = [
    { _id: '1', name: 'Logitech G Pro Wireless', price: 15500, category: 'Gaming', image: 'https://placehold.co/300x300?text=Gaming+Mouse', rating: 5 },
    { _id: '2', name: 'Adjustable Dumbbell Set (20kg)', price: 12000, category: 'Gym', image: 'https://placehold.co/300x300?text=Dumbbells', rating: 4.5 },
    { _id: '3', name: 'English Willow Cricket Bat', price: 25000, category: 'Sports', image: 'https://placehold.co/300x300?text=Cricket+Bat', rating: 5 },
    { _id: '4', name: 'Razer Kraken V3 Headset', price: 9500, category: 'Gaming', image: 'https://placehold.co/300x300?text=Headset', rating: 4 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[400px] bg-slate-900 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="z-10 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 italic uppercase">Gear Up For The Win</h1>
          <p className="text-lg text-gray-300 mb-6">Premium Gaming, Sports, and Fitness Equipment in Nepal.</p>
          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
            Shop New Arrivals
          </button>
        </div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
      </section>

      {/* 2. Category Quick-Links */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-center space-x-8 md:space-x-16">
          {['Gaming', 'Sports', 'Gym'].map((cat) => (
            <div key={cat} className="group cursor-pointer text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-transparent group-hover:border-orange-500 transition-all">
                <span className="text-2xl font-bold text-slate-700">{cat[0]}</span>
              </div>
              <p className="mt-2 font-semibold text-slate-600 uppercase text-sm tracking-widest">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Latest Products Grid */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 border-l-8 border-orange-500 pl-4">Featured Gear</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;