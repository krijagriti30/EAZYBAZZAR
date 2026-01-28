import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetails = () => {
  const location = useLocation();

  const { products } = useContext(ShopContext);
  const { addToCart, cartItems } = useCart();
  const { isLoggedIn } = useAuth();
  const { addToWishlist, wishlistItems } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  const [showAddedMsg, setShowAddedMsg] = useState(false);
  const [showWishlistMsg, setShowWishlistMsg] = useState(false);

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    if (location.state?.product) {
      const p = location.state.product;
      setProduct(p);
      const imgs = Array.isArray(p.image) ? p.image : [p.image];
      setMainImage(imgs[0] || "");
      setSelectedSize("");
      setQuantity(1);
    }
  }, [location.state]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading product...</h2>;
  }

  /* ================= IMAGES ================= */
  const imagesArray = Array.isArray(product.image)
    ? product.image
    : Array.isArray(product.images)
    ? product.images
    : [product.image];

  /* ================= RATING ================= */
  const rating = product.rating || 4;
  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? "⭐" : "☆"}</span>
    ));

  /* ================= CHECKS ================= */
  const isInWishlist = wishlistItems?.some(
    (item) => item._id === product._id
  );

  const isInCart = cartItems?.some(
    (item) =>
      item._id === product._id && item.selectedSize === selectedSize
  );

  /* ================= CART ================= */
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select size first");
      return;
    }

    if (isInCart) {
      alert("Product already in cart");
      return;
    }

    addToCart({ ...product, selectedSize, quantity });
    setShowAddedMsg(true);
    setTimeout(() => setShowAddedMsg(false), 2000);
  };

  /* ================= WISHLIST ================= */
   /* ================= WISHLIST ================= */
const handleAddToWishlist = () => {
  if (!isLoggedIn) {
    alert("Please login to use wishlist ❤️");
    return;
  }

  // 👉 SIZE CHECK (SAME AS CART)
  if (product.sizes?.length > 0 && !selectedSize) {
    alert("Please select size first");
    return;
  }

  // 👉 ALREADY IN WISHLIST CHECK
  const alreadyWishlisted = wishlistItems?.some(
    (item) => item._id?.toString() === product._id?.toString()
  );

  if (alreadyWishlisted) {
    alert("Product already in wishlist ❤️");
    return;
  }

  // 👉 ADD TO WISHLIST
  addToWishlist({
    ...product,
    selectedSize,          // optional but safe
    image: imagesArray[0],
  });

  setShowWishlistMsg(true);
  setTimeout(() => setShowWishlistMsg(false), 2000);
};

  /* ================= RELATED ================= */
  const relatedProducts =
    products?.filter(
      (p) =>
        p.category === product.category &&
        p._id !== product._id
    ) || [];

  return (
    <div>
      {/* PRODUCT */}
      <div style={styles.container}>
        {/* IMAGES */}
        <div style={styles.imageSection}>
          <div style={styles.thumbnails}>
            {imagesArray.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                style={{
                  ...styles.thumbnail,
                  opacity: img === mainImage ? 1 : 0.5,
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div
            style={styles.mainImageWrapper}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={mainImage}
              alt={product.name}
              style={{
                ...styles.mainImage,
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
              }}
            />
          </div>
        </div>

        {/* INFO */}
        <div style={styles.infoSection}>
          <h1>{product.name}</h1>

          <div style={styles.rating}>{renderStars()}</div>

          <p style={styles.price}>₹{product.price}</p>
          <p>{product.description}</p>

          {product.sizes?.length > 0 && (
            <div style={styles.sizes}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  style={{
                    ...styles.sizeButton,
                    background: selectedSize === size ? "black" : "white",
                    color: selectedSize === size ? "white" : "black",
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {showAddedMsg && (
            <div style={styles.successMsg}>Added to cart</div>
          )}

          {showWishlistMsg && (
            <div style={styles.successMsg}>Added to wishlist ❤️</div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={styles.addToCart} onClick={handleAddToCart}>
              ADD TO CART
            </button>

            <button
              style={{
                ...styles.wishlistBtn,
                color: isInWishlist ? "red" : "black",
              }}
              onClick={handleAddToWishlist}
            >
              {isInWishlist ? "❤️ WISHLISTED" : "🤍 WISHLIST"}
            </button>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {relatedProducts.length > 0 && (
        <div style={styles.relatedSection}>
          <h2 style={{ textAlign: "center" }}>RELATED PRODUCTS</h2>

          <div style={styles.relatedGrid}>
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                style={styles.relatedCard}
                onClick={() => {
                  setProduct(item);
                  const imgs = Array.isArray(item.image)
                    ? item.image
                    : [item.image];
                  setMainImage(imgs[0]);
                  setSelectedSize("");
                  setQuantity(1);
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={
                    Array.isArray(item.image)
                      ? item.image[0]
                      : item.image
                  }
                  alt={item.name}
                  style={styles.relatedImage}
                />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= STYLES (UNCHANGED) ================= */
const styles = {
  container: {
    display: "flex",
    gap: "2rem",
    padding: "2rem",
    flexWrap: "wrap",
  },
  imageSection: {
    display: "flex",
    gap: "1rem",
  },
  thumbnails: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  thumbnail: {
    width: "60px",
    height: "60px",
    cursor: "pointer",
    objectFit: "cover",
  },
  mainImageWrapper: {
    overflow: "hidden",
  },
  mainImage: {
    width: "350px",
    borderRadius: "8px",
    transition: "transform 0.3s ease",
  },
  infoSection: {
    flex: "1",
  },
  rating: {
    color: "#ff9800",
    marginBottom: "6px",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  sizes: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  sizeButton: {
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
  addToCart: {
    background: "black",
    color: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  wishlistBtn: {
    background: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontWeight: "bold",
    cursor: "pointer",
  },
  successMsg: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#ecfdf5",
    color: "#065f46",
    border: "1px solid #34d399",
    borderRadius: "5px",
  },
  relatedSection: {
    padding: "2rem",
  },
  relatedGrid: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  relatedCard: {
    width: "180px",
    cursor: "pointer",
    textAlign: "center",
  },
  relatedImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
};

export default ProductDetails;
