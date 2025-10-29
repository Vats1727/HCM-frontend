import React, { useState, useEffect } from 'react';

const History = ({ caseno }) => {
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/patients/${caseno}/history`);
                if (!response.ok) {
                    throw new Error('Failed to fetch history data');
                }
                const body = await response.json();
                // Unwrap responses that come as { status, message, data: {...} }
                const payload = body && body.data ? body.data : body;
                setHistoryData(payload);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchHistory();
    }, [caseno]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching history: {error.message}</p>;
    }

    if (!historyData || typeof historyData !== 'object') {
        return <p>Invalid data format: Expected an object</p>;
    }

    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const formattedDate = dateObj.toLocaleDateString('en-GB'); // Adjust locale as needed
        return formattedDate;
    };

    const renderPrescriptions = (prescriptions) => {
        if (!prescriptions || !Array.isArray(prescriptions) || prescriptions.length === 0) {
            return <p>No prescriptions found</p>;
        }

        return prescriptions.map((prescription, index) => (
            <span key={index}>
                {prescription && prescription.medicine ? prescription.medicine : ''} {prescription && prescription.dose ? `X ${prescription.dose}` : ''}<br />
            </span>
        ));
    };

    // If the API returned a simple patient history object (not a date-keyed history), render that nicely
    if (historyData && historyData.caseno) {
        return (
            <div className="history-div rounded-3" style={{ maxHeight: '81vh', overflowY: 'scroll' }}>
                <div className="justify-content-center align-items-center mb-3 mt-1 p-1 rounded-3" style={{ backgroundColor: '#d1d3ab' }}>
                    <div className="input-group">
                        <span className="p-3 border-0 rounded-3 w-100 mb-1 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0b6e4f', color: 'bisque', textAlign: 'center', fontWeight: 600, fontSize: '20px' }}>
                            <span>{historyData.name} (Case {historyData.caseno})</span>
                            <span>{historyData.date}</span>
                        </span>
                        <div className="p-3 border-0 rounded-3 me-auto" style={{ backgroundColor: '#0b6e4f', color: 'bisque', width: '49.75%' }}>
                            <p><strong>Present:</strong> {historyData.present || ''}</p>
                            <p><strong>Past:</strong> {historyData.past || ''}</p>
                            {historyData.checkup_remarks && historyData.checkup_remarks.length > 0 && (
                                <div className="mt-2">
                                    <h6 style={{ color: 'bisque' }}>Checkup Remarks</h6>
                                    {historyData.checkup_remarks.map((c, i) => (
                                        <div key={i} style={{ color: 'white' }}>{c.date}: {c.remarks}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-3 border-0 rounded-3 ms-auto" style={{ backgroundColor: '#0b6e4f', color: 'bisque', width: '49.75%' }}>
                            <p><strong>Family:</strong> {historyData.family || ''}</p>
                            <p><strong>Contact:</strong> {historyData.mobile || ''}</p>
                            {historyData.prescriptions && historyData.prescriptions.length > 0 && (
                                <div className="mt-2">
                                    <h6 style={{ color: 'bisque' }}>Prescriptions</h6>
                                    {historyData.prescriptions.map((p, idx) => (
                                        <div key={idx} style={{ color: 'white' }}>{p.date}: {p.medicine} {p.dose ? `x ${p.dose}` : ''}</div>
                                    ))}
                                </div>
                            )}
                            {historyData.lab_tests && historyData.lab_tests.length > 0 && (
                                <div className="mt-2">
                                    <h6 style={{ color: 'bisque' }}>Lab Tests</h6>
                                    {historyData.lab_tests.map((l, idx) => (
                                        <div key={idx} style={{ color: 'white' }}>{l.date}: {l.lab} {l.remarks ? `- ${l.remarks}` : ''}</div>
                                    ))}
                                </div>
                            )}
                            {historyData.payment && (
                                <div className="mt-2">
                                    <h6 style={{ color: 'bisque' }}>Payment</h6>
                                    <div style={{ color: 'white' }}>Prev: {historyData.payment.prev_amt || 0} | Present: {historyData.payment.present_amt || 0} | Paid: {historyData.payment.paid_amt || 0} | Left: {historyData.payment.future_amt || 0}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Get sorted dates in descending order for date-keyed history
    const sortedDates = Object.keys(historyData).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB - dateA;
    });

    return (
        <div className="history-div rounded-3" style={{ maxHeight: '81vh', overflowY: 'scroll' }}>
            {sortedDates.map(date => {
                const entry = historyData && historyData[date] ? historyData[date] : {};
                const checkup = entry.checkup_remarks || {};
                const prescriptions = entry.prescriptions || [];

                return (
                    <div key={date} className="justify-content-center align-items-center mb-3 mt-1 p-1 rounded-3" style={{ backgroundColor: '#d1d3ab' }}>
                        <div className="input-group">
                            <span className="p-3 border-0 rounded-3 w-100 mb-1 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0b6e4f', color: 'bisque', textAlign: 'center', fontWeight: 600, fontSize: '20px' }}>
                                <span>{formatDate(date)}</span>
                            </span>
                            <span className="p-3 border-0 rounded-3 me-auto" style={{ backgroundColor: '#0b6e4f', color: 'bisque', width: '49.75%' }}>
                                <p>{checkup && checkup.remarks ? checkup.remarks : ''}</p>
                            </span>
                            <span className="p-3 border-0 rounded-3 ms-auto" style={{ backgroundColor: '#0b6e4f', color: 'bisque', width: '49.75%' }}>
                                {renderPrescriptions(prescriptions)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default History;
