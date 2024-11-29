import React from "react";
import "./adminPanel.css";
import { useState } from "react";
import { BlockingNotification } from "../blockingNotification/blocking notification";
import { UnblockingNotification } from "../unblockingNotification/unblockingNotification";
import { RemovalNotification } from "../removalNotification/removalNotification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUsers } from "../../Api/Api.js"

export const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [isBlockedOpen, setBlockedOpen] = useState(false);
  const [isUnblockedOpen, setUnblockedOpen] = useState(false);
  const [isRemovalOpen, setRemovalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [all,setAll] = useState(false)
  const [filter, setFilter] = useState("");
  const items = data;
  
  const navigate = useNavigate();

  const filteredItems = items.filter(item =>
    item.name && item.name.toLowerCase().includes(filter.toLowerCase())
  );

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

  function getSelectedUsers() {
    const ids = Array.from(
      document.querySelectorAll(".select-checkbox-row:checked")
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
                    className="select-checkbox select-checkbox-row"
                    checked={all}
                    onChange={handlerAll}
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
            {filteredItems.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <label>
                    <input
                      id={user.id}
                      type="checkbox"
                      className="select-checkbox select-checkbox-row"
                    />
                  </label>
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.lastSeen).toLocaleString()}</td>
                <td>{user.state ? "active" : "blocked"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BlockingNotification isOpen={isBlockedOpen} />
      <UnblockingNotification isOpen={isUnblockedOpen} />
      <RemovalNotification isOpen={isRemovalOpen} />
    </div>
  );
};
