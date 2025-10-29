import React from "react";
function AddLab() {
  return (
    <div>
      Add Lab
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
              <a href="lab_test.html" className="sidebar-link">
                <i className="fa-solid fa-microscope"></i>
                <span className="ms-1">Lab Tests</span>
              </a>
            </li>
            <li className="sidebar-item mb-1">
              <a href="index.html" className="sidebar-link">
                <i className="fa-solid fa-house"></i>
                <span className="ms-1">Home</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            <a href="#" className="sidebar-link">
              <i className="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>
              <span>Logout</span>
            </a>
          </div>
        </aside>
        <div
          id="container"
          className="container d-flex justify-content-center align-items-center min-vh-100"
        >
          <div
            className="border-0 w-100 rounded-5 p-4 shadow box-area"
            style={{ backgroundColor: "#d1d3ab" }}
          >
            <form>
              <div className="mb-3 mt-2">
                <div className="row" style={{ padding: "0px", margin: "0px" }}>
                  <div id="labtest">
                    <h3>
                      <b>Lab Tests:</b>
                    </h3>
                  </div>
                  <div className="col-md-8 mt-2" style={{ padding: "auto" }}>
                    <input
                      type="text"
                      className="form-control h-100"
                      id="recipient-name"
                    />
                  </div>
                  <div className="col-md-4 mt-2" style={{ padding: "auto" }}>
                    <button
                      className="form-control p-3 border-0 rounded-3 w-100"
                      id="medicine-input"
                      placeholder="Enter Medicine"
                      style={{
                        display: "inline",
                        backgroundColor: "#1da453",
                        maxWidth: "100%",
                        color: "bisque",
                      }}
                    >
                      ADD <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div
                    className="table-responsive border-0 rounded-3 mt-2"
                    style={{ maxHeight: "50vh" }}
                  >
                    <table
                      id="table"
                      className="table table-striped p-3 rounded-3"
                    >
                      <thead>
                        <tr className="border-0">
                          <th className="border-0" scope="col">
                            Sr No.
                          </th>
                          <th className="border-0" scope="col">
                            Lab
                          </th>
                          <th className="border-0" scope="col">
                            Added by:
                          </th>
                          <th className="border-0" scope="col">
                            Last Updated
                          </th>
                          <th className="border-0" scope="col">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-0">
                        <tr className="border-0 rounded-3">
                          <td className="border-0">1</td>
                          <td className="border-0">Blood Test</td>
                          <td className="border-0">121</td>
                          <td className="border-0">30-10-2004</td>
                          <td className="border-0" style={{ width: "30%" }}>
                            <div className="btn-container">
                              <button className="btn btn-danger rounded-4 mb-1 mt-1 w-100 edit-button action-button toggle-button">
                                Disable
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-0 rounded-3">
                          <td className="border-0">2</td>
                          <td className="border-0">Urine Test</td>
                          <td className="border-0">122</td>
                          <td className="border-0">31-10-2004</td>
                          <td className="border-0" style={{ width: "30%" }}>
                            <div className="btn-container">
                              <button className="btn btn-danger rounded-4 mb-1 mt-1 w-100 edit-button action-button toggle-button">
                                Disable
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddLab;
