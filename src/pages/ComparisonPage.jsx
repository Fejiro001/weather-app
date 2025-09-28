import { useState } from "react";
import useWeatherStore from "../store/weatherStore";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { BackButton } from "../components/basic";

const ComparisonPage = () => {
  return (
    <main className="main text-white not-dark:text-(--neutral-900)">
      <BackButton>Compare Weather</BackButton>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
    </main>
  );
};

export default ComparisonPage;
