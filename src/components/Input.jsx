import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import account from "./Images And Icons/admin.png";

import "./styles/nav-styles.css";
import "./styles/details.css";
// import   {  useRef } from 'react';

const MyComponent = () => {
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    const dateCheckupElement = document.getElementById("date-checkup");

    if (dateCheckupElement) {
      const updateValue = () => {
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = dateCheckupElement.value;
        }
      };

      // Initial value set
      updateValue();

      // Event listener for input changes
      dateCheckupElement.addEventListener("input", updateValue);

      // Cleanup event listener on unmount
      return () => {
        dateCheckupElement.removeEventListener("input", updateValue);
      };
    }
  }, []);

  return (
    <div>
      <input
        type="hidden"
        id="date"
        ref={hiddenInputRef}
        className="form-control border-0"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        placeholder="Enter Date"
        readOnly
      />
      <input type="text" id="date-checkup" placeholder="Enter Date Checkup" />
    </div>
  );
};

// export default MyComponent;

function Input() {
  // import axios from 'axios';

  const [caseno, setCaseno] = useState(null);
  const [l_id, setL_id] = useState(null);

  const [dateValue, setDateValue] = useState("");
  const dateCheckupRef = useRef(null);

  useEffect(() => {
    // Function to update dateValue from the date-checkup element
    const updateDateValue = () => {
      const dateCheckupElement = document.getElementById("date-checkup");
      if (dateCheckupElement) {
        setDateValue(dateCheckupElement.value);
      }
    };

    // Initial update when component mounts
    updateDateValue();

    // Add event listener to update dateValue when date-checkup changes
    if (dateCheckupRef.current) {
      dateCheckupRef.current.addEventListener("input", updateDateValue);
    }

    // Clean up event listener on unmount
    return () => {
      if (dateCheckupRef.current) {
        dateCheckupRef.current.removeEventListener("input", updateDateValue);
      }
    };
  }, []);

  useEffect(() => {
    // Legacy jQuery-based left-to-be-paid calculation removed.
    // Use React state (presentAmt, paidAmt) and derived leftAmt instead.
    // This effect intentionally left empty; calculation is handled by React state below.
    return undefined;
  }, []);

  // Use React state for payment inputs instead of jQuery
  const [presentAmt, setPresentAmt] = useState("");
  const [paidAmt, setPaidAmt] = useState("");
  const [prevAmtDisplayState, setPrevAmtDisplayState] = useState(0);
  const [leftAmtDisplay, setLeftAmtDisplay] = useState(0);

  // Derive left amount whenever related values change
  // (Moved below so paymentData is declared before use)

  const [activeTab, setActiveTab] = useState("personal");
  const [activeRightTab, setActiveRightTab] = useState("home2");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleRightTabChange = (tabName) => {
    setActiveRightTab(tabName);
  };

  const [labFields, setLabFields] = useState([
    { test: "", date: "", remarks: "", file: null },
  ]);
  const [isEditable, setIsEditable] = useState(true);

  const savelab = () => {
    setIsEditable(!isEditable);
  };
  const addlab = () => {
    setLabFields([
      ...labFields,
      { test: "", date: "", remarks: "", file: null },
    ]);
  };

  const deletelab = (index) => {
    if (labFields.length > 1) {
      const newLabFields = labFields.filter((_, i) => i !== index);
      setLabFields(newLabFields);
    }
  };

  const handleLabFieldChange = (index, field, value) => {
    const newLabFields = [...labFields];
    newLabFields[index][field] = value;
    setLabFields(newLabFields);
  };

  const [medicineFields, setMedicineFields] = useState([
    { medicine: "", dose: "" },
  ]);
  const [Editable, setEditable] = useState(true);

  const addMedicine = () => {
    setMedicineFields([...medicineFields, { medicine: "", dose: "" }]);
  };
  const deleteMedicine = (index) => {
    if (medicineFields.length > 1) {
      const newMedicineFields = medicineFields.filter((_, i) => i !== index);
      setMedicineFields(newMedicineFields);
    }
  };

  const handleMedicineFieldChange = (index, field, value) => {
    const newMedicineFields = [...medicineFields];
    newMedicineFields[index][field] = value;
    setMedicineFields(newMedicineFields);
  };

  const contentStyle = {
    maxHeight: "70vh",
    overflowY: "scroll",
    overflowX: "hidden",
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
    WebkitOverflowScrolling: "touch" /* iOS Safari */,
  };

  async function PushData(val) {
    const form = document.getElementById(val);
    const formData = new FormData(form);

    // Ensure a date is provided: if the form didn't include one, add today's date (YYYY-MM-DD)
    try {
      if (!formData.has("date") || !formData.get("date")) {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        formData.append("date", today);
      }
    } catch (e) {
      // ignore if FormData isn't available or any other issue
    }

    // Log the form data for debugging
    // Add the action to the form data
    formData.append("action", "insert");

     if (!formData.has("date") || !formData.get("date")) {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    formData.append("date", today);
  }

    // Normal behavior: post to action endpoint which performs real insert on the server.
    const endpoint = "http://localhost:3000/api/action";

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData, // Send the form data directly
    });

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.status) {
        setL_id(result.data.lastInsertedId);
        setCaseno(result.data.lastInsertedId);
        document.getElementById("case_no").value = result.data.lastInsertedId;
        console.log(result.data.lastInsertedId);
        console.log("doc tag", document.getElementById("case_no").value);
      } else if (val === 'personal1' && result && (result.body || result.files)) {
        // We posted to the debug echo endpoint — show what the server received.
        console.log('Debug echo response (server received):', result);
        alert('Debug response received. Check console for details.');
      } else {
        console.error("Error: ", result && result.message ? result.message : result);
      }
    } catch (error) {
      console.error("Failed to parse JSON response: ", responseText);
    }
  }

  // async function PushLabData(val) {
  //   if (!l_id || !caseno) {
  //     console.error("Error: caseno or l_id is not set.");
  //     return;
  //   }

  //   const form = document.getElementById(val);
  //   const formData = new FormData(form);
  //   const lastInsertedId = caseno || l_id;
  //   console.log(lastInsertedId);

  //   const formDataObj = {
  //     lab: [],
  //     dt: [],
  //     remarks: [],
  //     file: [],
  //   };

  //   formData.forEach((value, key) => {
  //     if (key.startsWith("lab[")) {
  //       formDataObj.lab.push(value);
  //     } else if (key.startsWith("dt[")) {
  //       formDataObj.dt.push(value);
  //     } else if (key.startsWith("remarks[")) {
  //       formDataObj.remarks.push(value);
  //     } else if (key.startsWith("file[")) {
  //       formDataObj.file.push(value);
  //     }
  //   });

  //   formDataObj.caseno = caseno || l_id;
  //   console.log(formDataObj);

  //   const response = await fetch(
  //     "http://localhost/HCM-React/hcm-php/action.php",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ data: formDataObj, action: "insert_lab" }),
  //     }
  //   );

  //   const responseText = await response.text();
  //   try {
  //     const result = JSON.parse(responseText);
  //     if (result.status) {
  //       console.log("Lab data inserted successfully.");
  //     } else {
  //       console.error("Error: ", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse JSON response: ", responseText);
  //   }
  // }

  const [message, setMessage] = useState("");
  const [paymentData, setPaymentData] = useState({
    present_amt: "",
    paid_amt: "",
    future_amt: "",
    prev_amt: "",
  });

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/payment/${caseno}`
        );
        const data = await response.json();

        if (data.error) {
          setMessage(data.error);
        } else {
          setPaymentData(data);
        }
      } catch (error) {
        setMessage("Failed to fetch payment data");
      }
    };

    fetchPaymentData();
  }, [caseno]);

  // Derive left amount whenever related values change
  useEffect(() => {
    const prev = (() => {
      try {
        if (!paymentData) return 0;
        if (Array.isArray(paymentData) && paymentData.length > 0)
          return Number(paymentData[0].prev_amt) || 0;
        if (paymentData.prev_amt !== undefined) return Number(paymentData.prev_amt) || 0;
        return 0;
      } catch (e) {
        return 0;
      }
    })();
    setPrevAmtDisplayState(prev);

    const p = parseFloat(presentAmt) || 0;
    const paid = parseFloat(paidAmt) || 0;
    const left = prev + p - paid;
    setLeftAmtDisplay(left);
  }, [presentAmt, paidAmt, paymentData]);

  const [labData, setLabData] = useState([]);
  const [prescriptionsData, setPrescriptionsData] = useState([]);
  const [checkupsData, setCheckupsData] = useState([]);

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/lab/${caseno}`
        );
        const data = await response.json();
        console.log("Fetched data:", data.data);

        if (data.error) {
          setMessage(data.error);
        } else {
          // const LA1 = Object.entries(data.data);
          // console.table("LA1", LA1);
          const newData = data.data;
          console.log(newData);
          // const labArray = Array.isArray(data.data) ? data : [data.data];
          setLabData(newData);
          // console.log("in the fetch array", labArray);
          // console.log("in the fetch func", labData);
          lab_table(newData);
        }
      } catch (error) {
        setMessage("Failed to fetch lab data");
      }
    };

    fetchLabData();
  }, [caseno]);

  

  const fetchLabData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/lab/${caseno}`
      );
      const data = await response.json();
      console.log("Fetched data:", data.data);

      if (data.error) {
        setMessage(data.error);
      } else {
        // const LA1 = Object.entries(data.data);
        // console.table("LA1", LA1);
        const newData = data.data;
        console.log(newData);
        // const labArray = Array.isArray(data.data) ? data : [data.data];
        setLabData(newData);
        // console.log("in the fetch array", labArray);
        // console.log("in the fetch func", labData);
        lab_table(newData);
      }
    } catch (error) {
      setMessage("Failed to fetch lab data");
    }
  };

  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/lab/${caseno}`
        );
        const data = await response.json();
        console.log("Fetched data:", data.data);

        if (data.error) {
          setMessage(data.error);
        } else {
          // const LA1 = Object.entries(data.data);
          // console.table("LA1", LA1);
          const newData = data.data;
          console.log(newData);
          // const labArray = Array.isArray(data.data) ? data : [data.data];
          setLabData(newData);
          // console.log("in the fetch array", labArray);
          // console.log("in the fetch func", labData);
          lab_table(newData);
        }
      } catch (error) {
        setMessage("Failed to fetch lab data");
      }
    };

    fetchLabData();
  }, [caseno]);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payment/${caseno}`
      );
      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setPaymentData(data.data);
        payment_table(data.data);
      }
    } catch (error) {
      setMessage("Failed to fetch payment data");
    }
  };

  const payment_table = (paymentData) => {
    const tbody = document.getElementById("table-pay");
    tbody.innerHTML = ""; // Clear existing rows
    console.log("payment_table data:", paymentData);

    if (paymentData.length > 0) {
      let rows = "";
      paymentData.forEach((pay, index) => {
        rows += `
          <tr key="${index}">
            <td>${pay.caseno}</td>
            <td>${pay.present_amt}</td>
            <td>${pay.paid_amt}</td>
            <td>${pay.future_amt}</td>
            
          </tr>
        `;
      });

      tbody.innerHTML = rows;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colSpan="4">No lab data available</td>
        </tr>
      `;
    }
  };

  async function PushLabData(val) {
    if (!l_id || !caseno) {
      console.error("Error: caseno or l_id is not set.");
      return;
    }

    const form = document.getElementById(val);
    const formData = new FormData(form);
    const lastInsertedId = caseno || l_id;
    console.log(lastInsertedId);

    // Append the caseno to the form data
    formData.append("caseno", lastInsertedId);
    formData.append("action", "insert_lab");

    const response = await fetch(
      "http://localhost:3000/api/action",
      {
        method: "POST",
        body: formData, // Send the form data directly
      }
    );

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.status) {
        console.log("Lab data inserted successfully.");
        fetchLabData();
      } else {
        console.error("Error: ", result.message);
      }
    } catch (error) {
      console.error("Failed to parse JSON response: ", responseText);
    }
  }

  const lab_table = (labData) => {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = ""; // Clear existing rows
    console.log("lab_table data:", labData);

    if (labData.length > 0) {
      let rows = "";
      labData.forEach((lab, index) => {
        rows += `
          <tr key="${index}">
            <td>${lab.caseno}</td>
            <td>${lab.date}</td>
            <td>${lab.lab}</td>
            <td>${lab.remarks}</td>
            <td>
              ${
                lab.file
                  ? `<a href="../${lab.file}" target="_blank" rel="noopener noreferrer">View File</a>`
                  : "No file"
              }
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = rows;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colSpan="5">No lab data available</td>
        </tr>
      `;
    }
  };

  // Fetch prescriptions for the current caseno
  const fetchPrescriptions = async () => {
    try {
      if (!caseno) return;
      const resp = await fetch(`http://localhost:3000/api/lab/${caseno}/prescriptions`);
      const json = await resp.json();
      if (json && Array.isArray(json.data)) setPrescriptionsData(json.data);
      else setPrescriptionsData([]);
    } catch (err) {
      console.error('Failed to fetch prescriptions', err);
      setPrescriptionsData([]);
    }
  };

  // Fetch checkups for the current caseno
  const fetchCheckups = async () => {
    try {
      if (!caseno) return;
      const resp = await fetch(`http://localhost:3000/api/lab/${caseno}/checkup`);
      const json = await resp.json();
      if (json && Array.isArray(json.data)) setCheckupsData(json.data);
      else setCheckupsData([]);
    } catch (err) {
      console.error('Failed to fetch checkups', err);
      setCheckupsData([]);
    }
  };

  // When caseno is set (after initial insert), fetch prescriptions and checkups so the right-side panels show previous entries
  useEffect(() => {
    if (!caseno) return;
    // these functions are defined above in the file scope
    fetchPrescriptions();
    fetchCheckups();
    // refresh lab and payment as well (functions exist in scope)
    try { fetchLabData(); } catch (e) { /* ignore */ }
    try { fetchPaymentData(); } catch (e) { /* ignore */ }
  }, [caseno]);

  async function PushCheckupData(val) {
    if (!l_id || !caseno) {
      console.error("Error: caseno or l_id is not set.");
      return;
    }

    const form = document.getElementById(val);
    const formData = new FormData(form);
    const lastInsertedId = caseno || l_id;
    console.log(lastInsertedId);

    // Add the caseno to the form data
    formData.append("caseno", lastInsertedId);
    formData.append("action", "insert_checkup");

    const response = await fetch("http://localhost:3000/api/action", {
      method: "POST",
      body: formData,
    });

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.status) {
        console.log("Checkup data inserted successfully.");
        // refresh checkups list so UI shows the new rows
        try { fetchCheckups(); } catch (e) { console.warn('fetchCheckups failed', e); }
      } else {
        console.error("Error: ", result.message);
      }
    } catch (error) {
      console.error("Failed to parse JSON response: ", responseText);
    }
  }

  async function PushPrescription(val) {
    if (!l_id || !caseno) {
      console.error("Error: caseno or l_id is not set.");
      return;
    }

    const form = document.getElementById(val);
    const formData = new FormData(form);
    const lastInsertedId = caseno || l_id;
    console.log(lastInsertedId);

    const formDataObj = {
      medicine: [],
      dose: [],
      date: [],
    };

    formData.forEach((value, key) => {
      if (key === 'medicine[]' || key.startsWith('medicine')) {
        formDataObj.medicine.push(value);
      } else if (key === 'dose[]' || key.startsWith('dose')) {
        formDataObj.dose.push(value);
      } else if (key === 'date') {
        formDataObj.date.push(value);
      }
    });

    // If date array is empty and a date field exists in the form, use that date for each medicine
    if ((!formDataObj.date || formDataObj.date.length === 0) && formData.get('date')) {
      const d = formData.get('date');
      formDataObj.date = formDataObj.medicine.map(() => d);
    }

    formDataObj.caseno = caseno || l_id;
    console.log(formDataObj);

    const response = await fetch("http://localhost:3000/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: formDataObj,
        action: "insert_prescription",
      }),
    });

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.status) {
        console.log("Prescription data inserted successfully.");
        // refresh prescriptions list so UI shows the new rows
        try { fetchPrescriptions(); } catch (e) { console.warn('fetchPrescriptions failed', e); }
      } else {
        console.error("Error: ", result.message);
      }
    } catch (error) {
      console.error("Failed to parse JSON response: ", responseText);
    }
  }

  async function PushPayment(val) {
    if (!l_id || !caseno) {
      console.error("Error: caseno or l_id is not set.");
      return;
    }

    const form = document.getElementById(val);
    const formData = new FormData(form);
    const lastInsertedId = caseno || l_id;
    console.log(lastInsertedId);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    formDataObj.caseno = lastInsertedId;

    const response = await fetch("http://localhost:3000/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: formDataObj,
        action: "insert_payment",
      }),
    });

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.status) {
        console.log("Payment data inserted successfully.");
        fetchPaymentData();
      } else {
        console.error("Error: ", result.message);
      }
    } catch (error) {
      console.error("Failed to parse JSON response: ", responseText);
    }
  }

  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setName("Patient Name");
    } else {
      setName(e.target.value);
    }
  };

  useEffect(() => {
    setName("Patient Name");
    document.getElementById("name-value").value = "";
  }, []);

  async function UpdateData(val) {
    const form = document.getElementById(val);
    const formData = new FormData(form);

    const formDataObj = {};
    formData.forEach((value, key) => {
      if (key === "mind[]") {
        if (!formDataObj[key]) {
          formDataObj[key] = [];
        }
        formDataObj[key].push(value);
      } else {
        formDataObj[key] = value;
      }
    });
    if (formDataObj["mind[]"]) {
      formDataObj["mind"] = formDataObj["mind[]"];
      delete formDataObj["mind[]"];
    }
    console.log(l_id);
    console.log(formDataObj);

    const response = await fetch("http://localhost:3000/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: formDataObj, action: "update", id: l_id }),
    });

    const responseText = await response.text();
    try {
      const result = JSON.parse(responseText);
      if (result.status) {
        console.log(result);
      } else {
        console.error("Error: ", result.message);
      }
    } catch (error) {
      console.error("Failed to parse JSON response: ", responseText);
    }
  }

  return (
    <div style={{ backgroundColor: "#0b6e4f" }}>
      <form>
        <input type="hidden" name="case_no" id="case_no" value="" />
      </form>
      <div className="">
        <div className="row p-3" style={{ padding: "0px", margin: "auto" }}>
          <div className="col-md-7 p-2" style={{ padding: "0px" }}>
            <div
              className="p-2 rounded-3"
              style={{ backgroundColor: "#ffffff" }}
            >
              <ul className="nav rounded-3 mb-2">
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item active"
                    data-bs-toggle="tab"
                    href="#personal"
                  >
                    Personal Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#history"
                    id="history-anchor"
                  >
                    Patient History
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#measurements"
                    id="measurements-anchor"
                  >
                    Measurements
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#mind"
                    id="mind-anchor"
                  >
                    Mind
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#observations"
                    id="observations-anchor"
                  >
                    General Observations
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#vitals"
                    id="vitals-anchor"
                  >
                    Vitals
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#symptoms"
                    id="symptoms-anchor"
                  >
                    Symptoms and Conditions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link left-nav-item"
                    data-bs-toggle="tab"
                    href="#lab"
                    id="lab-anchor"
                  >
                    Lab Tests
                  </a>
                </li>
              </ul>

              <div
                className="w-100"
                style={{
                  backgroundColor: "#0b6e4f",
                  color: "white",
                  maxHeight: "1px",
                }}
              >
                .
              </div>

              <div
                className="tab-content p-3"
                id="content"
                style={{
                  maxHeight: "80vh",
                  overflowY: "scroll",
                  contentStyle,
                }}
              >
                <div id="personal" className="tab-pane fade show active">
                  <form id="personal1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Personal Details</h3>
                      <button
                        type="button"
                        id="save-button-to-personalhistory"
                        className="btn btn-success save-button"
                        data-tab-id="personal"
                        value="personal1"
                        onClick={(e) => {
                          e.preventDefault();
                          PushData(e.target.value);
                          document.getElementById("history-anchor").click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    {/* Rest of personal details form */}
                    <div id="content">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name-value"
                          placeholder="name"
                          name="name"
                          value={name === "Patient Name" ? "" : name}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label htmlFor="gender">Gender</label>
                              <br />
                              <div className="">
                                <div
                                  className="inline  p-2"
                                  style={{ display: "inline" }}
                                >
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    className="custom-control-input"
                                    value="male"
                                  />
                                  <label
                                    className="custom-control-label p-1"
                                    htmlFor="male"
                                  >
                                    Male
                                  </label>
                                </div>
                                <div
                                  className="inline  p-2"
                                  style={{ display: "inline" }}
                                >
                                  <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    className="custom-control-input"
                                    value="female"
                                  />
                                  <label
                                    className="custom-control-label p-1"
                                    htmlFor="female"
                                  >
                                    Female
                                  </label>
                                </div>
                                <div
                                  className="inline p-2 "
                                  style={{ display: "inline" }}
                                >
                                  <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    className="custom-control-input"
                                    value="other"
                                  />
                                  <label
                                    className="custom-control-label p-1"
                                    htmlFor="other"
                                  >
                                    Other
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="age"
                                placeholder="age"
                                name="age"
                              />
                              <label htmlFor="age">Age</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-floating mb-3">
                              <input
                                type="date"
                                className="form-control"
                                id="date"
                                placeholder="date"
                                name="dob"
                              />
                              <label htmlFor="date">Date</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-floating mb-3">
                            <select
                              className="form-select"
                              id="marital"
                              aria-label="Marital Status"
                              name="marital"
                            >
                              <option selected>Select</option>
                              <option value="married">Married</option>
                              <option value="unmarried">Unmarried</option>
                              <option value="divorced">Divorced</option>
                              <option value="widow">Widow</option>
                            </select>
                            <label htmlFor="marital">Marital Status</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="complexion"
                              name="complexion"
                              placeholder="Complexion"
                            />
                            <label htmlFor="complexion">Complexion</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="constitution"
                              placeholder="constitution"
                              name="constitution"
                            />
                            <label htmlFor="constitution">Constitution</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Enter address"
                          id="address"
                          name="address"
                        ></textarea>
                        <label htmlFor="address">Address</label>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="contact"
                              placeholder="contact"
                              name="mobile"
                            />
                            <label htmlFor="contact">Contact</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="occupation"
                              placeholder="occupation"
                              name="occupation"
                            />
                            <label htmlFor="occupation">Occupation</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="child"
                              placeholder="child"
                              name="child"
                            />
                            <label htmlFor="child">Child</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="photo">Patient Image (Optional)</label>
                        <input
                          type="file"
                          className="form-control"
                          id="photo"
                          name="photo"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div id="history" className="tab-pane fade">
                  <form action="" id="history1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>History</h3>
                      <button
                        value="history1"
                        type="button"
                        className="btn btn-success save-button"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateData(e.target.value);
                          document
                            .getElementById("measurements-anchor")
                            .click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    {/* Rest of history form */}
                    <div id="content">
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "13vh" }}
                          placeholder="Past History"
                          id="past"
                          name="past"
                        ></textarea>
                        <label htmlFor="past">Past History</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "13vh" }}
                          placeholder="Family History"
                          id="family"
                          name="family"
                        ></textarea>
                        <label htmlFor="family">Family History</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "13vh" }}
                          placeholder="Present Complain"
                          id="present"
                          name="present"
                        ></textarea>
                        <label htmlFor="present">Present Complain</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "13vh" }}
                          placeholder="disease"
                          id="disease"
                          name="disease"
                        ></textarea>
                        <label htmlFor="disease">
                          Suffering from other disease
                        </label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "13vh" }}
                          placeholder="cause"
                          id="cause"
                          name="cause"
                        ></textarea>
                        <label htmlFor="cause">Cause of Disease if any</label>
                      </div>
                    </div>
                  </form>
                </div>
                <div id="measurements" className="tab-pane fade">
                  <form action="" id="measurements1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Measurements</h3>
                      <button
                        value="measurements1"
                        type="button"
                        className="btn btn-success save-button"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateData(e.target.value);
                          document.getElementById("mind-anchor").click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    {/* Rest of measurements form */}
                    <div id="content">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="height"
                              name="height"
                              placeholder="height"
                            />
                            <label htmlFor="height">Height (in Meters)</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="weight"
                              name="weight"
                              placeholder="weight"
                            />
                            <label htmlFor="weight">Weight (in Kgs)</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="temperature"
                              placeholder="temperature"
                              name="temperature"
                            />
                            <label htmlFor="temperature">
                              Temperature (Fahrenheit)
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="pulse"
                              placeholder="pulse"
                              name="pulse"
                            />
                            <label htmlFor="pulse">Pulse</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group mb-3">
                            <div className="form-floating">
                              <input
                                type="number"
                                className="form-control"
                                id="systolic"
                                placeholder="Systolic"
                                name="systolic"
                              />
                              <label htmlFor="systolic">Systolic (mm Hg)</label>
                            </div>
                            <span
                              className="input-group-text"
                              style={{
                                backgroundColor: "white",
                                color: "black",
                              }}
                            >
                              /
                            </span>
                            <div className="form-floating">
                              <input
                                type="number"
                                className="form-control"
                                id="diastolic"
                                placeholder="Diastolic"
                                name="diastolic"
                              />
                              <label htmlFor="diastolic">
                                Diastolic (mm Hg)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div id="mind" className="tab-pane fade">
                  <form action="" id="mind1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Mind</h3>
                      <button
                        value="mind1"
                        type="button"
                        id="mind-save"
                        className="btn btn-success save-button"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateData(e.target.value);
                          // document
                          //   .getElementById("mind-save")
                          //   .addEventListener("click", function () {
                          //     document
                          //       .getElementById("observations-anchor")
                          //       .click();
                          //   });
                          document
                            .getElementById("observations-anchor")
                            .click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    <div id="content">
                      <div className="input-group mt-3">
                        <div
                          className="btn-group p-3 bg-white row rounded-3 ms-1"
                          role="group"
                          aria-label="Basic checkbox toggle button group"
                          style={{ width: "100%" }}
                        >
                          {[
                            "Absent Mind",
                            "Forgetfulness",
                            "Timid",
                            "Jealousness",
                            "Suspicious",
                            "Confuse Minded",
                            "Over Sensitive",
                            "Sadness",
                            "Aggressive",
                            "Angerness",
                            "Hot Temprament",
                            "Overthinking",
                            "Proudy",
                            "Over Proudy",
                          ].map((label, index) => (
                            <div
                              className="col-md-4 d-flex align-items-center"
                              key={index}
                            >
                              <input
                                type="checkbox"
                                style={{ border: "1px black" }}
                                name="mind[]"
                                value={label}
                                className="btn-check"
                                id={`btncheck${index + 1}`}
                                autoComplete="off"
                              />
                              <label
                                className="btn rounded-3 btn-checker w-100"
                                htmlFor={`btncheck${index + 1}`}
                              >
                                {label}
                              </label>
                            </div>
                          ))}
                          <div className="col-md-4 d-flex align-items-center">
                            <button
                              type="reset"
                              id="clear-selection-button"
                              className="btn rounded-3 w-100"
                            >
                              Clear Selection
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div id="observations" className="tab-pane fade">
                  <form action="" id="observations1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>General Observations</h3>
                      <button
                        value="observations1"
                        type="button"
                        className="btn btn-success save-button"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateData(e.target.value);
                          document.getElementById("vitals-anchor").click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    <div id="content">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="head/neck"
                          id="head"
                          name="head"
                        ></textarea>
                        <label htmlFor="head">Head/Neck</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="mouth"
                          id="mouth"
                          name="mouth"
                        ></textarea>
                        <label htmlFor="mouth">Mouth/Tongue</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="eye"
                          id="eye"
                          name="eye"
                        ></textarea>
                        <label htmlFor="eye">Eye/Ear</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="face"
                          id="face"
                          name="face"
                        ></textarea>
                        <label htmlFor="face">Face/Color</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="nose"
                          id="nose"
                          name="nose"
                        ></textarea>
                        <label htmlFor="nose">Nose</label>
                      </div>
                      <br />
                      <div className="input-group mb-3">
                        <span className="input-group-text">Chest</span>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="respiratory"
                            placeholder="Respiratory"
                            name="respiratory"
                          ></textarea>
                          <label htmlFor="respiratory">Respiratory</label>
                        </div>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="cardiac"
                            placeholder="Cardiac"
                            name="cardiac"
                          ></textarea>
                          <label htmlFor="cardiac">Cardiac</label>
                        </div>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="abdomen"
                          id="abdomen"
                          name="abdomen"
                        ></textarea>
                        <label htmlFor="abdomen">Abdomen/Pelvis</label>
                      </div>
                      <br />
                      <div className="input-group mb-3">
                        <span className="input-group-text">Genitalia</span>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="menses"
                            placeholder="Menses"
                            name="menses"
                          ></textarea>
                          <label htmlFor="menses">Menses</label>
                        </div>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="genitalia"
                            placeholder="Genitalia"
                            name="other"
                          ></textarea>
                          <label htmlFor="genitalia">Genitalia</label>
                        </div>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="limb"
                          id="limb"
                          name="limb"
                        ></textarea>
                        <label htmlFor="limb">Limb</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="back"
                          id="back"
                          name="back"
                        ></textarea>
                        <label htmlFor="back">Back/Lumber</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "13vh" }}
                          placeholder="skin"
                          id="skin"
                          name="skin"
                        ></textarea>
                        <label htmlFor="skin">
                          Skin/Condition/Perspiration
                        </label>
                      </div>
                      <br />
                    </div>
                  </form>
                </div>
                <div id="vitals" className="tab-pane fade">
                  <form action="" id="vitals1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Vitals</h3>
                      <button
                        value="vitals1"
                        type="button"
                        id="vitals-save"
                        className="btn btn-success save-button"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateData(e.target.value);
                          // document
                          //   .getElementById("vitals-save")
                          //   .addEventListener("click", function () {
                          //     document
                          //       .getElementById("symptoms-anchor")
                          //       .click();
                          //   });
                          document.getElementById("symptoms-anchor").click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    {/* Rest of symptoms form */}
                    <div id="content">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="appetite"
                          id="appetite"
                          name="appetite"
                        ></textarea>
                        <label htmlFor="appetite">Appetite</label>
                      </div>
                      <br />

                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="thirst"
                          id="thirst"
                          name="thirst"
                        ></textarea>
                        <label htmlFor="thirst">Thirst</label>
                      </div>
                      <br />

                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="stool"
                          id="stool"
                          name="stool"
                        ></textarea>
                        <label htmlFor="stool">Stool</label>
                      </div>
                      <br />

                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="urine"
                          id="urine"
                          name="urine"
                        ></textarea>
                        <label htmlFor="urine">Urine</label>
                      </div>
                      <br />

                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="sleep"
                          id="sleep"
                          name="sleep"
                        ></textarea>
                        <label htmlFor="sleep">Sleep/Dream</label>
                      </div>
                      <br />

                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="discharge"
                          id="discharge"
                          name="discharge"
                        ></textarea>
                        <label htmlFor="discharge">Discharge (if any)</label>
                      </div>
                      <br />
                    </div>
                  </form>
                </div>
                <div id="symptoms" className="tab-pane fade">
                  <form action="" id="symptoms1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Symptoms and Conditions</h3>
                      <button
                        value="symptoms1"
                        type="button"
                        id="symptoms-save"
                        className="btn btn-success save-button"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdateData(e.target.value);
                          // document
                          //   .getElementById("symptoms-save")
                          //   .addEventListener("click", function () {
                          //     document.getElementById("lab-anchor").click();
                          //   });
                          document.getElementById("lab-anchor").click();
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    <div id="content">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="addiction"
                          id="addiction"
                          name="addiction"
                        ></textarea>
                        <label htmlFor="addiction">Addiction (if any)</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="desire"
                          id="desire"
                          name="desire"
                        ></textarea>
                        <label htmlFor="desire">Desire</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="aversion"
                          id="aversion"
                          name="aversion"
                        ></textarea>
                        <label htmlFor="aversion">Aversion</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="aggravation"
                          id="aggravation"
                          name="aggravation"
                        ></textarea>
                        <label htmlFor="aggravation">Aggravation</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          style={{ minHeight: "10vh" }}
                          placeholder="amelioration"
                          id="amelioration"
                          name="amelioration"
                        ></textarea>
                        <label htmlFor="amelioration">Amelioration</label>
                      </div>
                      <br />
                    </div>
                  </form>
                </div>
                <div
                  id="lab"
                  className={`tab-pane fade ${
                    activeTab === "lab" && "show active"
                  }`}
                >
                  <form id="lab1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3>Lab Tests</h3>
                      <button
                        type="button"
                        className="btn btn-success save-button"
                        value="lab1"
                        onClick={(e) => {
                          e.preventDefault();
                          PushLabData(e.target.value);
                        }}
                        style={{ backgroundColor: "#1da453" }}
                      >
                        Save
                      </button>
                    </div>
                    {/* Rest of lab tests form */}
                    <div id="lab-fields">
                      {labFields.map((field, index) => (
                        <div className="input-group mb-2" key={index}>
                          <select
                            name="lab[]"
                            className="form-select"
                            aria-label="status-select"
                            style={{
                              borderTopLeftRadius: "10px",
                              borderBottomLeftRadius: "10px",
                            }}
                            value={field.test}
                            onChange={(e) =>
                              handleLabFieldChange(
                                index,
                                "test",
                                e.target.value
                              )
                            }
                            disabled={!isEditable}
                          >
                            <option value="">Select Lab Test</option>
                            <option value="Blood Test">Blood Test</option>
                            <option value="Biopsy">Biopsy</option>
                          </select>
                          <input
                            type="date"
                            name="dt[]"
                            className="form-control"
                            value={field.date}
                            onChange={(e) =>
                              handleLabFieldChange(
                                index,
                                "date",
                                e.target.value
                              )
                            }
                            disabled={!isEditable}
                          />
                          <input
                            name="remarks[]"
                            style={{ width: "400px" }}
                            type="text"
                            className="form-control"
                            value={field.remarks}
                            onChange={(e) =>
                              handleLabFieldChange(
                                index,
                                "remarks",
                                e.target.value
                              )
                            }
                            placeholder="Remarks"
                            disabled={!isEditable}
                          />
                          <input
                            className="form-control p-3 bg-light"
                            style={{ width: "50px" }}
                            type="file"
                            name="file[]"
                            onChange={(e) =>
                              handleLabFieldChange(
                                index,
                                "file",
                                e.target.files[0]
                              )
                            }
                            disabled={!isEditable}
                          />
                          {/* <button
                            className="btn btn-success save-button"
                            type="button"
                            onClick={savelab}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button> */}
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => deletelab(index)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={addlab}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </form>
                  <div
                    className="mt-4 rounded-3"
                    // style={{ backgroundColor: "green" }}
                  >
                    <table
                      className=" table table-bordered table-striped table-hover"
                      id="table"
                    >
                      <thead className="thead-dark">
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Lab Test</th>
                          <th>Remarks</th>
                          <th>File</th>
                        </tr>
                      </thead>
                      <tbody id="table-body"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 p-2" style={{ padding: "0px" }}>
            <div
              className="w-100 rounded-3 p-2  mb-2"
              style={{ backgroundColor: "#0d7e5a" }}
            >
              <div
                className="row "
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <div className="col-md-9 p-1">
                  <div className=" rounded-3 ">
                    <div
                      className="rounded-3 mb-2"
                      style={{
                        textAlign: "left",
                        backgroundColor: "#ffffff",
                        color: "black",
                        paddingLeft: "10px",
                        padding: "10px",
                      }}
                    >
                      {name}
                    </div>
                    <div className="input-group">
                      {/* <span
                        className="input-group-text fixed-width p-3 border-0"
                        id="inputGroup-sizing-default"
                        style={{
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          color: "bisque",
                        }}
                      >
                        Date
                      </span> */}
                      <input
                        type="date"
                        id="date-checkup"
                        ref={dateCheckupRef}
                        name="date"
                        className="form-control border-0 p-2 ps-2"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter Date"
                        style={{
                          textAlign: "left",
                          backgroundColor: "#ffffff",
                          color: "black",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3 p-1 ">
                  <div className="bg-light rounded-3">
                    <div
                      className="p-3"
                      style={{
                        maxHeight: "12.5vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        className="image-fluid"
                        style={{
                          maxHeight: "10.5vh",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                        src={account}
                        alt="img-not-available"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

                <ul
              className="nav nav-fill rounded-3"
              style={{ borderRadius: "20px" }}
            >
              <li
                className="nav-item mb-2"
                style={{ paddingLeft: "3px", paddingRight: "3px" }}
              >
                <a
                  style={{ textAlign: "center" }}
                  className="p-3 text nav-link rounded-3 right-nav right-nav-item active"
                  data-bs-toggle="tab"
                  href="#home2"
                >
                  Checkup
                </a>
              </li>
              <li
                className="nav-item mb-2"
                style={{ paddingLeft: "3px", paddingRight: "3px" }}
              >
                <a
                  style={{ textAlign: "center" }}
                  className="p-3 text nav-link rounded-3 right-nav right-nav-item"
                  data-bs-toggle="tab"
                  href="#menu12"
                >
                  Prescriptions
                </a>
              </li>
              <li
                className="nav-item mb-2"
                style={{ paddingLeft: "3px", paddingRight: "3px" }}
              >
                <a
                  style={{ textAlign: "center" }}
                  className="p-3 text nav-link rounded-3 right-nav right-nav-item"
                  data-bs-toggle="tab"
                  href="#menu22"
                >
                  Payment
                </a>
              </li>
              <li
                className="nav-item mb-2"
                style={{ paddingLeft: "3px", paddingRight: "3px" }}
              >
                <a
                  style={{ textAlign: "center" }}
                  className="p-3 text nav-link rounded-3 right-nav right-nav-item"
                  data-bs-toggle="tab"
                  href="#menu32"
                >
                  History
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div id="home2" className="tab-pane fade show active">
                <form action="" id="checkup">
                  <div
                    className="rounded-3 p-2"
                    style={{ backgroundColor: "#d1d3ab21" }}
                  >
                    <div className="input-group">
                      {/* <span
                        className="input-group-text fixed-width p-3 border-0"
                        id="inputGroup-sizing-default"
                        style={{
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          color: "bisque",
                        }}
                      >
                        Date
                      </span> */}
                      <input
                        type="hidden"
                        id="date-prescription"
                        name="date"
                        className="form-control border-0"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter Date"
                        value={dateValue}
                        readOnly
                      />
                    </div>
                    <div className="input-group ">
                      <span
                        className="input-group-text fixed-width p-3 border-0"
                        id="inputGroup-sizing-default"
                        style={{ color: "bisque", minHeight: "20vh" }}
                      >
                        Remarks
                      </span>
                      <div className="form-floating">
                        <textarea
                          className="form-control border-0"
                          style={{ minHeight: "20vh" }}
                          placeholder="Enter Remarks (if any)"
                          name="remarks"
                        ></textarea>
                      </div>
                    </div>
                    <div className="input-group mt-2">
                      <span
                        className="input-group-text fixed-width p-3 border-0"
                        id="inputGroup-sizing-default"
                        style={{
                          color: "bisque",
                          // backgroundColor: "black",
                        }}
                      >
                        Photos
                      </span>
                      <input
                        className="form-control rounded-3 p-3 bg-light border-0"
                        style={{
                          borderTopLeftRadius: "0px",
                          borderBottomLeftRadius: "0px",
                        }}
                        name="file"
                        type="file"
                        placeholder=""
                        aria-label=""
                        id="file-upload"
                      />
                    </div>
                    <button
                      className="rounded-3 p-3 mt-2 border-0 w-100"
                      type="button"
                      value="checkup"
                      onClick={(e) => {
                        e.preventDefault();
                        PushCheckupData(e.target.value);
                      }}
                      id="save-checkup-button"
                      style={{
                        backgroundColor: "#1da453",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      SAVE{" "}
                      <img
                        src="Images And Icons/arrow-right-solid (1).svg"
                        style={{
                          height: "10px",
                          opacity: "100%",
                          transform: "translateY(-15%)",
                        }}
                        alt=""
                      />
                    </button>
                  </div>
                </form>
                {/* Show previous checkups for this caseno */}
                <div className="mt-3">
                  {checkupsData && checkupsData.length > 0 ? (
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Remarks</th>
                          <th>File</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkupsData.map((c, idx) => (
                          <tr key={idx}>
                            <td>{c.id || c.rowid || idx}</td>
                            <td>{c.date}</td>
                            <td>{c.remarks}</td>
                            <td>
                              {c.file ? (
                                <a href={`../${c.file}`} target="_blank" rel="noreferrer">View</a>
                              ) : (
                                "No file"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-2">No previous checkups</div>
                  )}
                </div>
              </div>
              <div id="menu12" className="tab-pane fade">
                <form action="" id="prescription">
                  <div
                    className="rounded-3 p-2"
                    style={{ backgroundColor: "#0e825dc6" }}
                  >
                    <input
                      type="hidden"
                      id="date-prescription"
                      name="date"
                      className="form-control border-0"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Date"
                      value={dateValue}
                      readOnly
                    />
                    <div
                      className="rounded-3"
                      style={{ maxHeight: "75vh", overflowY: "auto" }}
                    >
                      <div id="input-fields">
                        <div
                          className="input-group"
                          style={{ maxHeight: "70vh" }}
                        >
                          <div className="input-group input-group-custom">
                            <input
                              type="text"
                              className="form-control p-3 border-0 rounded-3 me-1"
                              id="medicine-input"
                              name="medicine[]"
                              placeholder="Enter Medicine"
                              style={{
                                backgroundColor: "#ffffff",
                                color: "black",
                                minWidth: "37%",
                              }}
                            />
                            <input
                              type="text"
                              className="form-control p-3 border-0 rounded-3 ms-1 me-1"
                              id="dose-input"
                              name="dose[]"
                              placeholder="Enter Dose"
                              style={{
                                backgroundColor: "#ffffff",
                                color: "black",
                                minWidth: "37%",
                              }}
                            />
                            <button
                              type="button"
                              className="form-control p-2 border-0 rounded-3 me-1 ms-1"
                              id="remove"
                              onClick={() => removeInputFields(this)}
                              style={{
                                backgroundColor: "rgba(255, 0, 0, 0.654)",
                                color: "bisque",
                                minWidth: "5%",
                                textAlign: "center",
                              }}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="form-control p-2 border-0 rounded-3 ms-1"
                              onClick={() => addInputFields()}
                              id="add"
                              style={{
                                backgroundColor: "#1da453",
                                color: "bisque",
                                minWidth: "5%",
                                textAlign: "center",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Previous prescriptions list */}
                    <div className="mt-3">
                      {prescriptionsData && prescriptionsData.length > 0 ? (
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Medicine</th>
                              <th>Dose</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prescriptionsData.map((p, idx) => (
                              <tr key={idx}>
                                <td>{p.id || p.rowid || idx}</td>
                                <td>{p.date}</td>
                                <td>{p.medicine}</td>
                                <td>{p.dose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-2">No previous prescriptions</div>
                      )}
                    </div>

                    <button
                      id="payment-button"
                      value="prescription"
                      className="rounded-3 p-3 mt-2 border-0 w-100"
                      style={{ backgroundColor: "#019fdece", color: "bisque" }}
                      onClick={(e) => {
                        e.preventDefault();
                        PushPrescription(e.target.value);
                      }}
                    >
                      PAYMENT{" "}
                      <img
                        src="Images And Icons/arrow-right-solid (1).svg"
                        style={{
                          height: "10px",
                          opacity: "100%",
                          transform: "translateY(-15%)",
                        }}
                        alt=""
                      />
                    </button>
                  </div>
                </form>
              </div>

              <div id="menu22" className="tab-pane fade w-100">
                <form action="" id="pay">
                  <div
                    className="rounded-3 text-align-center p-2 fs-6"
                    style={{ minWidth: "100%", backgroundColor: "#0e825dc6" }}
                  >
                    <input
                      type="hidden"
                      id="date-prescription"
                      name="date"
                      className="form-control border-0"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Date"
                      value={dateValue}
                      readOnly
                    />
                    <input
                      type="hidden"
                      id="date"
                      className="form-control border-0 right-align"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Date"
                      style={{ backgroundColor: "#d1d3ab3c" }}
                    />
                    <div
                      className="justify-content-center align-items-center form-control p-3 rounded-3 input-group-text-right"
                      style={{ backgroundColor: "#ffffff", color: "black" }}
                    >
                      <span>Amount Previously Left to be paid:</span>{" "}
                      <b id="prev_amt_display">{prevAmtDisplayState ? `₹${prevAmtDisplayState.toFixed(2)}` : "₹0.00"}</b>
                      <input type="hidden" id="prev_amt" name="prev_amt" value={prevAmtDisplayState} readOnly />
                    </div>
                    <div className="input-group mt-2">
                      <span
                        className="input-group-text p-3 border-0"
                        id="inputGroup-sizing-default"
                        style={{
                          backgroundColor: "rgb(255, 255, 255)",
                          color: "black",
                          fontWeight: 500,
                          minWidth: "26%",
                        }}
                      >
                        To be paid
                      </span>
                      <input
                        id="present_amt"
                        name="present_amt"
                        type="number"
                        className="form-control border-0 right-align"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.801)",
                        }}
                        placeholder="Enter Here"
                        value={presentAmt}
                        onChange={(e) => setPresentAmt(e.target.value)}
                      />
                    </div>
                    <div className="input-group mt-2">
                      <span
                        className="input-group-text p-3 border-0"
                        id="inputGroup-sizing-default"
                        style={{
                          backgroundColor: "rgb(255, 255, 255)",
                          color: "black",
                          fontWeight: 500,
                          minWidth: "26%",
                        }}
                      >
                        Amount paid
                      </span>
                      <input
                        id="paid_amt"
                        name="paid_amt"
                        type="number"
                        className="form-control border-0 right-align"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.801)",
                        }}
                        placeholder="Enter Here"
                        value={paidAmt}
                        onChange={(e) => setPaidAmt(e.target.value)}
                      />
                    </div>
                    <div
                      className="justify-content-center form-control align-items-center p-3 rounded-3 mt-2 input-group-text-right"
                      style={{ backgroundColor: "#ffffff", color: "black" }}
                    >
                      <span>Amount that will be left to be paid:</span>{" "}
                      <b id="left_amt_display">{`₹${(leftAmtDisplay || 0).toFixed(2)}`}</b>
                      <input type="hidden" id="left_amt" name="future_amt" value={leftAmtDisplay} readOnly />
                    </div>
                    <button
                      className="rounded-3 p-3 mt-2 border-0 w-100"
                      id="save-payment-button"
                      value="pay"
                      onClick={(e) => {
                        e.preventDefault();
                        PushPayment(e.target.value);
                      }}
                      style={{
                        backgroundColor: "#1da453",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      SAVE <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                </form>
              </div>

              <div id="menu32" className="tab-pane fade w-100">
                <div className="w-100">
                  <div
                    className="history-div rounded-3"
                    style={{ maxHeight: "100vh", overflowY: "scroll" }}
                  >
                    <div
                      className="justify-content-center align-items-center mb-1 p-1 rounded-3"
                      style={{ backgroundColor: "#0d7e5a" }}
                    >
                      <ul
                        className="nav nav-fill rounded-3"
                        style={{ borderRadius: "20px" }}
                      >
                        <li
                          className="nav-item mb-1"
                          style={{ paddingLeft: "0px", paddingRight: "3px" }}
                        >
                          <a
                            style={{ textAlign: "center" }}
                            className="p-2 text nav-link rounded-3 right-right-nav right-right-nav-item active"
                            data-bs-toggle="tab"
                            href="#paymenthistorydiv"
                          >
                            Payment History
                          </a>
                        </li>
                        <li
                          className="nav-item mb-1"
                          style={{ paddingLeft: "3px", paddingRight: "0px" }}
                        >
                          <a
                            style={{ textAlign: "center" }}
                            className="p-2 text nav-link rounded-3 right-right-nav right-right-nav-item"
                            data-bs-toggle="tab"
                            href="#checkuphistorydiv"
                          >
                            Checkup History
                          </a>
                        </li>
                      </ul>

                      <div
                        id="paymenthistorydiv"
                        className="tab-pane fade w-100"
                      >
                        <div className="input-group">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Amount to be Paid</th>
                                <th>Amount Paid</th>
                                <th>Amount Left to be Paid</th>
                              </tr>
                            </thead>
                            <tbody id="table-pay">
                              {/* Sample data, replace with dynamic data */}

                              {/* Add more rows as needed */}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        id="checkuphistorydiv"
                        className="tab-pane fade w-100"
                      >
                        <div className="input-group p-2">
                          {checkupsData && checkupsData.length > 0 ? (
                            <table className="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Date</th>
                                  <th>Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {checkupsData.map((c, i) => (
                                  <tr key={i}>
                                    <td>{c.id || c.rowid || i}</td>
                                    <td>{c.date}</td>
                                    <td>{c.remarks}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <span
                              className="p-3 border-0 rounded-3 w-100"
                              id="inputGroup-sizing-default"
                              style={{
                                backgroundColor: "#0b6e4fef",
                                color: "bisque",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "20px",
                              }}
                            >
                              No history for the patient yet.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
