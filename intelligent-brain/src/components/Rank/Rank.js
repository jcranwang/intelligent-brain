import React from "react";

const Rank = ({userName, userEntries}) => {
    return (
        <div>
            <div className="black f3 ma3">
                {`${userName}, your current entry count is:`}
            </div>
            <div className="black f2">
                {userEntries}
            </div>
        </div>
    );
};

export default Rank;