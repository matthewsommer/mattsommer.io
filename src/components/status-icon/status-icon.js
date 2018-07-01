import React from "react";

function importAll(r) {
    return r.keys().map(r);
}

const photography = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/));

const StatusIcon = ({ status }) => {
    if (status == 'Open') {
        return <img src={photography[0]} alt="icon" className="status" />;
    } else if (status == 'Closed') {
        return <img src={photography[1]} alt="icon" className="status" />;
    } else if (status == 'In Progress') {
        return <img src={photography[2]} alt="icon" className="status" />;
    }
}

export default StatusIcon;