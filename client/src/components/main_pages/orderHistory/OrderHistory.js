import React, { useContext, useEffect, useState } from "react";
import { StateProvider } from "../../../StateProvider";
import axios from "../../../axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const state = useContext(StateProvider);
  const [history, setHistory] = useState();
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [userInfo] = state.userAPI.userInfo;

  const getHistory = async () => {
    await axios
      .get(`/order/history/${userInfo._id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setHistory(res.data);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="history-page">
      <h2>History</h2>

      {/* <h4>You have {history.length} ordered</h4> */}

      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Order ID</th>
            <th>Date of Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history?.map((items, i) => (
            <tr key={items._id}>
              <td>{i + 1}</td>

              <td>{items._id}</td>
              <td>{new Date(items.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/order_view/${items._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
