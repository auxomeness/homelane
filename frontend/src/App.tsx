import { useState } from "react";
import Card from "./components/card";

export default function App() {
  const [saved, setSaved] = useState(false);

  return (
    <div
      style={{
        padding: 24,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
      }}
    >
      {/* 1. No image: should show the placeholder */}
      <Card
        price={8500000}
        title="Three-bedroom home"
        location="Quezon City"
        bedrooms={3}
        bathrooms={2}
        area={145}
        saved={saved}
        onSave={() => setSaved(!saved)}
        onClick={() => alert("card clicked")}
      />

      {/* 2. With an image and a different status */}
      <Card
        image="https://picsum.photos/400/300"
        status="For rent"
        price={25000}
        title="Studio condo near BGC"
        location="Taguig City"
        bedrooms={1}
        bathrooms={1}
        area={28}
      />

      {/* 3. Long text: checks that nothing breaks */}
      <Card
        price={123456789}
        title="Spacious family house with a garden and two-car garage"
        location="Naga City, Camarines Sur"
        bedrooms={5}
        bathrooms={4}
        area={320}
      />
    </div>
  );
}