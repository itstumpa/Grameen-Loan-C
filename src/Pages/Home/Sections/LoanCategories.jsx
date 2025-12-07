// LoanCategories.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Home, 
  ShoppingCart, 
  Stethoscope, 
  Zap,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  DollarSign
} from 'lucide-react';

const LoanCategories = () => {
  const categories = [
    {
      id: 1,
      icon: Briefcase,
      title: "Business Loan",
      description: "Fuel your entrepreneurial dreams with flexible business financing for inventory, equipment, or expansion.",
      maxLoan: "$25,000",
      interestRate: "8% - 15%",
      tenure: "3 - 36 months",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
      gradient: "from-blue-500 to-indigo-600",
      color: "var(--primary)",
      features: ["Quick approval", "No collateral", "Flexible repayment"]
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Education Loan",
      description: "Invest in your future with education loans for tuition, books, and living expenses. Build your career without financial stress.",
      maxLoan: "$15,000",
      interestRate: "6% - 12%",
      tenure: "12 - 60 months",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop",
      gradient: "from-purple-500 to-pink-600",
      color: "var(--primary)",
      features: ["Student friendly", "Deferred payments", "Low interest"]
    },
    {
      id: 3,
      icon: Home,
      title: "Home Improvement",
      description: "Renovate, repair, or upgrade your home. Turn your house into your dream home with affordable financing.",
      maxLoan: "$20,000",
      interestRate: "9% - 16%",
      tenure: "6 - 48 months",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop",
      gradient: "from-emerald-500 to-teal-600",
      color: "var(--primary)",
      features: ["Same-day approval", "Flexible terms", "Direct payment"]
    },
    {
      id: 4,
      icon: ShoppingCart,
      title: "Personal Loan",
      description: "For any personal need—weddings, travel, debt consolidation, or unexpected expenses. No questions asked.",
      maxLoan: "$10,000",
      interestRate: "10% - 18%",
      tenure: "3 - 24 months",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      gradient: "from-amber-500 to-orange-600",
      color: "var(--primary)",
      features: ["Instant approval", "No documentation", "Quick disbursal"]
    },
    {
      id: 5,
      icon: Stethoscope,
      title: "Medical Emergency",
      description: "Healthcare can't wait. Get instant funding for medical treatments, surgeries, or hospital bills without delays.",
      maxLoan: "$12,000",
      interestRate: "7% - 14%",
      tenure: "6 - 36 months",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop",
      gradient: "from-red-500 to-pink-600",
      color: "var(--primary)",
      features: ["24/7 available", "Emergency support", "Flexible EMI"]
    },
    {
      id: 6,
      icon: Zap,
      title: "Quick Cash Loan",
      description: "Need money urgently? Get quick cash for any short-term need with minimal paperwork and instant approval.",
      maxLoan: "$5,000",
      interestRate: "12% - 20%",
      tenure: "1 - 12 months",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&h=300&fit=crop",
      gradient: "from-violet-500 to-purple-600",
      color: "var(--primary)",
      features: ["2-hour approval", "Minimal docs", "Instant transfer"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-14 px-4 md:px-8" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'var(--primary)', opacity: 0.1 }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
              Loans For Every Need
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>
            Explore Loan Categories
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            From business growth to personal needs, we've got the perfect loan solution for you. Choose what fits your goals.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group rounded-2xl overflow-hidden shadow-lg relative"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--border)'
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                {/* <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60`} /> */}
                
                {/* Icon Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="absolute top-4 left-4 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg"
                >
                  <category.icon className="w-8 h-8" style={{ color: category.color }} />
                </motion.div>

                {/* Max Loan Badge */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg"
                >
                  <span className="text-xs font-bold" style={{ color: category.color }}>
                    Up to {category.maxLoan}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {category.description}
                </p>

                {/* Loan Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--bg)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4" style={{ color: category.color }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Interest Rate
                      </span>
                    </div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {category.interestRate}
                    </p>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--bg)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4" style={{ color: category.color }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Tenure
                      </span>
                    </div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {category.tenure}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: category.color }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* View Details Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 group/btn transition-all"
                  style={{
                    backgroundColor: category.color,
                    color: 'white'
                  }}
                >
                  View Details
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Hover Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ border: `3px solid ${category.color}` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 p-8 rounded-2xl"
          style={{
            backgroundColor: 'var(--surface)',
            border: '2px solid var(--border)'
          }}
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Not Sure Which Loan Is Right For You?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Our loan experts are here to help you choose the perfect option based on your needs and financial situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Talk to an Expert
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline inline-flex items-center gap-2"
            >
              Compare All Loans
              <TrendingUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoanCategories;