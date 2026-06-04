const Section1 = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white shadow-xl">
      
      {/* Content */}
      <div className="flex flex-col justify-center p-8 md:p-14 bg-gradient-to-br from-pink-50 via-white to-pink-100">
        <span className="text-pink-500 font-semibold tracking-widest uppercase">
          New Collection
        </span>

        <h2 className="mt-4 text-4xl md:text-6xl font-black text-gray-900">
          Summer Fashion
          <br />
          Collection
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          Discover elegant dresses, trendy tops and statement pieces
          curated for modern women.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold transition">
            Shop Now
          </button>

          <button className="border border-pink-300 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition">
            Explore
          </button>
        </div>

        <div className="flex gap-10 mt-10">
          <div>
            <h3 className="text-2xl font-bold text-pink-600">20K+</h3>
            <p className="text-gray-500">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-pink-600">5K+</h3>
            <p className="text-gray-500">New Styles</p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
          alt="Summer Collection"
          className="w-full h-full min-h-[500px] object-cover"
        />

        <div className="absolute top-6 right-6 bg-white rounded-full w-28 h-28 flex flex-col justify-center items-center shadow-xl">
          <span className="text-xs">UP TO</span>
          <span className="text-3xl font-black text-pink-600">
            70%
          </span>
          <span className="text-xs">OFF</span>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Section1;