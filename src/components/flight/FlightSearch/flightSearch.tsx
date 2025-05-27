import React, { useState } from "react";
import "./FlightSearch.scss";

interface FlightSearchProps {
  onSearch: (searchParams: FlightSearchParams) => void;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  tripType: "oneWay" | "roundTrip";
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    tripType: "oneWay",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTripTypeChange = (type: "oneWay" | "roundTrip") => {
    setSearchParams((prev) => ({
      ...prev,
      tripType: type,
      returnDate: type === "oneWay" ? "" : prev.returnDate,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="flight-search">
      <h2 className="flight-search__title">Tìm kiếm chuyến bay</h2>
      <form className="flight-search__form" onSubmit={handleSubmit}>
        <div className="flight-search__trip-type">
          <div
            className={`flight-search__trip-option ${
              searchParams.tripType === "oneWay" ? "active" : ""
            }`}
            onClick={() => handleTripTypeChange("oneWay")}
          >
            Một chiều
          </div>
          <div
            className={`flight-search__trip-option ${
              searchParams.tripType === "roundTrip" ? "active" : ""
            }`}
            onClick={() => handleTripTypeChange("roundTrip")}
          >
            Khứ hồi
          </div>
        </div>

        <div className="flight-search__row">
          <div className="flight-search__field">
            <label htmlFor="from">Điểm đi</label>
            <input
              type="text"
              id="from"
              name="from"
              value={searchParams.from}
              onChange={handleInputChange}
              placeholder="Nhập thành phố hoặc sân bay"
              required
            />
          </div>

          <div className="flight-search__field">
            <label htmlFor="to">Điểm đến</label>
            <input
              type="text"
              id="to"
              name="to"
              value={searchParams.to}
              onChange={handleInputChange}
              placeholder="Nhập thành phố hoặc sân bay"
              required
            />
          </div>
        </div>

        <div className="flight-search__row">
          <div className="flight-search__field">
            <label htmlFor="departDate">Ngày đi</label>
            <input
              type="date"
              id="departDate"
              name="departDate"
              value={searchParams.departDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flight-search__field">
            <label htmlFor="returnDate">Ngày về</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={searchParams.returnDate}
              onChange={handleInputChange}
              disabled={searchParams.tripType === "oneWay"}
              required={searchParams.tripType === "roundTrip"}
            />
          </div>
        </div>

        <div className="flight-search__row">
          <div className="flight-search__field">
            <label htmlFor="passengers">Số hành khách</label>
            <select
              id="passengers"
              name="passengers"
              value={searchParams.passengers}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} hành khách
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="flight-search__submit" type="submit">
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;