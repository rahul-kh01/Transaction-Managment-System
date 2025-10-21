// Transform store data for form initialization
export const getInitialValues = (storeData) => {
  if (!storeData) {
    return {
      brand: "",
      description: "",
      storeType: "",
      contact: {
        address: "",
        phone: "",
        email: "",
      },
    };
  }

  return {
    brand: storeData.brand || "",
    description: storeData.description || "",
    storeType: storeData.storeType || "",
    contact: {
      address: storeData.contact?.address || "",
      phone: storeData.contact?.phone || "",
      email: storeData.contact?.email || "",
    },
  };
}; 