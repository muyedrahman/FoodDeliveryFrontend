"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Clock, Flame, Minus, Plus, Star } from "lucide-react";
import FoodCard from "@/components/shared/FoodCard";
import { getFoodById, getRelatedFoods } from "@/lib/foodData";
import { useCartStore } from "@/store/cartStore";

export default function FoodDetailsPage() {
  const params = useParams<{ id: string }>();
  const food = getFoodById(params.id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  if (!food) {
    notFound();
  }

  const gallery = [food.image, food.image, food.image, food.image];
  const related = getRelatedFoods(food.category, food.id);

  const avgRating = food.rating;

  const handleAddToCart = () => {
    addItem(
      {
        foodId: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
      },
      quantity,
    );
  };

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image gallery */}
        <div>
          <div className="h-80 w-full overflow-hidden rounded-xl md:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[activeImage]}
              alt={food.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-20 overflow-hidden rounded-lg border-2 ${
                  activeImage === i ? "border-[#FF6B35]" : "border-transparent"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${food.name} thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="inline-block rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#FF6B35]">
            {food.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-[#2D3748] dark:text-white">
            {food.name}
          </h1>
          <Link
            href={`/restaurants/${food.restaurantId}`}
            className="mt-1 inline-block text-sm text-gray-500 hover:text-[#FF6B35] dark:text-gray-400"
          >
            by {food.restaurantName}
          </Link>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-[#2D3748] dark:text-white">
                {avgRating}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              ({food.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-[#FF6B35]">
            ৳{food.price}
          </p>

          <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
            {food.description}
          </p>

          {/* Key info */}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#48BB78]" />
              <div>
                <p className="text-xs text-gray-400">Prep Time</p>
                <p className="text-sm font-semibold text-[#2D3748] dark:text-white">
                  {food.prepTimeMinutes} mins
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#FF6B35]" />
              <div>
                <p className="text-xs text-gray-400">Calories</p>
                <p className="text-sm font-semibold text-[#2D3748] dark:text-white">
                  {food.calories} kcal
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-400">Ingredients</p>
              <p className="text-sm font-medium text-[#2D3748] dark:text-white">
                {food.ingredients.join(", ")}
              </p>
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-[#2D3748] dark:text-white"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold text-[#2D3748] dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 text-[#2D3748] dark:text-white"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-xl bg-[#FF6B35] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e85c2a]"
            >
              Add to Cart — ৳{food.price * quantity}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[#2D3748] dark:text-white">
          Reviews
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
          <span className="text-xl font-bold text-[#2D3748] dark:text-white">
            {avgRating}
          </span>
          <span className="text-gray-400">
            out of 5 ({food.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {food.reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2D3748] dark:text-white">
                  {review.reviewerName}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-[#2D3748] dark:text-white">
                    {review.rating}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
              <p className="mt-2 text-xs text-gray-400">{review.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related foods */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#2D3748] dark:text-white">
            You Might Also Like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
