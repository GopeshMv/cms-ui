import React, { useEffect } from "react";

function Logout() {
    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/user/Logout?userId`;
            const apiParams = localStorage.id;
            const response = await fetch(`${apiUrl}=${apiParams}`);
            const responseData = await response.json();
            if (response.ok) {
                localStorage.clear(); 
                window.location.href = "/";
            } else {
                console.log(responseData);
            }
        }
        fetchData();
    }, []);
    
}