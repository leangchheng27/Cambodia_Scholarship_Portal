import React, { useState, useEffect } from "react";
import "./UniversityList.css";
import { getUniversities } from "../../../../api/universityApi";
import LoadingText from "../../../../components/ui/LoadingText/LoadingText.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import {
  saveItem,
  unsaveItem,
  getSavedItems,
} from "../../../../api/savedApi.js";
import saveIcon from "../../../../assets/Header/save.png";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";

const UniversityList = ({ onUniversityClick, selectedProvince }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadSaved = async () => {
      if (!user) return;
      try {
        const items = await getSavedItems();
        setSavedIds(new Set(items.map((item) => item.itemId)));
      } catch (err) {
        console.error("Failed to load saved items:", err);
      }
    };
    loadSaved();
  }, [user]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await getUniversities(search); // ✅ pass search
        setUniversities(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Failed to load universities");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => fetchUniversities(), 300);
    return () => clearTimeout(debounceTimer);
  }, [search]); // ✅ re-fetch on search change

  const filtered = selectedProvince
    ? universities.filter(
        (u) =>
          u.location === selectedProvince || u.province === selectedProvince,
      )
    : universities;

  const handleToggleSave = async (event, university) => {
    event.stopPropagation();
    if (!user) {
      navigate("/login?redirect=/university");
      return;
    }

    const itemId = String(university.id);
    const isSaved = savedIds.has(itemId);

    // ✅ optimistic update — update UI immediately
    if (isSaved) {
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    } else {
      setSavedIds((prev) => new Set([...prev, itemId]));
    }

    // ✅ dispatch event for header
    window.dispatchEvent(
      new CustomEvent("saved:updated", {
        detail: { action: isSaved ? "decrement" : "increment" },
      }),
    );

    try {
      if (isSaved) {
        await unsaveItem(itemId);
      } else {
        await saveItem({
          itemId,
          itemType: "university",
          title: university.name || "University",
          description: `${university.location || university.province || "N/A"} • ${university.location || "N/A"}`,
          image: "",
          detailPath: `/universities/${university.id}`,
        });
      }
    } catch (err) {
      console.error("Failed to toggle save:", err);
      // ✅ revert on error
      if (isSaved) {
        setSavedIds((prev) => new Set([...prev, itemId]));
      } else {
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
      }
    }
  };

  return (
    <>
      <SearchInput
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search"
      />
      <div className="university-list-container">
        {loading ? (
          <LoadingText text="Loading universities..." />
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
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
                    if (onUniversityClick) onUniversityClick(university.id);
                  }}
                >
                  <td>{university.name}</td>
                  <td>{university.location || university.province || "N/A"}</td>
                  <td>{university.location || "N/A"}</td>
                  <td>
                    <button
                      type="button"
                      className={`university-save-btn ${savedIds.has(String(university.id)) ? "saved" : ""}`}
                      onClick={(event) => handleToggleSave(event, university)}
                      aria-label={
                        savedIds.has(String(university.id))
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
        )}
      </div>
    </>
  );
};

export default UniversityList;
