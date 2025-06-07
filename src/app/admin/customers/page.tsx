'use client';

import { useState, useEffect } from 'react';
import styles from './customers.module.scss';
import { FaSearch } from 'react-icons/fa';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  return fetch(url, {
    ...options,
    headers
  });
}


interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  address: string;
  id_card_number: string;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Fetch customers data
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:4000/customers', {
         method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Customer[] = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_id.toString().includes(searchTerm) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id_card_number.includes(searchTerm) ||
    `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to Vietnamese locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className={styles.customersContainer}>
      <div className={styles.header}>
        <h1>Quản Lý Khách Hàng</h1>
        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.customersTable}>
          <thead>
            <tr>
              <th>ID KHÁCH HÀNG</th>
              <th>HỌ VÀ TÊN</th>
              <th>ĐỊA CHỈ</th>
              <th>MÃ SỐ ĐỊNH DANH</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{`${customer.first_name} ${customer.last_name}`}</td>
                <td>{customer.address}</td>
                <td>{customer.id_card_number}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 