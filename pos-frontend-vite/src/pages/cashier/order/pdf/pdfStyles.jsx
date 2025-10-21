import { StyleSheet } from "@react-pdf/renderer";

// Create PDF styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2937",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 5,
  },
  infoGrid: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    border: "1px solid #e5e7eb",
    borderRadius: 5,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    color: "#6b7280",
    fontWeight: "bold",
  },
  infoValue: {
    color: "#111827",
  },
  totalAmount: {
    color: "#059669",
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: "#10b981",
    color: "#ffffff",
    padding: "4px 12px",
    borderRadius: 12,
    fontSize: 10,
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 35,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "left",
  },
  tableCellCenter: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  tableCellRight: {
    flex: 1,
    padding: 8,
    textAlign: "right",
  },
  tableCellImage: {
    flex: 0.5,
    padding: 8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 30,
    height: 30,
    objectFit: "cover",
    borderRadius: 4,
  },
  imagePlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6b7280",
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  productSku: {
    fontSize: 10,
    color: "#6b7280",
  },
});
