import React from 'react';
import { Package, MapPin, Shield, DollarSign, Zap, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Door-to-Door Delivery",
      description: "Quick and secure pickup and drop-off at any location."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Tracking",
      description: "Know exactly where your parcel is, from pickup to delivery."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Riders",
      description: "Verified and trained riders ensure your items are in safe hands."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Affordable Rates",
      description: "Transparent pricing with zero hidden charges."
    }
  ];

  return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 mt-28 rounded-xl">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Package className="w-4 h-4" />
              About goParcel
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fast, Reliable &<br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Seamless Delivery
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              In a world where speed and efficiency matter more than ever, 
              <span className="font-semibold text-gray-900"> goParcel </span> 
              is built to make deliveries simple, transparent, and stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Trusted Delivery Partner
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Whether it's an urgent document, a surprise gift, or an important business parcel — 
                we bring doorstep-to-doorstep convenience you can trust.
              </p>
              <p className="text-gray-600 leading-relaxed">
                goParcel connects senders with professional riders who ensure your parcel reaches 
                the right place at the right time. With real-time tracking, secure handling, and 
                friendly service, we make delivery feel effortless for everyone.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
                <Users className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="leading-relaxed opacity-95">
                  To deliver speed, safety, and trust — all in one platform. 
                  Simplifying delivery with reliable logistics, modern technology, 
                  and a customer-first approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-gray-600 text-lg">Everything you need for seamless deliveries</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            We believe delivery shouldn't be complicated. People deserve a service that saves time, 
            reduces stress, and keeps them connected. Whether for personal needs or business operations, 
            goParcel helps build a smoother, faster, and more dependable delivery experience — 
            one parcel at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              Send Your Parcel Now
            </button>
            <button className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default About;