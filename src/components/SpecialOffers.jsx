import { motion } from "framer-motion";
import logo from '../assets/images.jpeg'
import aston from '../assets/Aston-Martin-Valkyrie.webp'
import family from '../assets/Long-Term-Car-Rental-COVER.jpg'
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const offers = [
    {
      title: "15% Off on Weekend Rentals!",
      description: "Book your ride now and enjoy exclusive weekend discounts.",
      buttonText: "Book Now",
      image: logo,
    },
    {
      title: "Luxury Cars at $99/day!",
      description: "This holiday season, experience luxury at affordable prices.",
      buttonText: "Book Now",
      image: aston,
    },
    {
      title: "Family Road Trip Special!",
      description: "Rent the best car for your next trip with your family.",
      buttonText: "Book Now",
      image: family,
    },
  ];

  return (
    <section className="bg-gray-100 mt-14 py-10">
      <div className="container mx-auto px-6">
     <div className="text-center mb-12 space-y-2">
     <h2 className="text-3xl font-bold ">Special Offers</h2>
     <p>Take advantage of our exclusive offers! Rent your dream car at <br /> unbeatable prices and enjoy extra perks for a limited time only</p>
     </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Slide in from left or right
              whileInView={{ opacity: 1, x: 0 }} // Animate to center
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% in view
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.2, // Staggered effect
              }}
              whileHover={{
                y: [0, -10, 0], // Bounce effect
                transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">{offer.title}</h3>
              <p className="text-gray-600 mb-6">{offer.description}</p>
            <Link to={'/availableCar'}>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-700 to-orange-500 hover:from-orange-500 hover:to-orange-700 text-white  rounded-md hover:bg-blue-700">
                {offer.buttonText}
              </button>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
