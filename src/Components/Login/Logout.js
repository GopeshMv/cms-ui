import React, { useEffect } from "react";

function Logout() {
    const fetchData = async () => {
        const apiUrl = `http://localhost:8090/user/Logout?userId`;
        const apiParams = localStorage.getItem("id");
        const response = await fetch(`${apiUrl}=${apiParams}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Fetch PUT Request Example'}), 
        });
        if (response.ok) {
            localStorage.clear(); 
            window.location.href = "/";
        } else {
            console.log();
        }
    }
    fetchData();

    // localStorage.clear(); 
    //         window.location.href = "/";
    
}

export default Logout;