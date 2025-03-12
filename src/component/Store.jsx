import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import Vendor from './Vendor';
import Spinner from './Spinner';

const Store = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('https://siyumarket-backend.vercel.app/store/all');
        if (!response.ok) {
          throw new Error('Failed to fetch stores');
        }
        const data = await response.json();
        setVendors(data.data.stores); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="py-10">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-4 mb-6">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id || index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:translate-y-2"
            >
              <Link to={`/store/${vendor.id}`}>
                <Vendor
                  name={vendor.name}
                  logo={vendor.image_url}
                  description={vendor.description} 
                />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
