import React from "react";
import "./ship.css";
const Shipping = () => {
  return (
    <>
      <section className="ship-section">
        <div className="container">
          <div className="ship-parent">
            <h1>Shipping</h1>
            <h3>Order processing</h3>
            <ul>
              <li>Order processing:</li>
              <li>
                You will be getting email notifications with order status
                updates.{" "}
              </li>
              <li>
                If you need to change your delivery info, please contact us as
                soon as possible. If the order is not yet dispatched, we would
                be able to change it.
              </li>
              <li>Order to be delivered within 24 Hours 25 AED additional.</li>
            </ul>
          </div>
          <div className="ship-parent">
            <h3>UAE</h3>
            <ul>
              <li>
                Shipping Charges varies depending on the products that you are
                ordering
              </li>
              <li>
                Magnets – 30 AED flat no matter how many packages you order.
              </li>
              <li>
                Looking to expedite your order? Contact us on 00971555095911
              </li>
            </ul>
          </div>

          <div className="ship-parent">
            <h3>GCC Countries / International</h3>
            <ul>
              <li>
                Fees vary from Country to country Contact us and we will able to
                provide you with a quote based on order Quantity
              </li>
              <li>Please contact us at Hello@memoriessquare.ae</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
