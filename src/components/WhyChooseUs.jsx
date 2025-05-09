import { FaHeartbeat, FaSearchLocation, FaShieldAlt, FaUserCheck, FaHandsHelping, FaCalendarCheck } from 'react-icons/fa';

const features = [
  {
    icon: <FaHeartbeat className="text-red-600 text-4xl mb-4" />,
    title: "Life-Saving Impact",
    description: "Every donation you make can save up to three lives. Join a movement that truly matters."
  },
  {
    icon: <FaSearchLocation className="text-red-600 text-4xl mb-4" />,
    title: "Nearby Donors",
    description: "Use our geolocation feature to find blood donors near your area instantly and efficiently."
  },
  {
    icon: <FaShieldAlt className="text-red-600 text-4xl mb-4" />,
    title: "Verified Donors",
    description: "We verify each donor for safety and authenticity, ensuring trust in every donation."
  },
  {
    icon: <FaUserCheck className="text-red-600 text-4xl mb-4" />,
    title: "Easy Sign-Up",
    description: "Our registration process is quick and simple, whether you're a donor or someone in need."
  },
  {
    icon: <FaHandsHelping className="text-red-600 text-4xl mb-4" />,
    title: "Community Support",
    description: "Get support from a community of donors and recipients through real-time requests and offers."
  },
  {
    icon: <FaCalendarCheck className="text-red-600 text-4xl mb-4" />,
    title: "Donation History",
    description: "Track your past donations and get reminders when it's safe to donate again."
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
