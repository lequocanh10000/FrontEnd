// src/components/flight/flightFilter.tsx
import React, { useState, useEffect } from 'react';
import styles from './flightFilter.module.scss';

interface FilterProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    timeOfDay: string;
  }) => void;
  initialFilters?: {
    minPrice?: number;
    maxPrice?: number;
    timeOfDay?: string;
  };
}

const FlightFilter: React.FC<FilterProps> = ({ onFilterChange, initialFilters }) => {
  const [priceRange, setPriceRange] = useState({ 
    min: initialFilters?.minPrice || 100000, 
    max: initialFilters?.maxPrice || 4000000 
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState({ 
    min: initialFilters?.minPrice || 100000, 
    max: initialFilters?.maxPrice || 4000000 
  });
  const [timeOfDay, setTimeOfDay] = useState(initialFilters?.timeOfDay || 'all');
  
  // Time of day options
  const timeOptions = [
    { id: 'all', label: 'Tất cả', timeRange: '' },
    { id: 'morning', label: '00:00 - 11:59 Sáng', timeRange: '00:00 - 11:59' },
    { id: 'afternoon', label: '12:00 - 17:59 Chiều', timeRange: '12:00 - 17:59' },
    { id: 'evening', label: '18:00 - 23:59 Tối', timeRange: '18:00 - 23:59' },
  ];

  // Update local state when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setPriceRange({
        min: initialFilters.minPrice || 100000,
        max: initialFilters.maxPrice || 4000000
      });
      setSelectedPriceRange({
        min: initialFilters.minPrice || 100000,
        max: initialFilters.maxPrice || 4000000
      });
      setTimeOfDay(initialFilters.timeOfDay || 'all');
    }
  }, [initialFilters]);

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange({ ...priceRange, max: value });
  };

  const handleTimeOfDayChange = (id: string) => {
    setTimeOfDay(id);
  };

  const handleApplyFilters = () => {
    setSelectedPriceRange(priceRange);
    onFilterChange({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      timeOfDay: timeOfDay,
    });
  };

  const handleResetFilters = () => {
    const defaultPriceRange = { min: 100000, max: 4000000 };
    setPriceRange(defaultPriceRange);
    setSelectedPriceRange(defaultPriceRange);
    setTimeOfDay('all');
    onFilterChange({
      minPrice: defaultPriceRange.min,
      maxPrice: defaultPriceRange.max,
      timeOfDay: 'all',
    });
  };

  // Format price as VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Bộ lọc</h3>
      
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Ngân sách</h4>
        <div className={styles.priceFilter}>
          <div className={styles.priceRange}>
            <span>{formatPrice(100000)}</span>
            <span>{formatPrice(4000000)}</span>
          </div>
          <input 
            type="range" 
            min="100000" 
            max="4000000" 
            step="50000" 
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            className={styles.rangeSlider}
          />
          <div className={styles.selectedPrice}>
            <span>Giá tối đa: {formatPrice(priceRange.max)}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Giờ khởi hành</h4>
        <div className={styles.timeFilter}>
          {timeOptions.map(option => (
            <label key={option.id} className={styles.timeOption}>
              <input 
                type="radio" 
                name="timeOfDay" 
                checked={timeOfDay === option.id}
                onChange={() => handleTimeOfDayChange(option.id)}
              />
              <span className={styles.timeLabel}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className={styles.filterActions}>
        <button 
          className={styles.resetBtn} 
          onClick={handleResetFilters}
        >
          Thiết lập lại
        </button>
        <button 
          className={styles.applyBtn} 
          onClick={handleApplyFilters}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default FlightFilter;