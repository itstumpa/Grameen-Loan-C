// LoanDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  DollarSign,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Shield,
  Percent,
  Loader,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const LoanDetails = () => {
  // ========== HOOKS ==========
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ========== STATE ==========
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);

  // ========== FETCH LOAN DETAILS ==========
  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching loan details for ID:', id);
        
        const response = await axios.get(`http://localhost:3000/all-loans/${id}`);
        
        console.log('✅ Loan details:', response.data);
        setLoan(response.data);
        
      } catch (err) {
        console.error('❌ Error fetching loan:', err);
        setError(err.response?.data?.message || 'Failed to load loan details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLoanDetails();
    }
  }, [id]);

  // ========== HANDLE APPLY ==========
  const handleApplyNow = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to apply for a loan',
        confirmButtonText: 'Go to Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: `/loan-details/${id}` } });
        }
      });
      return;
    }

    // Navigate to application form with loan data
    navigate(`/apply-loan/${id}`, { state: { loan } });
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" 
           style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="w-12 h-12 mx-auto mb-4" 
                    style={{ color: 'var(--primary)' }} />
          </motion.div>
          <p className="text-lg font-semibold" 
             style={{ color: 'var(--text-primary)' }}>
            Loading loan details...
          </p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-screen mt-52 flex items-center justify-center" 
           style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center max-w-md p-8 rounded-2xl" 
             style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border)' }}>
          <AlertCircle className="w-16 h-16 mx-auto mb-4" 
                       style={{ color: 'var(--error)' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Loan Not Found
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            {error}
          </p>
          <button 
            onClick={() => navigate('/all-loans')}
            className="btn-primary px-6 py-2"
          >
            Back to All Loans
          </button>
        </div>
      </div>
    );
  }

  // ========== NO LOAN DATA ==========
  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center" 
           style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--text-primary)' }}>No loan data available</p>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen py-20 px-4 md:px-8" 
         style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/all-loans')}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            color: 'var(--text-primary)',
            border: '2px solid var(--border)'
          }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Loans
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--border)'
              }}
            >
              {/* Category Badge */}
              <div className="inline-block px-4 py-1 rounded-full mb-4"
                   style={{ 
                     backgroundColor: 'var(--primary)', 
                     opacity: 0.1 
                   }}>
                <span className="text-sm font-semibold" 
                      style={{ color: 'var(--primary)' }}>
                  {loan.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black mb-4" 
                  style={{ color: 'var(--text-primary)' }}>
                {loan.loanTitle}
              </h1>

              {/* Short Description */}
              <p className="text-lg mb-6" 
                 style={{ color: 'var(--text-secondary)' }}>
                {loan.shortDescription}
              </p>

              {/* Max Loan Amount */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                     style={{ backgroundColor: 'var(--primary)', opacity: 0.1 }}>
                  <DollarSign className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Maximum Loan Amount
                  </p>
                  <p className="text-3xl font-black" style={{ color: 'var(--primary)' }}>
                    {loan.maxLoan || loan.amount}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Loan Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Interest Rate */}
              <div className="p-6 rounded-xl"
                   style={{
                     backgroundColor: 'var(--surface)',
                     border: '2px solid var(--border)'
                   }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: 'var(--secondary)', opacity: 0.1 }}>
                    <Percent className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                  </div>
                  <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    Interest Rate
                  </h3>
                </div>
                <p className="text-2xl font-black" style={{ color: 'var(--secondary)' }}>
                  {loan.interestRate || '8% - 15%'}
                </p>
              </div>

              {/* Tenure */}
              <div className="p-6 rounded-xl"
                   style={{
                     backgroundColor: 'var(--surface)',
                     border: '2px solid var(--border)'
                   }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}>
                    <Calendar className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    Loan Tenure
                  </h3>
                </div>
                <p className="text-2xl font-black" style={{ color: 'var(--accent)' }}>
                  {loan.tenure || '3 - 36 months'}
                </p>
              </div>
            </motion.div>

            {/* Full Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--border)'
              }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3" 
                  style={{ color: 'var(--text-primary)' }}>
                <FileText className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                Loan Details
              </h2>
              <p className="leading-relaxed whitespace-pre-line" 
                 style={{ color: 'var(--text-secondary)' }}>
                {loan.description || loan.shortDescription}
              </p>
            </motion.div>

            {/* Features/Benefits */}
            {loan.features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '2px solid var(--border)'
                }}
              >
                <h2 className="text-2xl font-bold mb-6" 
                    style={{ color: 'var(--text-primary)' }}>
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {loan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" 
                                   style={{ color: 'var(--success)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Application Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-2xl sticky top-24"
              style={{
                background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
              }}
            >
              <h3 className="text-2xl font-black text-white mb-6">
                Apply for This Loan
              </h3>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Approval Time</span>
                  </div>
                  <span className="font-bold">2-4 Hours</span>
                </div>
                
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </div>
                  <span className="font-bold">100% Safe</span>
                </div>
                
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Success Rate</span>
                  </div>
                  <span className="font-bold">98%</span>
                </div>
              </div>

              <div className="h-px bg-white opacity-20 my-6"></div>

              {/* Documents Required */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">Documents Required:</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Government ID (Passport/License)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Proof of Address
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Bank Statements (3 months)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Proof of Income
                  </li>
                </ul>
              </div>

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyNow}
                disabled={applying}
                className="w-full py-4 bg-white text-blue-900 font-black rounded-xl hover:shadow-2xl transition-all disabled:opacity-50"
              >
                {applying ? 'Processing...' : 'Apply Now'}
              </motion.button>

              <p className="text-white text-xs text-center mt-4 opacity-80">
                By applying, you agree to our Terms & Conditions
              </p>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--border)'
              }}
            >
              <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Need Help?
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>
                    support@grameenloan.com
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;