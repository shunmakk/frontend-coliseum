import React from "react";
import { FaFaceDizzy } from "react-icons/fa6";
import { FaFaceFrown } from "react-icons/fa6";
import { FaFaceFrownOpen } from "react-icons/fa6";
import { FaFaceGrin } from "react-icons/fa6";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { FaFaceGrinSquint } from "react-icons/fa6";
import { IconType } from "react-icons";

interface ResultProps {
  score?: number;
}

const ResultFace: React.FC<ResultProps> = ({ score = 0 }) => {
  const getResultFace = (): IconType => {
    if (score === 0) return FaFaceDizzy;
    if (score === 1) return FaFaceFrown;
    if (score === 2) return FaFaceFrownOpen;
    if (score === 3) return FaFaceGrin;
    if (score === 4) return FaFaceGrinBeam;
    return FaFaceGrinSquint;
  };

  const ResultIcon = getResultFace();

  return <ResultIcon size={20} />;
};

export default ResultFace;
