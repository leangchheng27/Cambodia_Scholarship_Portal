import React, { useState, useEffect } from "react";
import "./UniversityList.css";
import { getUniversities } from "../../../../api/universityApi";
import LoadingText from "../../../../components/ui/LoadingText/LoadingText.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { saveItem, unsaveItem, getSavedItems } from "../../../../api/savedApi.js";
import saveIcon from "../../../../assets/Header/save.png";
import { useNavigate } from "react-router-dom";

const UniversityList = ({ onUniversityClick, selectedProvince }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const loadSavedItems = async () => {
      if (!user) {
        setSavedItems([]);
        return;
      }
      try {
        const items = await getSavedItems();
        setSavedItems(items || []);
      } catch (err) {
        console.error("Error loading saved items:", err);
        setSavedItems([]);
      }
    };
    loadSavedItems();
  }, [user]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await getUniversities();
        setUniversities(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Failed to load universities");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filtered = selectedProvince
    ? universities.filter(
        (u) =>
          u.location === selectedProvince || u.province === selectedProvince,
      )
    : universities;

  if (loading)
    return (
      <div className="university-list-container">
        <LoadingText text="Loading universities..." />
      </div>
    );
  if (error)
    return (
      <div className="university-list-container">
        <p className="error">{error}</p>
      </div>
    );

  const handleToggleSave = async (event, university) => {
    event.stopPropagation();

    if (!user) {
      navigate("/login?redirect=/university");
      return;
    }

    const isSaved = savedItems.some(item => item.itemId === String(university.id));
    
    // Optimistic UI update - update immediately
    let newCount;
    if (isSaved) {
      newCount = savedItems.length - 1;
      setSavedItems(savedItems.filter(item => item.itemId !== String(university.id)));
    } else {
      newCount = savedItems.length + 1;
      setSavedItems([...savedItems, {
        itemId: String(university.id),
        itemType: "university",
        title: university.name || "University",
      }]);
    }

    // Dispatch event with count for header and other components
    window.dispatchEvent(new CustomEvent('saved:updated', { detail: { count: newCount } }));

    try {
      if (isSaved) {
        await unsaveItem(String(university.id));
      } else {
        await saveItem({
          itemId: String(university.id),
          itemType: "university",
          title: university.name || "University",
          description: `${university.location || university.province || "N/A"}`,
          image: "",
          detailPath: `/universities/${university.id}`,
        });
      }
    } catch (err) {
      console.error("Error toggling save:", err);
      // Revert optimistic update on error
      const updatedItems = await getSavedItems();
      setSavedItems(updatedItems || []);
    }
  };

  return (
    <div className="university-list-container">
      <table className="university-list-table">
        <thead>
          <tr>
            <th>SCHOOL NAME</th>
            <th>PROVINCE</th>
            <th>CITY</th>
            <th>SAVE</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((university) => (
            <tr
              key={university.id}
              className="clickable-row"
              onClick={() => {
                if (onUniversityClick) {
                  onUniversityClick(university.id);
                }
              }}
            >
              <td>{university.name}</td>
              <td>{university.location || university.province || "N/A"}</td>
              <td>{university.location || "N/A"}</td>
              <td>
                <button
                  type="button"
                  className={`university-save-btn ${savedItems.some(item => item.itemId === String(university.id)) ? "saved" : ""}`}
                  onClick={(event) => handleToggleSave(event, university)}
                  aria-label={
                    savedItems.some(item => item.itemId === String(university.id))
                      ? "Remove university from saved list"
                      : "Save university"
                  }
                >
                  <img src={saveIcon} alt="" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityList;
