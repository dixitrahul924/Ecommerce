import React, { useContext, useEffect, useState } from "react";
import { StateProvider } from "../../../StateProvider";
import axios from "../../../axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const state = useContext(StateProvider);
  const [orderDetails, setOrderDetails] = useState([]);
  const [token] = state.token;
  const params = useParams();

  const getOrderDetails = async () => {
    await axios
      .get(`/order/view/${params.order_id}`, {
        headers: { Authorization: token[0] },
      })
      .then((res) => {
        console.log(res.data);
        setOrderDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails[0].name}</td>
            <td>{orderDetails[0].address}</td>
            <td>{orderDetails[0].paymentMode}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails[0].cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
