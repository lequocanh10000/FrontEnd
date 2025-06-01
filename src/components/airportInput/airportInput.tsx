"use client";

import React, { useState, useEffect } from "react";
import styles from "./airportInput.module.scss";
import { IconType } from "react-icons";
import { airportService, Airport } from "@/api/services/airportService";
import { toast } from "react-toastify";
import { FaPlaneDeparture } from "react-icons/fa";
import { ChangeEvent } from "react";

export interface AirportInputProps {
  label: string;
  icon: IconType;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (airport: Airport) => void;
  placeholder?: string;
}

const AirportInput: React.FC<AirportInputProps> = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  onSelect,
  placeholder,
}) => {
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    onChange(e);

    if (query.length >= 1) {
      try {
        setIsLoading(true);
        const results = await airportService.searchAirports(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error searching airports:', error);
        toast.error('Không thể tìm kiếm sân bay');
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Airport) => {
    const displayValue = `${suggestion.code} - ${suggestion.city}`;
    const fakeEvent = {
      target: {
        name: name,
        value: displayValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    setInputValue(displayValue);
    onChange(fakeEvent);
    if (onSelect) onSelect(suggestion);
    setShowSuggestions(false);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  return (
    <div className={styles.airportInput}>
      <label htmlFor={name}>
        <Icon className={styles.icon} /> {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoComplete="off"
        required
      />

      {showSuggestions && (
        <div className={styles.suggestionsDropdown}>
          {isLoading ? (
            <div className={styles.loading}>Đang tìm kiếm...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => {
              const query = inputValue.toLowerCase();
              return (
                <div
                  key={suggestion.airport_id}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className={styles.airportCode}>
                    {suggestion.code
                      .split(new RegExp(`(${query})`, "gi"))
                      .map((part: string, i: number) =>
                        part.toLowerCase() === query ? (
                          <span key={i} className={styles.highlight}>
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                  </div>
                  <div className={styles.airportInfo}>
                    <div className={styles.airportCityCountry}>
                      <span className={styles.city}>
                        {suggestion.city
                          .split(new RegExp(`(${query})`, "gi"))
                          .map((part: string, i: number) =>
                            part.toLowerCase() === query ? (
                              <span key={i} className={styles.highlight}>
                                {part}
                              </span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                      </span>
                      <span className={styles.country}>{suggestion.country}</span>
                    </div>
                    <div className={styles.airportName}>{suggestion.name}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noResults}>Không tìm thấy sân bay</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AirportInput;
