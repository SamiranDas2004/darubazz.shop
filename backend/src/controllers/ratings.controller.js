import Product from "../models/product.model.js";
import Rating from "../models/ratings.model.js";

export const setRatingForAProduct = async (req, res) => {
  try {
    const { productId, userId, value } = req.body; // Correctly access req.body
console.log(value);

    let findProduct = await Rating.findOne({ product: productId });

    if (!findProduct) {
      // If no ratings exist for the product, create a new entry
      findProduct = await Rating.create({
        product: productId,
        user: [userId],
        value: [value],
      });
    } else {
      // If the product has existing ratings
      const userAlreadyRated = findProduct.user.includes(userId);

      if (!userAlreadyRated) {
        findProduct.user.push(userId);
        findProduct.value.push(value);
      } else {
        return res.status(400).json({ message: "User has already rated this product" });
      }
    }

    // Calculate the new average rating
    const totalValue = findProduct.value.reduce((sum, curr) => sum + curr, 0);
    const averageRating = totalValue / findProduct.value.length;

    // Save the updated document
    await findProduct.save();

    return res.status(200).json({ data: findProduct, averageRating });
  } catch (error) {
    console.error("Error setting rating:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const setTheRatingInTheProduct = async (req, res) => {
  try {
    const { productId } = req.body; // productId is an array
    console.log(productId);
    
    let updatedProducts = [];

    for (let i = 0; i < productId.length; i++) {
      const ratingData = await Rating.findOne({ product: productId[i] });

      if (!ratingData) {
        console.log(`Rating data not found for product ID ${productId[i]}`);
        continue;
      }

      const sum = ratingData.value.reduce((acc, curr) => acc + curr, 0);
      const avg = sum / ratingData.user.length;

      const product = await Product.findById(productId[i]);

      if (!product) {
        return res.status(400).json({ message: `Product with ID ${productId[i]} not found in products` });
      }

      product.rating = avg;
      await product.save();

      updatedProducts.push(product);
    }

    return res.status(200).json({ message: "Average ratings updated", data: updatedProducts });
  } catch (error) {
    console.error("Error setting the rating:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

