import React from "react";
import BadgeDisplay from "../components/BadgeDisplay";
import contributors from "../../metadata/contributors.json";
import validator from "../../metadata/validator.json";

function BadgesPage() {
  return (
    <div>
      <h1>Contributor Badges</h1>
      <BadgeDisplay
        validator={validator}
        contributors={contributors.contributors}
        currentContributor={null}
      />
    </div>
  );
}

export default BadgesPage;
