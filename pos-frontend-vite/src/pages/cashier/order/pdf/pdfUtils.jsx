import { pdf } from "@react-pdf/renderer";

import { OrderPDF } from "./OrderPDF";
import { formatDate } from "../data";

export const handleDownloadOrderPDF = async (order, toast) => {
  try {
    if (toast) {
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your PDF...",
      });
    }

    const pdfDoc = pdf(<OrderPDF order={order} />);
    const blob = await pdfDoc.toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `order-${order.id}-${formatDate(order.createdAt).replace(
      /\//g,
      "-"
    )}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (toast) {
      toast({
        title: "PDF Downloaded",
        description: `Order ${order.id} has been downloaded as PDF`,
      });
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (toast) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  }
};
