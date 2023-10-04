export const getFeatures = (item, t) => {
  return [
    {
      id: 1,
      text: t("new_building"),
      show: `${item?.new_building}`.toLowerCase() === "new_building",
    },
    {
      id: 2,
      text: t("elevator"),
      show: `${item?.elevator}`.toLowerCase() === "elevator",
    },
    {
      id: 3,
      text: t("internet"),
      show: `${item?.internet}`.toLowerCase() === "internet",
    },
    {
      id: 4,
      text: t("cooling"),
      show: `${item?.cooling}`.toLowerCase() === "cooling",
    },
    {
      id: 5,
      text: t("refrigerator"),
      show: `${item?.refrigerator}`.toLowerCase() === "refrigerator",
    },
    {
      id: 6,
      text: t("balconies"),
      show: `${item?.balconies}`.toLowerCase() === "balconies",
    },
  ];
};
