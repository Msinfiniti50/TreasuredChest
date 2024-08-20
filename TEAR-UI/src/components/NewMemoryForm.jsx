import React, { useState, useEffect } from "react";
import { fetchChildren } from '../services/childService';
import { useNavigate } from "react-router-dom";

export const NewMemoryForm = ({ addMemory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isFirst, setIsFirst] = useState("");
    const [childId, setChildId] = useState("");
    const [children, setChildren] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
      const loadChildren = async () => {
        try {
          const childrenData = await fetchChildren();
          setChildren(childrenData);
        } catch (error) {
          console.error("Error fetching children:", error);
        }
      };
      loadChildren();
    }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (description !== "" && title !== "" && file !== null) {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("title", title);
        formData.append("file", file);
        formData.append("isFirst", isFirst);

        try {
          await addMemory(formData, childId);
          setTitle("");
          setDescription("");
          setFile(null);
          setIsFirst(false);
          setChildId('');
          navigate('/memories');
  
        } catch (error) {
          console.error("Error adding memory:", error);
          alert("Failed to add memory.");
        }

        } else {
          alert("Please fill out all fields before submitting.");
        }
    };

    return (
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Title
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Description
              <textarea
                rows={3}
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Image
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Is this a first Memory?
              <input
                        type="checkbox"
                        checked={isFirst}
                        onChange={(e) => setIsFirst(e.target.checked)}
                    />
                    Mark as First
            </label>
            <label className="form-label">Select Child</label>
            <select 
              className="form-control" 
              value={childId} 
              onChange={(e) => setChildId(e.target.value)} 
              required
            >
              <option value="">Select a child</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.firstName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Memory
          </button>
        </form>
      </div>
    );
}; 

