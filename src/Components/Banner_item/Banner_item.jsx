const Banner_item = ({item}) => {
    return (
      <section className="bg-cover bg-center h-96 md:h-[500px] relative" style={{ backgroundImage: `url(${item?.background_image_url || 'https://via.placeholder.com/1500x600?text=Winter+Collection'})` }}>
        <div className="bg-black bg-opacity-50 absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{item?.headline}</h1>
          <p className="text-lg md:text-2xl mb-6">{item?.subheadline}</p>
          
          <div className="bg-white text-black p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl md:text-3xl font-semibold">{item?.featured_product?.name}</h2>
            <p className="text-lg mt-2">Price: ${item?.featured_product?.price}</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300">Shop Now</button>
          </div>
          
          <p className="text-sm md:text-lg font-light">{item?.promotion} | {item?.seasonal_offer}</p>
        </div>
      </section>
    );
  };
  
  export default Banner_item;
  