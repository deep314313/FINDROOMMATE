import React, { useEffect } from 'react';
import { Users, MapPin, Building2, ArrowRight, Star, Quote } from 'lucide-react';
import front from '../assets/front.png'
import { Link } from 'react-router-dom';


function App() {
  useEffect(() => {
    // Create stars
    const createStars = () => {
      const stars = document.querySelector('.stars');
      if (!stars) return;

      // Clear existing stars
      stars.innerHTML = '';

      // Create new stars
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2;
        
        // Random duration
        const duration = 2 + Math.random() * 3;
        
        star.style.cssText = `
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          --duration: ${duration}s;
        `;
        
        stars.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);
    return () => window.removeEventListener('resize', createStars);
  }, []);

  return (
    <div className="relative min-h-screen bg-black w-full text-white">
      {/* Stars Background - lowered z-index */}
      <div className="stars absolute inset-0 z-0" />

      {/* Content Container - ensure it doesn't overlap with navbar */}
      <div className="relative z-10 pt-10">

        {/* Hero Section */}
        <div className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src={front}
              alt="Students in apartment" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl font-bold mb-6 gradient-text">Find Your Perfect Roommate</h1>
            <p className="text-xl mb-8 text-gray-300">Connecting students with compatible roommates across India</p>
            <Link
  to="/search"
  className="bg-white text-black text-sm px-5 py-3 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center w-fit mx-auto"
>
  Get Started
  <ArrowRight className="ml-2 w-5 h-5" />
</Link>

          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-20 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-4">Verified Profiles</h3>
                <p className="text-gray-400">All roommates go through our verification process to ensure safety and security.</p>
              </div>
              <div className="text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-4">Quality Listings</h3>
                <p className="text-gray-400">Curated selection of accommodations that meet our high standards.</p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-4">Prime Locations</h3>
                <p className="text-gray-400">Properties in the best locations near colleges and universities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black/80">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold mb-2 gradient-text">5000+</h3>
                <p className="text-gray-400">Happy Students</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 gradient-text">4</h3>
                <p className="text-gray-400">Major Cities</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 gradient-text">98%</h3>
                <p className="text-gray-400">Success Rate</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 gradient-text">24/7</h3>
                <p className="text-gray-400">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 gradient-text">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-black/40 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
                <Quote className="w-10 h-10 text-white opacity-10 mb-4" />
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Student"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-gray-400">Delhi University</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300">"Found my perfect roommate within a week! The verification process made me feel safe and secure. Couldn't be happier with my experience."</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-black/40 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
                <Quote className="w-10 h-10 text-white opacity-10 mb-4" />
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Student"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Rahul Verma</h4>
                    <p className="text-sm text-gray-400">IIT Delhi</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300">"The platform made it incredibly easy to find someone with similar interests and study habits. Great support team too!"</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-black/40 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
                <Quote className="w-10 h-10 text-white opacity-10 mb-4" />
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="Student"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Aisha Patel</h4>
                    <p className="text-sm text-gray-400">Bangalore Institute of Technology</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300">"As a first-year student, I was worried about finding accommodation. RoommateFinder made the process smooth and stress-free!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section id="cities" className="py-20 bg-black/60">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Where We Operate</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { name: 'Delhi', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada' },
        { name: 'Gurgaon', imageUrl: 'https://images.unsplash.com/photo-1514392181188-8f5d54262fa5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Noida', imageUrl: 'https://t4.ftcdn.net/jpg/05/40/30/71/360_F_540307170_qg8R8Seug9NYJzL7FpbBuW5St0lIyAvv.jpg' },
        { name: 'Bangalore', imageUrl: 'https://i.kinja-img.com/image/upload/c_fill,h_900,q_60,w_1600/1432fedb88c0d1cc56f4c496a80f251c.jpg' },
      ].map((city) => (
        <div key={city.name} className="relative h-64 group overflow-hidden rounded-lg border border-white/10">
          <img 
            src={city.imageUrl}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">{city.name}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



        {/* Footer */}
        <footer className="bg-black/90 py-8 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 RoommateFinder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;