import React from "react";
function layout({children}: {children:React.ReactNode})
{
    return (
        <div>
            <h2>Dashboard</h2>
            {children}
        </div>

    )
}
export default layout;