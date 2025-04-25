"use client";

import React, { useState, useEffect } from "react";
import styles from "./airportInput.module.scss";
import { IconType } from "react-icons";

interface AirportInputProps {
  label: string;
  icon: IconType;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (airport: { code: string; city: string }) => void;
}

const AirportInput: React.FC<AirportInputProps> = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  onSelect,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Mock data - Thay bằng API call thực tế nếu cần
  const mockAirports = [
    {
      code: "HAN",
      city: "Hanoi",
      country: "Vietnam",
      name: "Noi Bai International Airport",
    },
    {
      code: "SGN",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      name: "Tan Son Nhat International Airport",
    },
    {
      code: "DAD",
      city: "Đà Nẵng",
      country: "Việt Nam",
      name: "Sân bay Quốc tế Đà Nẵng",
    },
    {
      code: "CXR",
      city: "Nha Trang",
      country: "Việt Nam",
      name: "Sân bay Quốc tế Cam Ranh",
    },
    {
      code: "HPH",
      city: "Hải Phòng",
      country: "Việt Nam",
      name: "Sân bay Quốc tế Cát Bi",
    },
    {
      code: "DLI",
      city: "Đà Lạt",
      country: "Việt Nam",
      name: "Sân bay Liên Khương",
    },
    {
      code: "PQC",
      city: "Phú Quốc",
      country: "Việt Nam",
      name: "Sân bay Quốc tế Phú Quốc",
    },
    {
      code: "VCA",
      city: "Cần Thơ",
      country: "Việt Nam",
      name: "Sân bay Quốc tế Cần Thơ",
    },
    {
      code: "UIH",
      city: "Quy Nhơn",
      country: "Việt Nam",
      name: "Sân bay Phù Cát",
    },
    {
      code: "HUI",
      city: "Huế",
      country: "Việt Nam",
      name: "Sân bay Phú Bài",
    },
    {
      code: "PXU",
      city: "Pleiku",
      country: "Việt Nam",
      name: "Sân bay Pleiku",
    },
    {
      code: "JFK",
      city: "New York",
      country: "USA",
      name: "John F. Kennedy International Airport",
    },

    {
      code: "LAX",
      city: "Los Angeles",
      country: "USA",
      name: "Los Angeles International Airport",
    },
    {
      code: "LHR",
      city: "London",
      country: "UK",
      name: "Heathrow Airport",
    },
  ];

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    onChange(e);

    if (query.length >= 1) {
      const filtered = mockAirports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(query.toLowerCase()) ||
          airport.code.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
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
        placeholder="Thành phố hoặc sân bay"
        autoComplete="off"
        required
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestionsDropdown}>
          {suggestions.map((suggestion, index) => {
            const query = inputValue.toLowerCase();
            return (
              <div
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className={styles.airportCode}>
                  {suggestion.code
                    .split(new RegExp(`(${query})`, "gi"))
                    .map((part, i) =>
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
                        .map((part, i) =>
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
          })}
        </div>
      )}
    </div>
  );
};

export default AirportInput;
