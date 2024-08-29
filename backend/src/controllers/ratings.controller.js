import Product from "../models/product.model.js";
import Rating from "../models/ratings.model.js";

export const setRatingForAProduct = async (req, res) => {
  try {
    const { productId, userId, value } = req.body; // Correctly access req.body

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
    const { productId } = req.body;

    const findTheProduct = await Rating.findOne({ product: productId });

    if (!findTheProduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    const sum = findTheProduct.value.reduce((acc, curr) => acc + curr, 0);

    const avg = sum / findTheProduct.user.length;


    const findProduct = await Product.findById(productId);

   
    findProduct.rating = avg;

    await findProduct.save();

    return res.status(200).json({ message: "Average rating updated", data: findProduct });
  } catch (error) {
    console.error("Error setting the rating:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
