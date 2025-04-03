import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user: currentUser, loading } = useAuth();
  const [filters, setFilters] = useState({
    location: '',
    collegeName: '',
    year: '',
    branch: '',
    gender: '',
    course: '',
    pgName: ''
  });
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 9; // Number of items to fetch per page (3x3 grid)

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPosts();
  }, [filters]);

  useEffect(() => {
    if (currentUser?.isProfileComplete && hasMore) {
      fetchPosts();
    }
  }, [page, currentUser]);

  const fetchPosts = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filters,
          location: filters.location.toLowerCase(),
          gender: filters.gender.toLowerCase(),
          branch: filters.branch.toLowerCase(),
          course: filters.course.toLowerCase(),
          pgName: filters.pgName.toLowerCase(),
          collegeName: filters.collegeName.toLowerCase(),
           // Make location case-insensitive
          page,
          limit: ITEMS_PER_PAGE
        }
      });
      
      const newPosts = response.data.posts || response.data;
      
      if (Array.isArray(newPosts)) {
        if (page === 1) {
          setPosts(newPosts);
        } else {
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
        }
        
        // Check if we've received fewer items than requested, which means we've reached the end
        setHasMore(newPosts.length === ITEMS_PER_PAGE);
      } else {
        console.error("Expected array of posts but got:", newPosts);
        setError('Invalid response format');
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleUserClick = (userId) => {
    if (userId !== currentUser?._id) {
      navigate(`/user/${userId}`);
    }
  };


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser?.isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="mt-4 text-xl font-bold text-gray-900">Complete Your Profile</h2>
            <p className="mt-2 text-gray-600">
              Please complete your profile to view and connect with potential roommates.
            </p>
            <Link to="/edit-profile" className="mt-6 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800">
              Complete Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
;


  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Section */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Search by city or area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PG Name
                  </label>
                  <input
                    type="text"
                    name="pgName"
                    value={filters.pgName}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Search by PG name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={filters.collegeName}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter college name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={filters.branch}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter branch"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={filters.course}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter course"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No matching roommates found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => handleUserClick(post._id)}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {post.profilePhoto ? (
                        <img
                          src={post.profilePhoto}
                          alt={post.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{post.name}</h3>
                        <p className="text-gray-600 text-sm">{post.collegeName}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Location:</span>{' '}
                        {post.location?.address || 'Location not specified'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">PG Name:</span>{' '}
                        {post.pgName || 'Not specified'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Branch:</span>{' '}
                        {post.branch || 'Not specified'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Year:</span>{' '}
                        {post.year || 'Not specified'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Course:</span>{' '}
                        {post.course || 'Not specified'}
                      </p>
                      {(post.hasAirConditioning || post.foodAvailable) && (
                        <div className="flex gap-2 mt-2">
                          {post.hasAirConditioning && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              AC
                            </span>
                          )}
                          {post.foodAvailable && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Food Available
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
