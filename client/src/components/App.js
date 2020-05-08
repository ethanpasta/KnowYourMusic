import React, { useEffect, useState } from 'react';

const callBackEndAPI = async () => {
    const res = await fetch('/api/express_backend');
    console.log(res);
    const body = await res.json();
    if (res.status != 200) {
        console.log("API request error: " + res);
        throw Error(body.message)
    }
    return body;
};

const App = () => {
    const [data, setData] = useState();
    useEffect(() => {
        callBackEndAPI()
            .then(res => setData(res.express))
            .catch(err => console.log(err))
    }, []);
    return (
        <div>
            <h1>React App</h1>
            {!data ? 
            <h3>Loading data from server...</h3>
            : <h3>Data from server: {data}</h3>}
            
        </div>
    );
};

export default App;