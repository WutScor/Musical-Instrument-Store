import React, { useState, useEffect } from "react";


const DescriptionTab = ({ description, additional, reviews, image }) => {
  // Điều chỉnh nội dung cho các tab (Description, Additional Information, Reviews) ở trong trang chi tiết sản phẩm
  const [activeTab, setActiveTab] = useState("description");
  const [additionalInfo, setAdditionalInfo] = useState([]);
  useEffect(() => {
    const listInfo = additional.split("\\n");
    setAdditionalInfo(listInfo);
  }, [additional]);

  return (
    <>
      <div className="des-info">
        {/* Tabs Title */}
        <div className="description-tabs">
          <div
            onClick={() => setActiveTab("description")}
            className={activeTab === "description" ? "active-tab" : "tab"}
          >
            Description
          </div>
          <div
            onClick={() => setActiveTab("additional")}
            className={activeTab === "additional" ? "active-tab" : "tab"}
          >
            Additional Information
          </div>
          <div
            onClick={() => setActiveTab("reviews")}
            className={activeTab === "reviews" ? "active-tab" : "tab"}
          >
            Reviews
          </div>
        </div>

        {/* Tabs Content */}
        <div className="content-tabs">
          {activeTab === "description" && (
            <p className="description-content">{description}</p>
          )}
          {activeTab === "additional" && (
            <div className="description-content d-flex flex-column">
              <div className="grid-layout">
              {additionalInfo.map((info, index) => (
                <div key={index}>{info}</div>
              ))}
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <p className="description-content">{reviews}</p>
          )}
        </div>

        {/* Images */}
        {/* <div className="d-flex des-img-gallery">
          <div className="des-img-frame">
            <img
              src={image}
              alt="img"
              className="des-img"
            ></img>
          </div>
          <div className="des-img-frame">
            <img
              src={image}
              alt="img"
              className="des-img"
            ></img>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DescriptionTab;
