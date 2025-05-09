import React from "react";
import PanelistLayout from "./PanelistLayout";
import Banner from "../../components/user/Banner";

const PanelistLanding = () => {
  return (
    <PanelistLayout>
      <Banner
        title="Panelist"
        description="A panelist plays a crucial role in surveys and polling systems by actively participating in polls and providing valuable insights based on their expertise or personal experience. Their responsibilities include evaluating poll questions to ensure clarity, relevance, and fairness while also contributing accurate and honest responses to maintain data integrity."
      />
    </PanelistLayout>
  );
};

export default PanelistLanding;
