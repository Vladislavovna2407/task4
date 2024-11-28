import React from "react";
import "./adminPanel.css";
import { useState } from "react";
import { BlockingNotification } from "../blockingNotification/blocking notification";
import { UnblockingNotification } from "../unblockingNotification/unblockingNotification";
import { RemovalNotification } from "../removalNotification/removalNotification";
import { useEffect } from "react";
import { ErrorNotification } from "../errorNotification/errorNotification";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUsers } from "../../Api/Api.js"

export const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [isBlockedOpen, setBlockedOpen] = useState(false);
  const [isUnblockedOpen, setUnblockedOpen] = useState(false);
  const [isRemovalOpen, setRemovalOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [all,setAll] = useState(false)

  const [filter, setFilter] = useState("");
 
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/");
  }


  function handlerAll(){
    setAll(!all);
  }

  function handlerCheck() {
    setIsChecked(!isChecked)
  }

  // function handleAllCheckboxChange(event) {
  //   setIsChecked(event.target.checked);
  // }

  function getSelectedUsers() {
    const ids = Array.from(
      document.querySelectorAll(".select-checkbox-row:checked")
      //  document.querySelectorAll('input[type=checkbox]')
    ).map((x) => +x.id);
    return ids;
  }

  async function applyAction(action) {
    try {
      await updateUsers(action, getSelectedUsers());
    } catch(error){
      console.error(error);
    }
  }

  async function refreshUsersTable() {
    try {
      const users = await getAllUsers();
      setData(users);
    } catch(error){
      console.error(error);
    }
  }

  async function onBlockUsers() {
    if (!isChecked) {
      await applyAction('block');
      setIsChecked(false);
      await refreshUsersTable();
      setBlockedOpen(true);
      setUnblockedOpen(false);
      setRemovalOpen(false);
    }
  }

  async function onUnblockUsers() {
    if (!isChecked) {
      await applyAction('unblock');
      await refreshUsersTable();
      setUnblockedOpen(true);
      setBlockedOpen(false);
      setRemovalOpen(false);
    }
  }

  async function onDeleteUsers() {
    if (!isChecked) {
      await applyAction('delete');
      await refreshUsersTable();
      setRemovalOpen(true);
      setBlockedOpen(false);
      setUnblockedOpen(false);
    }
  }

  useEffect(() => {
    const refresh = async () => await refreshUsersTable();
    refresh().catch(console.error);
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setUnblockedOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [isUnblockedOpen]);

  useEffect(() => {
    if (setBlockedOpen) {
      const timeId = setTimeout(() => {
        setBlockedOpen(false);
      }, 2000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [isBlockedOpen]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setRemovalOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [isRemovalOpen]);

  // const users = [
  //   {
  //     id: "1",
  //     name: "Mark",
  //     email: "@mdo",
  //     lastSeen: "2021-03-20",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "2",
  //     name: "Ira",
  //     email: "@fat",
  //     lastSeen: "2022-10-20",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "3",
  //     name: "Larry",
  //     email: "@twitter",
  //     lastSeen: "2022-11-04",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "4",
  //     name: "Mark",
  //     email: "@mdo",
  //     lastSeen: "2022-03-24",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "5",
  //     name: "Ira",
  //     email: "@fat",
  //     lastSeen: "2024-10-20",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "6",
  //     name: "Larry",
  //     email: "@twitter",
  //     lastSeen: "2021-11-04",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "7",
  //     name: "Mark",
  //     email: "@mdo",
  //     lastSeen: "2023-03-14",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "8",
  //     name: "Ira",
  //     email: "@fat",
  //     lastSeen: "2024-10-26",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "9",
  //     name: "Larry",
  //     email: "@twitter",
  //     lastSeen: "2021-11-03",
  //     state: "unblocked",
  //   },
  //   {
  //     id: "10",
  //     name: "Larry",
  //     email: "@twitter",
  //     lastSeen: "1998-11-03",
  //     state: "unblocked",
  //   },
  // ];

  return (
    <div>
      <div className="flex">
        <div className="col-auto ml-50">
          <button
            type="submit"
            className="btn btn-outline-primary mx-1 mt-3"
            onClick={onBlockUsers}
          >
            <i className="bi bi-lock"></i>Block
          </button>
          <button
            type="submit"
            className="btn btn-outline-primary mx-1 mt-3"
            onClick={onUnblockUsers}
          >
            <i className="bi bi-unlock"></i>
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger mx-1 mt-3"
            onClick={onDeleteUsers}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
        <div className="col-auto w-300 ">
          <label htmlFor="staticFilter" className="visually-hidden">
            Filter
          </label>
          <input
            type="text"
            className="form-control size align"
            id="staticFilter"
            placeholder="Filter..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex flex-row-reverse">
        <div className="col-auto mr-50">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="container position">
        <table className="table table-hover">
          <caption className="caption">Users List</caption>
          <thead>
            <tr>
              <th scope="col">
                <span>
                  <input
                    type="checkbox"
                    // name="checkRow"
                    className="select-checkbox select-checkbox-row"
                    checked={all}
                    onChange={handlerAll}
                    // checked={checkedItems.includes("item0")}
                  />
                </span>
              </th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Last seen</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <label>
                    <input
                      id={user.id}
                      type="checkbox"
                      // name="checkRow"
                      //   checked={checkedItems.includes("item1")}
                      // checked={isChecked}
                      // onChange={handlerCheck}
                      className="select-checkbox select-checkbox-row"
                    />
                  </label>
                </th>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.lastSeen).toLocaleString()}</td>
                {/* <td>{formatLastSeen(user.lastSeen)}</td> */}
                <td>{user.state ? "active" : "blocked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ErrorNotification isOpen={isErrorOpen} />
      <BlockingNotification isOpen={isBlockedOpen} />
      <UnblockingNotification isOpen={isUnblockedOpen} />
      <RemovalNotification isOpen={isRemovalOpen} />
    </div>
  );
};
