import React, { useState, useEffect } from 'react';

const FetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/patients');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData); // Debug: Log fetched data

                if (jsonData.status) {
                    setData(jsonData.data);
                } else {
                    setError(jsonData.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Homeopathic Consultancy Data</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Case No</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Occupation</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Present</th>
                        <th>Past</th>
                        <th>Family</th>
                        <th>Mind</th>
                        <th>Constitution</th>
                        <th>Marital Status</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((entry) => (
                            <tr key={entry.caseno}>
                                <td>{entry.caseno}</td>
                                <td>{entry.name}</td>
                                <td>{entry.gender}</td>
                                <td>{entry.age}</td>
                                <td>{entry.address}</td>
                                <td>{entry.occupation}</td>
                                <td>{entry.height}</td>
                                <td>{entry.weight}</td>
                                <td>{entry.present}</td>
                                <td>{entry.past}</td>
                                <td>{entry.family}</td>
                                <td>{entry.mind}</td>
                                <td>{entry.constitution}</td>
                                <td>{entry.marital}</td>
                                {/* Add more cells as needed */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FetchData;
