import { BsPeopleFill, BsPerson, BsCardChecklist } from "react-icons/bs";
import React, { useState } from "react";
import { useEffect } from "react";

function Home() {
    
    const [patients, setPatients] = useState([]);
    const [admits, setAdmits] = useState([]);
    useEffect(() => {
        (async function () {
            try {
                const responce = await fetch("http://localhost:8081/getall");
                setPatients(await responce.json());
                const responce2 = await fetch("http://localhost:8081/get_admits");
                setAdmits(await responce2.json());
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <main className="main-container">
            <div className="">
                <div className="main-title">
                    <h3>DASHBOARD</h3>
                </div>

                <div className="main-cards">
                    <div className="card">
                        <div className="card-inner">
                            <h3>Total Patient</h3>
                            <BsPeopleFill className="card_icon" />
                        </div>
                        <h1>{patients.length}</h1>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <h3>Admitted Pateint</h3>
                            <BsPerson className="card_icon" />
                        </div>
                        <h1>{admits.length}</h1>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
