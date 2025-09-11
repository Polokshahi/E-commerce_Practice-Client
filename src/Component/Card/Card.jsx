import React from "react";

const Card = () => {
  // Create an array of 40 items
  const cards = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {cards?.map((num) => (
        <div
          key={num}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
        >
          <figure>
            <img
              src={`https://picsum.photos/300/200?random=${num}`}
              alt={`Card ${num}`}
              className="rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card {num}</h2>
            <p>This is a description for card number {num}.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">View</button>
              <button className="btn btn-outline btn-sm">Buy</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
