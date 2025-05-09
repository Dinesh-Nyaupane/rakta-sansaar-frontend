// src/components/Testimonials.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const testimonials = [
  {
    name: "Sita Sharma",
    role: "Blood Donor",
    message: "Rakta Sansaar made it so easy for me to help someone in need. I was notified immediately when someone nearby needed my blood type.",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Ramesh Thapa",
    role: "Recipient",
    message: "I found a donor within minutes during an emergency. This platform is truly life-saving. Thank you for creating this.",
    image: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    name: "Anita K.C.",
    role: "Regular Donor",
    message: "The reminders and donation history features keep me engaged. I feel like I’m part of a helpful community now.",
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    name: "Hari Bahadur",
    role: "Volunteer",
    message: "I help people register on Rakta Sansaar. It’s well-organized and user-friendly for even the elderly.",
    image: "https://randomuser.me/api/portraits/men/60.jpg"
  },
  {
    name: "Meena Adhikari",
    role: "Donor",
    message: "Donating blood was always on my mind. Rakta Sansaar helped me take that first step.",
    image: "https://randomuser.me/api/portraits/women/48.jpg"
  },
  {
    name: "Kamal Kharel",
    role: "Recipient",
    message: "I owe my recovery to a timely donor found on this platform. Grateful to the whole team.",
    image: "https://randomuser.me/api/portraits/men/78.jpg"
  },
  {
    name: "Bimala Rai",
    role: "Community Organizer",
    message: "We conduct blood drives using Rakta Sansaar. It's very effective for reaching the right people.",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    name: "Sandesh Shrestha",
    role: "Donor",
    message: "The platform even tracks my donation history. It’s beautifully built and reliable.",
    image: "https://randomuser.me/api/portraits/men/39.jpg"
  },
  {
    name: "Rajani Poudel",
    role: "Recipient’s Family",
    message: "In a critical moment, we found help quickly. I’ll always support this mission.",
    image: "https://randomuser.me/api/portraits/women/90.jpg"
  },
  {
    name: "Deepak Neupane",
    role: "First-time Donor",
    message: "I never imagined I could help someone this easily. The sign-up and verification were smooth.",
    image: "https://randomuser.me/api/portraits/men/23.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">What Our Users Say</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1} // Default to 1 slide per view on mobile
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            // When the screen width is at least 640px (small tablets and above), show 2 testimonials per slide
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // When the screen width is at least 1024px (large devices), show 3 testimonials per slide
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-50 p-8 rounded-xl shadow-md max-w-xl mx-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-red-500 mb-2">{testimonial.role}</p>
                <p className="text-gray-600 italic">“{testimonial.message}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
