const CartItems = ({
  items,
  wishlistItems,
  onQtyChange,
  onhandleAddToWishlist,
  onRemove,
}) => {
  return (
    <div className="cart-items-section">
      <div className="cart-offers">
        <div>Available Offers</div>
        <div>Apply Coupons</div>
      </div>
      <div className="cart-list-title">
        My Cart ({items.length}){' '}
        <span className="cart-total">
          Total: ₹{items.reduce((a, b) => a + b.product.price * b.quantity, 0)}
        </span>
      </div>
      <div>
        {items.map(item => (
          <div className="cart-item" key={item.product._id}>
            <img src={item.product.image} alt={item.product.title} />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.product.title}</div>
              <div className="cart-item-desc">{item.product.description}</div>
              <div className="cart-item-actions">
                <button
                  className="cart-action-btn"
                  onClick={() => onhandleAddToWishlist(item.product._id)}
                >
                  Save for Later
                </button>
                <button
                  className="cart-action-btn"
                  onClick={() => onRemove(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-item-qty">
              <button
                onClick={() => onQtyChange(item._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => onQtyChange(item._id, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className="cart-item-price">
              ₹{item.product.price * item.quantity}
              <div className="cart-item-mrp">
                ₹{item.product.price * 1.2} MRP/unit
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-list-title">
        My Wishlist({wishlistItems.length}){' '}
      </div>
      <div>
        {wishlistItems.map(item => (
          <div className="cart-item" key={item.product._id}>
            <img src={item.product.image} alt={item.product.title} />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.product.title}</div>
              <div className="cart-item-desc">{item.product.description}</div>
              <div className="cart-item-actions">
                <button
                  className="cart-action-btn"
                  onClick={() => onhandleAddToWishlist(item.product._id)}
                >
                  Save for Later
                </button>
                <button
                  className="cart-action-btn"
                  onClick={() => onRemove(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-item-qty">
              <button
                onClick={() => onQtyChange(item._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => onQtyChange(item._id, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className="cart-item-price">
              ₹{item.product.price * item.quantity}
              <div className="cart-item-mrp">
                ₹{item.product.price * 1.2} MRP/unit
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CartItems;
