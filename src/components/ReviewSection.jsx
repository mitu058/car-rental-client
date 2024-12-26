import React from 'react';
import 'aos/dist/aos.css';  // Import AOS CSS
import AOS from 'aos';  // Import AOS

// Initialize AOS animation
AOS.init();

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    review: 'Great service! The booking process was so smooth and the car was in excellent condition.',
    rating: 5
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    review: 'I had a wonderful experience. Highly recommend for anyone looking for reliable car rentals.',
    rating: 4
  },
  {
    id: 3,
    name: 'Robert Brown',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    review: 'Affordable prices and excellent customer support. Will rent again!',
    rating: 5
  },
  {
    id: 4,
    name: 'Emily White',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    review: 'Very pleased with the service! The car was top-notch.',
    rating: 5
  },
  {
    id: 5,
    name: 'Michael Green',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    review: 'Fantastic experience overall, highly recommend this service.',
    rating: 4
  },
  {
    id: 6,
    name: 'Lisa Black',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    review: 'Easy booking, great cars. Will definitely rent again.',
    rating: 4
  },
  {
    id: 7,
    name: 'David Blue',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    review: 'Excellent customer support and great variety of cars.',
    rating: 3
  },
  {
    id: 8,
    name: 'Sarah Gray',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    review: 'Very happy with my rental, seamless experience.',
    rating: 3
  },
];

const ReviewSection = () => {
  return (
    <div className="my-20 px-6 w-[90%] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="flex items-center mb-2">
              <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <p className=" mb-2">
              {Array.from({ length: review.rating }).map((_, index) => (
                <span key={index} className="text-yellow-500">★</span>
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, index) => (
                <span key={index} className="text-gray-300">★</span>
              ))}
            </p>
              </div>    
            </div>
           
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
