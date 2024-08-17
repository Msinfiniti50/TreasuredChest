import React, { useState } from "react";

export const NewMemoryForm = ({ addMemory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isFirst, setIsFirst] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (description !== "" && title !== "" && file !== null) {
          const formData = new FormData();
          formData.append("description", description);
          formData.append("title", title);
          formData.append("file", file);
          formData.append("isFirst", isFirst);

          // Log formData to check if everything is appended correctly
          for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
          }

          addMemory(formData);
          setTitle("");
          setDescription("");
          setFile(null);
          setIsFirst(false)
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
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Memory
          </button>
        </form>
      </div>
    );
};
