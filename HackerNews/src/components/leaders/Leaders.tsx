import { useState, useEffect } from "react";
import { leaders } from "./leaders-data";
import { useFavourites } from "../stories/useFavourites";

const Leaders = () => {
  const [loading, setLoading] = useState(true);
  const [leadersData, setLeadersData] = useState([]);
};
