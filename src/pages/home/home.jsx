import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="font-sans bg-primary text-gray-800">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-secondary to-white px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-accent mb-4">KV Audio Rentals</h1>
        <p className="text-xl md:text-2xl max-w-xl mb-8">
          Elevate your event with premium audio equipment and expert support.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-accent text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
            Explore Packages
          </button>
          {!localStorage.getItem("token") && <button onClick={() => {
            navigate("/login");
          }} className="border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-white transition">
            Login
          </button>}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-accent mb-10">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { icon: '🔊', title: 'Speakers' },
              { icon: '🎤', title: 'Microphones' },
              { icon: '🎚️', title: 'Sound Mixers' },
              { icon: '📦', title: 'Event Packages' },
            ].map((service, i) => (
              <div key={i} className="bg-secondary rounded-2xl shadow-md p-6 hover:shadow-xl transition">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-accent">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-accent mb-6">Why KV Audio?</h2>
          <p className="text-lg text-gray-700">
            With years of experience and a passion for sound, KV Audio Rentals delivers tailored solutions for every event.
            From intimate weddings to large-scale concerts, we provide top-quality gear and technical expertise.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-16 text-center text-white px-6">
        <h2 className="text-3xl font-semibold mb-4">Make Your Event Sound Incredible</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Start your booking now and let KV Audio take care of your event's sound perfection.
        </p>
        <button onClick={()=>{
            const token = localStorage.getItem("token");
            if (token != null) {
                navigate("/items");
                return;
            }else{
                navigate("/login");
                toast.error("Please Login First");
                return;
            }
        }} className="bg-white text-accent font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
          Book Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-6 text-center text-sm">
        © 2025 KV Audio Rentals(Shashika Jayasinghe) · All Rights Reserved
      </footer>

    </div>
  );
}
