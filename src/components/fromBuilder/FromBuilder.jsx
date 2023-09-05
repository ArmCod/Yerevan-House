import React from "react";
import "./fromBuilder.css";
import Card from "../card/Card";
import cardImg from "../../assets/images/cardImg.png";

export default function FromBuilder() {
  const data = [
    {
      id: 1,
      stap: true,
      img: cardImg,
      category: " ԲՆԱԿԱՐԱՆ",
      location: "Փոքր կենտրոնում",
      price: "97 000",
      views: 30,
      footage: 70,
      rooms: 3,
      floor: 2,
    },
    {
      id: 2,
      stap: true,
      img: cardImg,
      category: " ԲՆԱԿԱՐԱՆ 1",
      location: "Փոքր կենտրոնում 1",
      price: "38 000",
      views: 56,
      footage: 90,
      rooms: 4,
      floor: 1,
    },
    {
      id: 3,
      stap: true,
      img: cardImg,
      category: " ԲՆԱԿԱՐԱՆ 2",
      location: "Փոքր կենտրոնում 2",
      price: "69 000",
      views: 6,
      footage: 56,
      rooms: 2,
      floor: 3,
    },
    {
      id: 4,
      stap: true,
      img: cardImg,
      category: " ԲՆԱԿԱՐԱՆ 3",
      location: "Փոքր կենտրոնում 3",
      price: "12 000",
      views: 90,
      footage: 36,
      rooms: 5,
      floor: 89,
    },
  ];

  return (
    <div className="from-builder">
      <div className="titileBox">
        <h1>ԿԱՌՈՒՑԱՊԱՏՈՂԻՑ</h1>
      </div>
      <div className="cardBox">
        {data?.map(
          ({
            id,
            stap,
            img,
            category,
            location,
            price,
            views,
            footage,
            rooms,
            floor,
          }) => {
            return (
              <Card
                key={id}
                stap={stap}
                image={img}
                category={category}
                location={location}
                price={price}
                views={views}
                footage={footage}
                rooms={rooms}
                floor={floor}
                path={id}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
