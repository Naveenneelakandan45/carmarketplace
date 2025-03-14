const FormatResult = (resp) => {
    console.log("Raw response before formatting:", resp); // ✅ Log input data

    let result = {};
    let finalResult = [];

    resp.forEach((item) => {
        const listingId = item.carListing?.id;  // ✅ Corrected key name
        
        if (!listingId) {
            console.warn("Skipping item with undefined listing ID:", item);
            return; // Skip invalid entries
        }

        if (!result[listingId]) {
            result[listingId] = {
                car: item.carListing,  // ✅ Corrected key name
                images: []
            };
        }

        if (item.carImages) {
            result[listingId].images.push(item.carImages);
        }
    });

    console.log("Grouped result before converting to array:", result); // ✅ Log grouped object

    Object.values(result).forEach((item) => {
        finalResult.push({
            ...item.car,
            images: item.images
        });
    });

    console.log("Final formatted response:", finalResult); // ✅ Log final formatted output

    return finalResult;
};
export {
    FormatResult,
};

