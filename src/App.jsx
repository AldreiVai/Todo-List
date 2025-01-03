import { useEffect, useState } from "react";
import supabase from "/utils/supabase.js";
import "./App.css";
import Card from "./Components/Card";
import SweetAlert2 from "react-sweetalert2";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [addName, setName] = useState("");
  const [addDescription, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [swalProps, setSwalProps] = useState({});

  async function getTodos() {
    let updatedTodoList = [];
    const { data: todoList } = await supabase.from("todo").select();
    if (todoList) {
      updatedTodoList = todoList.map((data) => ({
        ...data,
        date: new Date(data.created_at).toDateString(), // Add the new property
      }));
    }
    setTodoList(updatedTodoList);
  }

  useEffect(() => {
    todoList.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
    getTodos();
  }, [todoList]);

  useEffect(() => {
    getTodos();
  }, []);

  async function Delete(todoId) {
    const { error } = await supabase.from("todo").delete().eq("id", todoId);
    if (error) console.log(error);
    setTodoList(todoList.filter((data) => data.id !== todoId));
  }

  async function Add() {
    if (!addName || !addDescription) {
      setSwalProps({
        show: true,
        title: "Unable to Save",
        text: "Name and Description cannot be empty",
        icon: "warning",
        confirmButtonText: "Okay",
      });

      return;
    }

    const { error } = await supabase.from("todo").insert({
      name: addName,
      description: addDescription,
    });
    if (error) console.log(error);

    setName("");
    setDescription("");
  }

  async function Edit(id, editName, editDescription) {
    const { error } = await supabase
      .from("todo")
      .update({
        name: editName,
        description: editDescription,
      })
      .eq("id", id);

    // var dataToEdit = todoList.map((object) =>
    //   object.id === id
    //     ? { ...object, name: editName, description: editDescription }
    //     : object
    // );

    // setTodoList(dataToEdit);
  }

  return (
    <>
      <div className="container-fluid p-4">
        <h1 className="d-flex font-weight-bold justify-content-center mb-3">
          Todo List Bootstrap w/ Supabase
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>Name</label>
              <input
                className="form-control"
                value={addName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label>Description</label>
              <input
                className="form-control"
                value={addDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button className="btn btn-primary" onClick={Add}>
                Add
              </button>
            </div>
          </div>
          {isEmpty && (
            <div className="container">
              <h1 className="d-flex justify-content-center align-items-center">
                There is no current todo
              </h1>
            </div>
          )}

          {!isEmpty && (
            <>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {todoList.map((object, index) => {
                  return (
                    <Card
                      key={index}
                      data={object}
                      handleDelete={Delete}
                      handleEdit={Edit}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </>
  );
}

export default App;
