// import React, { useState } from 'react';
// // import './ApiItem.css'; // Styles for each API item

// const ApiItem = ({ api }) => {
//     const [jsonData, setJsonData] = useState(null);

//     const handleViewJson = () => {
//         fetch(`/api/${api.file}`)
//             .then(response => response.json())
//             .then(data => setJsonData(JSON.stringify(data, null, 2)))
//             .catch(error => console.error('Error fetching data:', error));
//     };

//     const handleCopyUrl = () => {
//         navigator.clipboard.writeText(`http://localhost:5000/api/${api.file}`);
//         alert('API URL copied to clipboard!');
//     };

//     return (
//         <div className="api-item">
//             <h3>{api.name}</h3>
//             <p>{api.description}</p>
//             <button onClick={handleViewJson} className="view-api">View JSON</button>
//             <button onClick={handleCopyUrl} className="copy-api">Copy URL</button>
//             {jsonData && (
//                 <pre className="json-output">{jsonData}</pre>
//             )}
//         </div>
//     );
// };

// export default ApiItem;

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApiItem = ({ api }) => {
    const [jsonData, setJsonData] = useState(null);
    const [isJsonVisible, setIsJsonVisible] = useState(false);

    const handleViewJson = async () => {
        // const url = '/data.json';
        // try {
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     setJsonData(data[api.file]);
        // } catch (error) {
        //     console.error(`Error fetching ${api.file}:`, error);
        // }
        if (!jsonData) {
            const url = '/data.json';
            try {
                const response = await fetch(url);
                const data = await response.json();
                setJsonData(data[api.file]);
            } catch (error) {
                console.error(`Error fetching ${api.file}:`, error);
            }
        }
        setIsJsonVisible(!isJsonVisible);
    };

    // const handleCopyUrl = () => {
    //     navigator.clipboard.writeText(`http://localhost:5000/api/${api.file}`);
    //     alert('API URL copied to clipboard!');
    // };

    const handleCopyUrl = async () => {
        const apiUrl = `http://localhost:5000/api/${api.file}`;
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(apiUrl);
                toast.success('API URL copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy API URL:', error);
                toast.error('Failed to copy API URL. Please try again.');
            }
        } else {
            console.error('Clipboard API not supported');
            toast.error('Clipboard API not supported. Please copy the URL manually.');
        }
    };
    return (
        <div className="api-item">
            <h3>{api.name}</h3>
            <p>{api.description}</p>
            {/* <button onClick={handleViewJson} className="view-api">View JSON</button>
            <button onClick={handleCopyUrl} className="copy-api">Copy URL</button>
            {jsonData && (
                <pre className="json-output">{JSON.stringify(jsonData, null, 2)}</pre>
            )} */}
             <button onClick={handleViewJson} className="view-api">
                {isJsonVisible ? 'Hide JSON' : 'View JSON'}
            </button>
            <button onClick={handleCopyUrl} className="copy-api">Copy URL</button>
            {isJsonVisible && jsonData && (
                <pre className="json-output">{JSON.stringify(jsonData, null, 2)}</pre>
            )}
             <ToastContainer />

        </div>
    );
};

export default ApiItem;