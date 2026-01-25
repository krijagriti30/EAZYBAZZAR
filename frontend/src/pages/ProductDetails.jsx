// src/pages/ProductDetails.jsx
import React, { useState, useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { products } = useContext(ShopContext);
  const { addToCart } = useCart();

  // ✅ Put product in state
  const initialProduct =
    location.state?.product ||
    products.find((p) => p._id?.toString() === id.toString());

  const [product, setProduct] = useState(initialProduct);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  // ✅ Always build images from current product
  const imagesArray = Array.isArray(product.image)
    ? product.image
    : Array.isArray(product.images)
    ? product.images
    : [product.image || product.images || ""];

  const [mainImage, setMainImage] = useState(imagesArray[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ✅ Reset when product changes
  useEffect(() => {
    if (imagesArray.length > 0) {
      setMainImage(imagesArray[0]);
    }
    setSelectedSize("");
    setQuantity(1);
  }, [product]);

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const productToCart = {
      ...product,
      selectedSize,
      quantity,
    };

    addToCart(productToCart);
  };

  // --- Related Products Logic ---
  const relatedProducts = products.filter(
    (p) =>
      p.category === product.category &&
      p._id.toString() !== product._id.toString()
  );

  return (
    <div>
      {/* PRODUCT SECTION */}
      <div style={styles.container}>
        {/* LEFT - Images */}
        <div style={styles.imageSection}>
          <div style={styles.thumbnails}>
            {imagesArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index}`}
                style={{
                  ...styles.thumbnail,
                  opacity: img === mainImage ? 1 : 0.6,
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div style={styles.mainImageWrapper}>
            <img src={mainImage} alt={product.name} style={styles.mainImage} />
          </div>
        </div>

        {/* RIGHT - Product Info */}
        <div style={styles.infoSection}>
          <h1>{product.name}</h1>
          <div style={styles.rating}>⭐⭐⭐⭐☆ ({product.reviews || 122})</div>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.description}>{product.description}</p>

          {product.sizes?.length > 0 && (
            <div style={styles.sizes}>
              <label style={styles.label}>Select Size:</label>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  style={{
                    ...styles.sizeButton,
                    background: selectedSize === size ? "black" : "white",
                    color: selectedSize === size ? "white" : "black",
                    border:
                      selectedSize === size
                        ? "2px solid black"
                        : "1px solid #ccc",
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <button style={styles.addToCart} onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      {/* ✅ Only Description Section */}
      <div style={styles.tabsContainer}>
        <h3 style={{ marginBottom: "1rem" }}>Description</h3>
        <div style={styles.tabContent}>
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence.
          </p>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div style={styles.relatedSection}>
          <h2 style={styles.relatedHeading}>
            RELATED <span style={{ fontWeight: "bold" }}>PRODUCTS</span>
            <span style={styles.line}></span>
          </h2>
          <div style={styles.relatedGrid}>
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                style={styles.relatedCard}
                onClick={() => setProduct(item)}   // ✅ update state instead of navigate
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  style={styles.relatedImage}
                />
                <p style={styles.relatedName}>{item.name}</p>
                <p style={styles.relatedPrice}>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "2rem",
    padding: "2rem",
    flexWrap: "wrap",
  },
  imageSection: {
    display: "flex",
    flexDirection: "row",
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
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
  },
  mainImageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainImage: {
    width: "350px",
    height: "auto",
    borderRadius: "8px",
    objectFit: "cover",
  },
  infoSection: {
    flex: "1 1 300px",
  },
  rating: {
    margin: "0.5rem 0",
    color: "#ff9800",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
  },
  description: {
    marginBottom: "1rem",
    lineHeight: "1.5",
  },
  sizes: {
    margin: "1rem 0",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
    marginRight: "0.5rem",
  },
  sizeButton: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  addToCart: {
    padding: "0.75rem 1.5rem",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "1rem",
  },

  // Tabs (only description now)
  tabsContainer: {
    marginTop: "2rem",
    padding: "1rem 2rem",
  },
  tabContent: {
    padding: "1rem 0",
    lineHeight: "1.6",
  },

  // Related Products
  relatedSection: {
    marginTop: "3rem",
    padding: "2rem",
  },
  relatedHeading: {
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#374151",
  },
  line: {
    display: "inline-block",
    marginLeft: "10px",
    width: "50px",
    height: "2px",
    backgroundColor: "#374151",
    verticalAlign: "middle",
  },
  relatedGrid: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  relatedCard: {
    width: "200px",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  relatedImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  relatedName: {
    marginTop: "0.5rem",
    fontWeight: "normal",
    fontSize: "14px",
    color: "#333",
  },
  relatedPrice: {
    color: "#111",
    marginTop: "0.25rem",
    fontWeight: "600",
  },
};

export default ProductDetails;
