import { Link } from "react-router-dom";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

const BackButton = ({ children }) => {
  return (
    <div className="flex flex-col justify-between gap-4 text-white not-dark:text-(--neutral-900)">
      <Link to="/" className="back_button w-fit">
        <IconArrowNarrowLeft size={20} />
        Home
      </Link>

      <h1 className="text-preset-2 text-2xl sm:text-3xl">{children}</h1>
    </div>
  );
};

export default BackButton;
