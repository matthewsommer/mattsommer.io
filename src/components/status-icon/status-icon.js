import React from "react";

function importAll(r) {
    return r.keys().map(r);
}

const icons = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/));

const StatusIcon = ({ status }) => {
    if (status == 'Open') {
        return <span className='h3' >☐</span>;
    } else if (status == 'Closed') {
        return <span className='h3 text-success'>☑</span>;
    } else if (status == 'In Progress') {
        return <span className='h3'>☐</span>;
    }
}

export default StatusIcon;