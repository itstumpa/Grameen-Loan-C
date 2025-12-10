// AllLoansAdmin.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign,
  Search,
  Edit,
  Trash2,
  Plus,
  Loader,
  AlertCircle,
  X,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const AllLoansAdmin = () => {
  // ========== STATE ==========
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // ========== FETCH LOANS ==========
  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/all-loans');
      console.log('✅ Loans fetched:', response.data);
      setLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error('❌ Error fetching loans:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load loans'
      });
    } finally {
      setLoading(false);
    }
  };

  // ========== FILTER LOANS ==========
  useEffect(() => {
    let result = loans;

    if (selectedCategory !== 'All') {
      result = result.filter(loan => loan.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(loan =>
        loan.loanTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLoans(result);
  }, [selectedCategory, searchQuery, loans]);

  // ========== CATEGORIES ==========
  const categories = ['All', ...new Set(loans.map(loan => loan.category))];

  // ========== OPEN ADD MODAL ==========
  const handleAdd = () => {
    setEditMode(false);
    setSelectedLoan(null);
    setImagePreview('');
    reset();
    setShowModal(true);
  };

  // ========== OPEN EDIT MODAL ==========
  const handleEdit = (loan) => {
    setEditMode(true);
    setSelectedLoan(loan);
    setImagePreview(loan.image || '');
    
    // Populate form
    setValue('loanTitle', loan.loanTitle);
    setValue('category', loan.category);
    setValue('shortDescription', loan.shortDescription);
    setValue('description', loan.description);
    setValue('maxLoan', loan.maxLoan?.replace(/[^0-9]/g, '') || '');
    setValue('interestRate', loan.interestRate);
    setValue('tenure', loan.tenure);
    setValue('emiPlans', loan.emiPlans?.join(', ') || '');
    
    setShowModal(true);
  };

  // ========== HANDLE IMAGE CHANGE ==========
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ========== SUBMIT FORM ==========
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const loanData = {
        loanTitle: data.loanTitle,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        maxLoan: `$${data.maxLoan}`,
        interestRate: data.interestRate,
        tenure: data.tenure,
        emiPlans: data.emiPlans.split(',').map(p => p.trim()),
        image: imagePreview,
        showOnHome: editMode ? selectedLoan.showOnHome : false,
        createdAt: editMode ? selectedLoan.createdAt : new Date(),
        updatedAt: new Date()
      };

      if (editMode) {
        // Update existing loan
        await axios.patch(
          `http://localhost:3000/all-loans/${selectedLoan._id}`,
          loanData
        );

        setLoans(loans.map(l => 
          l._id === selectedLoan._id ? { ...l, ...loanData } : l
        ));

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Loan updated successfully',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // Create new loan
        const response = await axios.post(
          'http://localhost:3000/all-loans',
          loanData
        );

        setLoans([...loans, { ...loanData, _id: response.data.insertedId }]);

        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'New loan created successfully',
          timer: 2000,
          showConfirmButton: false
        });
      }

      setShowModal(false);
      reset();
      setImagePreview('');
      
    } catch (error) {
      console.error('❌ Error saving loan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response?.data?.message || 'Failed to save loan'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ========== DELETE LOAN ==========
  const handleDelete = (loan) => {
    Swal.fire({
      title: 'Delete Loan?',
      text: `Are you sure you want to delete "${loan.loanTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: 'var(--error)',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/all-loans/${loan._id}`);
          
          setLoans(loans.filter(l => l._id !== loan._id));

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Loan deleted successfully',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Could not delete loan'
          });
        }
      }
    });
  };

  // ========== TOGGLE SHOW ON HOME ==========
  const toggleShowOnHome = async (loan) => {
    try {
      const newStatus = !loan.showOnHome;

      await axios.patch(
        `http://localhost:3000/all-loans/${loan._id}`,
        { showOnHome: newStatus }
      );

      setLoans(loans.map(l => 
        l._id === loan._id ? { ...l, showOnHome: newStatus } : l
      ));

      Swal.fire({
        icon: 'success',
        title: newStatus ? 'Added to Home' : 'Removed from Home',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not update loan visibility'
      });
    }
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-12 h-12 animate-spin" style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-2" 
              style={{ color: 'var(--text-primary)' }}>
            Manage Loans
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Create, edit, and manage loan products
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Add New Loan
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Loans', value: loans.length, color: 'var(--primary)' },
          { label: 'On Homepage', value: loans.filter(l => l.showOnHome).length, color: 'var(--success)' },
          { label: 'Categories', value: new Set(loans.map(l => l.category)).size, color: 'var(--secondary)' },
          { label: 'Hidden', value: loans.filter(l => !l.showOnHome).length, color: 'var(--text-secondary)' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--surface)',
              border: '2px solid var(--border)'
            }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              {stat.label}
            </p>
            <p className="text-3xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" 
                  style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search loans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
            style={{
              backgroundColor: 'var(--surface)',
              border: '2px solid var(--border)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: selectedCategory === category 
                  ? 'var(--primary)' 
                  : 'var(--surface)',
                color: selectedCategory === category 
                  ? 'white' 
                  : 'var(--text-primary)',
                border: '2px solid',
                borderColor: selectedCategory === category 
                  ? 'var(--primary)' 
                  : 'var(--border)'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loans Table */}
      <div className="rounded-xl overflow-hidden"
           style={{
             backgroundColor: 'var(--surface)',
             border: '2px solid var(--border)'
           }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: 'var(--bg)' }}>
              <tr>
                <th className="text-left p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Image
                </th>
                <th className="text-left p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Title
                </th>
                <th className="text-left p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Interest
                </th>
                <th className="text-left p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Category
                </th>
                <th className="text-left p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Max Loan
                </th>
                <th className="text-center p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Show on Home
                </th>
                <th className="text-center p-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-8">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-30" 
                                 style={{ color: 'var(--text-secondary)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>No loans found</p>
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan, index) => (
                  <motion.tr
                    key={loan._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t hover:bg-opacity-5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {/* Image */}
                    <td className="p-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden"
                           style={{ backgroundColor: 'var(--bg)' }}>
                        {loan.image ? (
                          <img
                            src={loan.image}
                            alt={loan.loanTitle}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="p-4">
                      <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                        {loan.loanTitle}
                      </p>
                      <p className="text-sm line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                        {loan.shortDescription}
                      </p>
                    </td>

                    {/* Interest */}
                    <td className="p-4">
                      <span className="font-semibold" style={{ color: 'var(--secondary)' }}>
                        {loan.interestRate}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold"
                            style={{ 
                              backgroundColor: 'var(--primary)', 
                              opacity: 0.1,
                              color: 'var(--primary)' 
                            }}>
                        {loan.category}
                      </span>
                    </td>

                    {/* Max Loan */}
                    <td className="p-4">
                      <span className="font-bold" style={{ color: 'var(--success)' }}>
                        {loan.maxLoan}
                      </span>
                    </td>

                    {/* Show on Home Toggle */}
                    <td className="p-4">
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleShowOnHome(loan)}
                          className="p-2 rounded-lg"
                          style={{ 
                            backgroundColor: loan.showOnHome 
                              ? 'var(--success)' 
                              : 'var(--text-secondary)',
                            opacity: 0.1
                          }}
                          title={loan.showOnHome ? 'Visible on Home' : 'Hidden from Home'}
                        >
                          {loan.showOnHome ? (
                            <Eye className="w-5 h-5" style={{ color: 'var(--success)' }} />
                          ) : (
                            <EyeOff className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                          )}
                        </motion.button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(loan)}
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: 'var(--primary)', opacity: 0.1 }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(loan)}
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: 'var(--error)', opacity: 0.1 }}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" style={{ color: 'var(--error)' }} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl p-8 rounded-2xl my-8"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--border)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  {editMode ? 'Edit Loan' : 'Add New Loan'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg)' }}
                >
                  <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2" 
                         style={{ color: 'var(--text-primary)' }}>
                    Loan Image
                  </label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="p-4 rounded-lg border-2 border-dashed flex items-center justify-center gap-2"
                           style={{ borderColor: 'var(--border)' }}>
                        <Upload className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Choose Image
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Loan Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" 
                           style={{ color: 'var(--text-primary)' }}>
                      Loan Title <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <input
                      {...register('loanTitle', { required: 'Title is required' })}
                      type="text"
                      placeholder="e.g., Business Loan"
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: 'var(--bg)',
                        border: `2px solid ${errors.loanTitle ? 'var(--error)' : 'var(--border)'}`,
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.loanTitle && (
                      <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                        {errors.loanTitle.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" 
                           style={{ color: 'var(--text-primary)' }}>
                      Category <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: 'var(--bg)',
                        border: `2px solid ${errors.category ? 'var(--error)' : 'var(--border)'}`,
                        color: 'var(--text-primary)'
                      }}
                    >
                      <option value="">Select category</option>
                      <option value="Business">Business</option>
                      <option value="Education">Education</option>
                      <option value="Home Improvement">Home Improvement</option>
                      <option value="Personal">Personal</option>
                      <option value="Medical">Medical</option>
                      <option value="Agriculture">Agriculture</option>
                    </select>
                    {errors.category && (
                      <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2" 
                         style={{ color: 'var(--text-primary)' }}>
                    Short Description <span style={{ color: 'var(--error)' }}>*</span>
                  </label>
                  <textarea
                    {...register('shortDescription', { required: 'Description is required' })}
                    rows="2"
                    placeholder="Brief description..."
                    className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: `2px solid ${errors.shortDescription ? 'var(--error)' : 'var(--border)'}`,
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2" 
                         style={{ color: 'var(--text-primary)' }}>
                    Full Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows="4"
                    placeholder="Detailed description..."
                    className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: '2px solid var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Max Loan */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" 
                           style={{ color: 'var(--text-primary)' }}>
                      Max Loan ($) <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <input
                      {...register('maxLoan', { required: 'Max loan is required' })}
                      type="number"
                      step="100"
                      placeholder="25000"
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: 'var(--bg)',
                        border: `2px solid ${errors.maxLoan ? 'var(--error)' : 'var(--border)'}`,
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" 
                           style={{ color: 'var(--text-primary)' }}>
                      Interest Rate <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <input
                      {...register('interestRate', { required: 'Interest rate is required' })}
                      type="text"
                      placeholder="8% - 15%"
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: 'var(--bg)',
                        border: `2px solid ${errors.interestRate ? 'var(--error)' : 'var(--border)'}`,
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>

                  {/* Tenure */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" 
                           style={{ color: 'var(--text-primary)' }}>
                      Tenure <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <input
                      {...register('tenure', { required: 'Tenure is required' })}
                      type="text"
                      placeholder="3 - 36 months"
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: 'var(--bg)',
                        border: `2px solid ${errors.tenure ? 'var(--error)' : 'var(--border)'}`,
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>

                {/* EMI Plans */}
                <div>
                  <label className="block text-sm font-semibold mb-2" 
                         style={{ color: 'var(--text-primary)' }}>
                    EMI Plans (comma-separated)
                  </label>
                  <input
                    {...register('emiPlans')}
                    type="text"
                    placeholder="6 months, 12 months, 24 months"
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: '2px solid var(--border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl font-bold disabled:opacity-50"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white'
                    }}
                  >
                    {submitting ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update Loan' : 'Create Loan')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-xl font-semibold"
                    style={{
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllLoansAdmin;