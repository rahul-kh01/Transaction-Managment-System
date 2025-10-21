import { formatDate, getPaymentModeLabel } from "../data";
import { styles } from "./pdfStyles";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Create PDF document
export const OrderPDF = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Order Details - #{order.id}</Text>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{formatDate(order.createdAt)}</Text>
          </View>
         
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Payment Method:</Text>
            <Text style={styles.infoValue}>
              {getPaymentModeLabel(order.paymentType)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>
              ₹{order.totalAmount?.toFixed(2) || "0.00"}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>
              {order.customer?.fullName || "Walk-in Customer"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>
              {order.customer?.phone || "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>
              {order.customer?.email || "Walk-in Customer"}
            </Text>
          </View>
          
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCellImage}>Image</Text>
            <Text style={styles.tableCell}>Item</Text>
            <Text style={styles.tableCellCenter}>Quantity</Text>
            <Text style={styles.tableCellRight}>Price</Text>
            <Text style={styles.tableCellRight}>Total</Text>
          </View>
          {order.items?.map((item, index) => (
            <View key={item.id || index} style={styles.tableRow}>
              <View style={styles.tableCellImage}>
                {item.product?.image ? (
                  <Image src={item.product.image} style={styles.productImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>
                      {item.productName ? item.productName.charAt(0).toUpperCase() : 
                       item.product?.name ? item.product.name.charAt(0).toUpperCase() : 'P'}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.productName}>
                  {item.productName || item.product?.name || 'Product'}
                </Text>
                {item.product?.sku && (
                  <Text style={styles.productSku}>SKU: {item.product.sku}</Text>
                )}
              </View>
              <Text style={styles.tableCellCenter}>{item.quantity}</Text>
              <Text style={styles.tableCellRight}>
                ₹{item.product?.sellingPrice?.toFixed(2) || "0.00"}
              </Text>
              <Text style={styles.tableCellRight}>
                ₹{(item.product?.sellingPrice * item.quantity)?.toFixed(2) || "0.00"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
