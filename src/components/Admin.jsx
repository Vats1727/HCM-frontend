import React from "react";
import "./styles/admin.css";
import { Link } from "react-router-dom";
function Admin() {
  return (
    <div>
      <div className="wrapper">
        <aside id="sidebar">
          <div className="d-flex">
            <button className="toggle-btn" type="button">
              <i className="fa-solid fa-house-chimney-medical mt-3"></i>
              <div className="sidebar-logo">
                <a href="">Ideal Homeo Clinic</a>
              </div>
            </button>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item mb-1">
              <a href="admin.html" className="sidebar-link">
                <i className="fa-solid fa-user"></i>
                <span className="ms-2">Profile</span>
              </a>
            </li>
            <li className="sidebar-item mb-1">
              <a href="add_user.html" className="sidebar-link">
                <i className="fa-solid fa-user-plus"></i>
                <span>Add User</span>
              </a>
            </li>
            <li className="sidebar-item mb-1">
              <a href="#" className="sidebar-link">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  style={{ marginLeft: "-3px" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span style={{ marginLeft: "12px" }}>Role Management</span>
              </a>
            </li>
            <li className="sidebar-item mb-1">
              <Link to="/lab" className="sidebar-link">
                <i className="fa-solid fa-microscope"></i>
                <span className="ms-1">Lab Tests</span>
              </Link>
            </li>
            <li className="sidebar-item mb-1">
              <Link to="/lab" className="sidebar-link">
                <i className="fa-solid fa-house"></i>
                <span className="ms-1">Home</span>
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer">
            <a href="#" className="sidebar-link">
              <i className="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>
              <span>Logout</span>
            </a>
          </div>
        </aside>
        <div className="main p-3">
          <div className="text-center">
            <h1 className="mt-3">Admin Page</h1>
          </div>
          <div className="bg-white mx-3 rounded-3 text-align-center p-3 fs-6 mt-3">
            <div className="table-responsive">
              <table id="table" className="table table-striped p-3">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Umang Hirani</td>
                    <td>Doctor</td>
                    <td>7984940336</td>
                    <td>
                      <div className="btn-container">
                        <button
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 edit-button action-button"
                          style={{ backgroundColor: "#d1d3ab" }}
                        >
                          <span id="tooltiptext">Edit</span>
                          <i className="fa-solid fa-pen-to-square ms-2"></i>
                        </button>
                        <a
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 add-button action-button"
                          href=""
                          style={{ backgroundColor: "#0b6e4f", color: "white" }}
                        >
                          <span id="tooltiptext">Delete</span>
                          <i className="fa-solid fa-trash ms-2"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Aryan Mahida</td>
                    <td>Doctor</td>
                    <td>9030620245</td>
                    <td>
                      <div className="btn-container">
                        <button
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 edit-button action-button"
                          style={{ backgroundColor: "#d1d3ab" }}
                        >
                          <span id="tooltiptext">Edit</span>
                          <i className="fa-solid fa-pen-to-square ms-2"></i>
                        </button>
                        <a
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 add-button action-button"
                          href=""
                          style={{ backgroundColor: "#0b6e4f", color: "white" }}
                        >
                          <span id="tooltiptext">Delete</span>
                          <i className="fa-solid fa-trash ms-2"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Rishit Rathod</td>
                    <td>Doctor</td>
                    <td>9590284822</td>
                    <td>
                      <div className="btn-container">
                        <button
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 edit-button action-button"
                          style={{ backgroundColor: "#d1d3ab" }}
                        >
                          <span id="tooltiptext">Edit</span>
                          <i className="fa-solid fa-pen-to-square ms-2"></i>
                        </button>
                        <a
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 add-button action-button"
                          href=""
                          style={{ backgroundColor: "#0b6e4f", color: "white" }}
                        >
                          <span id="tooltiptext">Delete</span>
                          <i className="fa-solid fa-trash ms-2"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Kirtan Makwana</td>
                    <td>Doctor</td>
                    <td>9437292302</td>
                    <td>
                      <div className="btn-container">
                        <button
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 edit-button action-button"
                          style={{ backgroundColor: "#d1d3ab" }}
                        >
                          <span id="tooltiptext">Edit</span>
                          <i className="fa-solid fa-pen-to-square ms-2"></i>
                        </button>
                        <a
                          id="tooltip"
                          className="btn rounded-4 mb-1 mt-1 add-button action-button"
                          href=""
                          style={{ backgroundColor: "#0b6e4f", color: "white" }}
                        >
                          <span id="tooltiptext">Delete</span>
                          <i className="fa-solid fa-trash ms-2"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
