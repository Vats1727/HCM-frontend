import React, { useState } from 'react';


function Settings() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div style={{ backgroundColor: '#0b6e4f', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
      <div className="bg-white rounded-3 p-3 fs-6" style={{ width: '90%', maxWidth: '500px', textAlign: 'center' }}>
        <form method="POST" action="">
          <div className="input-group mb-3">
            <span className="input-group-text p-3" style={{ backgroundColor: '#0b6e4f', color: 'bisque' }}>File No.</span>
            <input type="number" name="file_number" className="form-control" aria-label="File Number" style={{ backgroundColor: '#d1d3ab' }} placeholder="Enter File Number" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text p-3" style={{ backgroundColor: '#0b6e4f', color: 'bisque' }}>Password</span>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              id="password"
              className="form-control"
              aria-label="Password"
              style={{ backgroundColor: '#d1d3ab' }}
              placeholder="Enter Password"
            />
            <div className="input-group-append">
              <button
              id='pwd-visibility-button'
                type="button"
                className="btn rounded-0 h-100 bg-light"
                style={{ borderRadius: '0px 10px 10px 0px !important' }}
                onClick={togglePasswordVisibility}
              >
                <i className={isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="rounded-3 p-3 border-0 w-100" style={{ backgroundColor: '#1da453', color: 'white', fontWeight: '500' }}>
            SAVE <i className="fa-solid fa-check"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
