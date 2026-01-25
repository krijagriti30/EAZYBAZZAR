import jsPDF from "jspdf";


export const generateInvoice = (order, orderId) => {
  const doc = new jsPDF();

  let y = 20;

  // TITLE
  doc.setFontSize(18);
  doc.text("INVOICE", 105, y, { align: "center" });

  y += 10;
  doc.setFontSize(10);
  doc.text(`Order ID: ${orderId}`, 14, y);
  y += 6;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, y);

  y += 10;
  doc.line(14, y, 196, y);
  y += 8;

  // CUSTOMER DETAILS
  doc.setFontSize(12);
  doc.text("Customer Details", 14, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(
    `${order.address.firstName} ${order.address.lastName}`,
    14,
    y
  );
  y += 5;
  doc.text(order.address.street, 14, y);
  y += 5;
  doc.text(
    `${order.address.city}, ${order.address.state} - ${order.address.zipcode}`,
    14,
    y
  );
  y += 5;
  doc.text(`Phone: ${order.address.phone}`, 14, y);

  y += 10;
  doc.line(14, y, 196, y);
  y += 8;

  // PRODUCTS HEADER
  doc.setFontSize(12);
  doc.text("Order Items", 14, y);
  y += 6;

  doc.setFontSize(10);

  order.items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.title} (Qty: ${item.quantity})`,
      14,
      y
    );
    doc.text(`₹${item.price}`, 180, y, { align: "right" });
    y += 6;
  });

  y += 6;
  doc.line(14, y, 196, y);
  y += 8;

  // PRICE SUMMARY
  doc.text(`Subtotal: ₹${order.subtotal}`, 14, y);
  y += 5;
  doc.text(`Shipping: ₹${order.shippingFee}`, 14, y);
  y += 5;

  doc.setFontSize(12);
  doc.text(`Total: ₹${order.total}`, 14, y);

  y += 10;
  doc.setFontSize(10);
  doc.text(`Payment Method: ${order.paymentMethod}`, 14, y);

  // SAVE PDF
  doc.save(`Invoice_${orderId}.pdf`);
};
