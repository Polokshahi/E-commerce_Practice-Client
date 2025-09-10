import { useState, useEffect } from "react";

const slides = [
  "https://i.ibb.co.com/0pMWzrfT/sofa.jpg",
  "https://i.ibb.co.com/pvRS1pVW/watch.jpg",
  "https://i.ibb.co.com/JFGYnZWw/head-Phone.jpg"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel w-full relative">
      <img src={slides[current]} className="w-full" />

      {/* Navigation Buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
        <button
          onClick={() =>
            setCurrent((current - 1 + slides.length) % slides.length)
          }
          className="btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="btn btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Banner;
