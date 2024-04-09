
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./table.css";

function UpdateDeleteTableRecord() {
    let [array, setArray] = useState([]);
    let [inputdata, setInputdata] = useState({ name: "", number: "" });
    let [index, setIndex] = useState();
    let [bolin, setBolin] = useState(false);
    let { name, number } = inputdata;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8082/getPerson");
            setArray(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function data(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    };

    async function addinputdata() {
        try {
            if (name === "" && number === "") {
                alert("Enter Name & Roll no");
            } else {
                await axios.post("http://localhost:8082/savePerson", { name, number });
                fetchData(); 
                setInputdata({ name: "", number: "" });
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    async function deletedata(name) {
        try {
            await axios.delete(`http://localhost:8082/${name}`);
            fetchData(); 
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    function updatedata(i) {
        const { name, number } = array[i];
        setInputdata({ name, number });
        setIndex(i);
        setBolin(true);
    };

    async function updateinfo() {
        try {
            await axios.put(`http://localhost:8082/${name}`, { name, number });
            fetchData(); // Automatically updates table after updating data
            setBolin(false);
            setInputdata({ name: "", number: "" });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div>
            <center>
                <input type="text" value={name || ""} name='name' autoComplete='off' placeholder='Enter Name' onChange={data} />
                <input type="text" value={number || ""} name='number' placeholder='Enter Number' onChange={data} />
                <button onClick={!bolin ? addinputdata : updateinfo}>{!bolin ? `Add data` : `Update data`} </button>
            </center>

            <br />

            {/* Table */}
            <table width="100%">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Number</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>

                    {array.map((item, i) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.number}</td>
                            <td>
                                <button onClick={() => updatedata(i)}>Update</button>
                            </td>
                            <td>
                                <button onClick={() => deletedata(item.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UpdateDeleteTableRecord;

