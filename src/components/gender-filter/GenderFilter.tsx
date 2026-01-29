import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./genderfilter.scss";
import type { IState } from "../../interfaces/IState";

// Íconos de react-icons
import { FaVenusMars } from "react-icons/fa"; // All
import { FaMale } from "react-icons/fa";      // Male
import { FaFemale } from "react-icons/fa";    // Female
import { setGenderFilter } from "../../reducers/navbarSlice";

const GenderFilter: React.FC = () => {
  const dispatch = useDispatch();
  const {genderFilter} = useSelector((state: IState) => state.navbar);

  const options: ("all" | "male" | "female")[] = [
  "all",
  "male",
  "female"
];
  const icons = {
    all: <FaVenusMars size={20} />,
    male: <FaMale size={20} />,
    female: <FaFemale size={20} />
  };

  const handleClick = () => {
    const currentIndex = options.indexOf(genderFilter);
    const nextIndex = (currentIndex + 1) % options.length;
    dispatch(setGenderFilter(options[nextIndex]));
  };

  return (
    <div
      className={`gender-filter__option active`}
      onClick={handleClick}
    >
      {icons[genderFilter]}
    </div>
  );
};

export default GenderFilter;