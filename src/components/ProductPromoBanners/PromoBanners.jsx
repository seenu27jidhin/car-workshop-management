import React from 'react';
const promobanners = [
  {
    name: 'Body Parts for Any Vehicle',
    img: '../../public/promobanner.avif',
  },
  {
    name: ' Jacket Harley Davidson',
    img: '../../public/promobanner.avif',
  },
];
const PromoBanners = () => (
  <div className="promo-banners">
    {promobanners.map((p, i) => (
      <div className={`promo promo ${i + 1}`}>
        <img src={p.img} alt={`PromoBanner ${i + 1}`} />
        <p>{p.name}</p>
      </div>
    ))}
    {/* <div className="promo promo2">
      <img src="" />
      Jacket Harley Davidson
    </div> */}
  </div>
);

export default PromoBanners;
