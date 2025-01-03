import { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";

function Card({ data, handleDelete, handleEdit }) {
  const [isInEdit, setIsInEdit] = useState(false);
  const [editName, setEditName] = useState(data?.name);
  const [editDescription, setEditDescription] = useState(data?.description);
  const [swalProps, setSwalProps] = useState({});
  const [deleteDone, setDeleteDone] = useState(false);

  useEffect(() => {
    if (deleteDone) {
      handleDelete(data.id);
    }
  }, [deleteDone]);

  function Delete() {
    setSwalProps({
      show: true,
      title: "Deleted!",
      text: "The item has been successfully deleted.",
      icon: "success",
      confirmButtonText: "Okay",
    });
    setDeleteDone(true);
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            {isInEdit ? (
              <>
                <input
                  className="form-control mb-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  className="form-control mb-3"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleEdit(data.id, editName, editDescription);
                      setIsInEdit(false);
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setIsInEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h5 className="card-title">{data.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{data.date}</h6>
                <p className="card-text">{data.description}</p>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsInEdit(true)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={Delete}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </>
  );
}

export default Card;
