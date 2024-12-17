import React, { useState } from "react";

const DescriptionTab = () => {
  const [activeTab, setActiveTab] = useState("description");

  const tabsContent = {
    description:
      "This is a description of the product. It is a very good product. You should buy it. It is very good.And now, let's talk about the product. It is a very good product. You should buy it. It is very good. So, let's talk about the product. It is a very good product. You should buy it. It is very good. And now, let's talk about the product. It is a very good product. You should buy it. It is very good. So, let's talk about the product. It is a very good product. You should buy it. It is very good. And now, let's talk about the product. It is a very good product. You should buy it. It is very good. So, let's talk about the product. It is a very good product. You should buy it. It is very good. And now, let's talk about the product. It is a very good product. You should buy it. It is very good. So, let's talk about the product. It is a very good product. You should buy it. It is very good. And now, let's talk about the product. It is a very good product. You should buy it. It is very good. So, let's talk about the product. It is a very good product. You should buy it. It is very good. And now, let's talk about the product. It is a very good product. You should buy it. It is very good.",
    additional:
      "Additional information about the product. It is a very good product. You should buy it. It is very good. ",
    reviews:
      "Reviews of the product. It is a very good product. You should buy it. It is very good. ",
  };

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
            <p className="description-content">{tabsContent.description}</p>
          )}
          {activeTab === "additional" && (
            <p className="description-content">{tabsContent.additional}</p>
          )}
          {activeTab === "reviews" && (
            <p className="description-content">{tabsContent.reviews}</p>
          )}
        </div>

        {/* Images */}
        <div className="d-flex des-img-gallery">
          <div className="des-img-frame">
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="des-img"
            ></img>
          </div>
          <div className="des-img-frame">
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="des-img"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionTab;
