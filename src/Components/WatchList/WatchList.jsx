import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchingData from '../../hooks/useFetchingData'
import "./WatchList.css";
import Pagination from "../Pagination/Pagination";
import SparklineChart from "../Charts/SparkLineChart";
import AddToken from "../AddToken/AddToken";
import { setHolding } from "../../utils/store/dataSlice";

const WatchList = () => {
  const dispatch = useDispatch();
  const [editRow, setEditRow] = useState(null);
  const [tempHoldings, setTempHoldings] = useState({});
  const { fetchDatawithRetry } = useFetchingData();
  const { watchlist } = useSelector((store) => store.data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = watchlist?.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = watchlist?.slice(startIndex, startIndex + itemsPerPage);

  const handleChange = (item, value) => {
    setTempHoldings((prev) => ({
      ...prev,
      [item.id]: value,
    }));
  };

  const handleSave = (e, item) => {
    e.stopPropagation();
    dispatch(
      setHolding({
        id: item.id,
        holdings: Number(tempHoldings[item.id] ?? item.holdings),
      })
    );
    setTempHoldings((prev) => {
      const { [item.id]: _, ...rest } = prev; 
      return rest;
    });

    setEditRow(null);
  };

  return (
    <div className="watchList">
      <div className="watchlist_header">
        <span>
          <i className="fa fa-star" ng-click="alertStar(1)" id="star"></i>
          Watchlist
        </span>
        <div className="action_btn">
          <button className="refresh_btn" onClick={() => fetchDatawithRetry()}>
            <i className="fa fa-refresh" id="refresh" aria-hidden="true"></i>{" "}
            Refresh Prices
          </button>
          <AddToken />
        </div>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Sparkline (7d)</th>
              <th>Holdings</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleItems?.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="name_container">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                    <span className="token_name">{item.name}</span>
                    {`(${item.symbol.toUpperCase()})`}
                  </div>
                </td>
                <td>${item.current_price}</td>
                <td>
                  {(item.price_change_percentage_24h > 0 ? "+" : " ") +
                    `${item.price_change_percentage_24h}`}
                  %
                </td>
                <td>
                  <SparklineChart
                    value={item.sparkline_in_7d}
                    chartColor={
                      item.price_change_percentage_24h > 0
                        ? "#32CA5B"
                        : "#FF3A33"
                    }
                  />
                </td>
                <td onClick={() => setEditRow(item.id)}>
                  {editRow === item.id ? (
                    <div className="name_container">
                      <input
                        type="number"
                        className="editable"
                        min={0}
                        value={tempHoldings[item.id] ?? item.holdings}
                        name={item.id}
                        onChange={(e) => handleChange(item, e.target.value)}
                      />
                      <button
                        className="holding_btn"
                        onClick={(e) => {
                          handleSave(e, item);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    item.holdings.toFixed(2)
                  )}
                </td>
                <td>{item.value.toFixed(2)}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default WatchList;
