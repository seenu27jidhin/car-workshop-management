import React from 'react';

const tabNames = ['Cart', 'Address', 'Payment', 'Success'];

const CartTabs = ({ activeTab, onTabClick }) => (
  <div className="cart-tabs">
    {tabNames.map((tab, idx) => (
      <div
        key={tab}
        className={`cart-tab${activeTab === idx ? ' active' : ''}`}
        onClick={() => onTabClick(idx)}
        style={{ cursor: 'pointer' }}
      >
        <span className="tab-index">{idx + 1}</span>
        <span>{tab}</span>
      </div>
    ))}
  </div>
);

export default CartTabs;
