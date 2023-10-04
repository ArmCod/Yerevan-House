export const getFeatures = (data, kindtype, t) => {
  return [
    {
      id: 1,
      text: kindtype === "land" ? t("lead_area") : t("area"),
      value: data?.area + t("qm"),
      show: data?.area,
    },
    {
      id: 2,
      text: t("ynd_area"),
      value: data?.lead_area + t("qm"),
      show: data?.lead_area,
    },
    {
      id: 3,
      text: t("bathroom"),
      value: data?.bathroom,
      show: data?.bathroom,
    },
    {
      id: 4,
      text: t("one_bed"),
      value: data?.one_bed,
      show: data?.one_bed,
    },
    {
      id: 5,
      text: t("two_bed"),
      value: data?.two_bed,
      show: data?.two_bed,
    },
    {
      id: 6,
      text: t("floor"),
      value: data?.floor,
      show: data?.floor && data?.floor !== "*",
    },
    {
      id: 7,
      text: t("room"),
      value: data?.rooms,
      show: data?.rooms,
    },
    {
      id: 9,
      text: t("toilet"),
      value: data?.tualet,
      show: data?.tualet,
    },
    {
      id: 10,
      text: t("stabil_wather"),
      show: data?.persistent_water?.toLowerCase() === "Persistent water",
    },
    {
      id: 11,
      text: t("garage"),
      show: data?.garage?.toLowerCase() === "garage",
    },
    {
      id: 12,
      text: t("air_conditioner"),
      show: data?.air_conditioner?.toLowerCase() === "Air conditioner",
    },
    {
      id: 13,
      text: t("barbeque"),
      show: data?.barbeque?.toLowerCase() === "barbeque",
    },
    {
      id: 14,
      text: t("gas"),
      show: data?.natural_gas?.toLowerCase() === "Natural gas",
    },
    {
      id: 15,
      text: t("open_air_parking"),
      show: data?.open_air_parking?.toLowerCase() === "Open air parking",
    },
    {
      id: 16,
      text: t("gas_boiler"),
      show: data?.gas_boiler?.toLowerCase() === "Gas boiler",
    },
    {
      id: 17,
      text: t("universal_spase"),
      show: data?.universal_spase?.toLowerCase() === "universal spase",
    },
    {
      id: 18,
      text: t("three_phase_current"),
      show: data?.three_phase_current?.toLowerCase() === "Three-phase current",
    },
    {
      id: 19,
      text: t("underground_parking"),
      show: data?.underground_parking?.toLowerCase() === "Underground parking",
    },
    {
      id: 20,
      text: t("utility_room"),
      show: data?.utility_room?.toLowerCase() === "utility room",
    },
    {
      id: 21,
      text: t("office_space"),
      show: data?.office_space?.toLowerCase() === "Office space",
    },
    {
      id: 22,
      text: t("internet"),
      show: data?.internet?.toLowerCase() === "internet",
    },
    {
      id: 23,
      text: t("cabel"),
      show: data?.cable_tv?.toLowerCase() === "Cable TV",
    },
    {
      id: 24,
      text: t("service_room"),
      show: data?.service_room?.toLowerCase() === "service room",
    },
    {
      id: 25,
      text: t("active_business"),
      show: data?.active_business?.toLowerCase() === "active business",
    },
    {
      id: 26,
      text: t("new_building"),
      show: data?.new_building?.toLowerCase() === "new_building",
    },
    {
      id: 27,
      text: t("sputnik_tv"),
      show: data?.satellite_tv?.toLowerCase() === "Satellite TV",
    },
    {
      id: 28,
      text: t("attic"),
      show: data?.attic?.toLowerCase() === "attic",
    },
    {
      id: 29,
      text: t("commercial_space"),
      show: data?.commercial_space?.toLowerCase() === "Commercial space",
    },
    {
      id: 30,
      text: t("panel"),
      show: data?.panel?.toLowerCase() === "panel",
    },
    {
      id: 31,
      text: t("security"),
      show: data?.security?.toLowerCase() === "security",
    },
    {
      id: 32,
      text: t("attic_room"),
      show: data?.attic_room?.toLowerCase() === "attic room",
    },

    {
      id: 33,
      text: t("hotel"),
      show: data?.hotel?.toLowerCase() === "hotel",
    },
    {
      id: 34,
      text: t("lets_draw"),
      show:
        data?.lets_draw?.toLowerCase() === "lets draw" ||
        data?.lets_draw?.toLowerCase() === "Lets_draw",
    },
    {
      id: 35,
      text: t("intercom"),
      show: data?.intercom?.toLowerCase() === "intercom",
    },
    {
      id: 36,
      text: t("basement"),
      show: data?.basement?.toLowerCase() === "basement",
    },
    {
      id: 37,
      text: t("guesthouse"),
      show: data?.guesthouse?.toLowerCase() === "guesthouse",
    },
    {
      id: 38,
      text: t("monolith"),
      show: data?.monolith?.toLowerCase() === "monolith",
    },
    {
      id: 39,
      text: t("gym"),
      show: data?.gym?.toLowerCase() === "gym",
    },
    {
      id: 40,
      text: t("green_yard"),
      show: data?.green_yard?.toLowerCase() === "Green Yard",
    },
    {
      id: 41,
      text: t("manufacturing_area"),
      show: data?.manufacturing_area?.toLowerCase() === "Manufacturing area",
    },
    {
      id: 42,
      text: t("sunny"),
      show: data?.sunny?.toLowerCase() === "sunny",
    },
    {
      id: 43,
      text: t("balconies"),
      show: data?.balconies?.toLowerCase() === "balconies",
    },
    {
      id: 44,
      text: t("yard"),
      show: data?.yard?.toLowerCase() === "yard",
    },
    {
      id: 45,
      text: t("commercial_spaces"),
      show: data?.commercial_spaces?.toLowerCase() === "commercial spaces",
    },
    {
      id: 46,
      text: t("generally_renovated"),
      show: data?.generally_renovated?.toLowerCase() === "generally renovated",
    },
    {
      id: 47,
      text: t("open_balcony"),
      show: data?.open_balcony?.toLowerCase() === "Open balcony",
    },
    {
      id: 48,
      text: t("stained_glass_windows"),
      show:
        data?.stained_glass_windows?.toLowerCase() === "stained glass windows",
    },
    {
      id: 49,
      text: t("partially_renovated"),
      show: data?.partially_renovated?.toLowerCase() === "partially renovated",
    },
    {
      id: 50,
      text: t("2_open_balconies"),
      show: data?.["2_open_balconies"]?.toLowerCase() === "2 Open balconies",
    },
    {
      id: 51,
      text: t("fireplace"),
      show: data?.fireplace?.toLowerCase() === "fireplace",
    },

    {
      id: 53,
      text: t("first_line"),
      show: data?.first_line?.toLowerCase() === "First line",
    },
    {
      id: 54,
      text: t("0_pointed"),
      show: data?.["0_pointed"]?.toLowerCase() === "0-pointed",
    },

    {
      id: 55,
      text: t("3_open_balconies"),
      show: data?.["3_open_balconies"]?.toLowerCase() === "3 Open balconies",
    },
    {
      id: 56,
      text: t("billiard"),
      show: data?.billiard?.toLowerCase() === "billiard",
    },
    {
      id: 57,
      text: t("secondary_line"),
      show: data?.secondary_line?.toLowerCase() === "Secondary line",
    },
    {
      id: 58,
      text: t("plastered"),
      show: data?.plastered?.toLowerCase() === "plastered",
    },
    {
      id: 59,
      text: t("beautiful_view"),
      show: data?.beautiful_view?.toLowerCase() === "beautiful view",
    },
    {
      id: 60,
      text: t("ping_pong"),
      show: data?.ping_pong?.toLowerCase() === "Ping pong",
    },
    {
      id: 61,
      text: t("for_residential_development"),
      show:
        data?.for_residential_development?.toLowerCase() ===
        "for residential development",
    },
    {
      id: 62,
      text: t("old_renovation"),
      show: data?.old_renovation?.toLowerCase() === "old renovation",
    },
    {
      id: 63,
      text: t("closed_balcony"),
      show: data?.closed_balcony?.toLowerCase() === "Closed balcony",
    },
    {
      id: 64,
      text: t("summer_kitchen"),
      show: data?.summer_kitchen?.toLowerCase() === "Summer kitchen",
    },
    {
      id: 65,
      text: t("agricultural"),
      show: data?.agricultural?.toLowerCase() === "agricultural",
    },
    {
      id: 66,
      text: t("designer_style_renovated"),
      show:
        data?.designer_style_renovated?.toLowerCase() ===
        "designer style renovated",
    },
    {
      id: 67,
      text: t("2_closed_balconies"),
      show:
        data?.["2_closed_balconies"]?.toLowerCase() === "2 closed balconies",
    },
    {
      id: 68,
      text: t("outdoor_hall"),
      show: data?.outdoor_hall?.toLowerCase() === "outdoor hall",
    },
    {
      id: 69,
      text: t("for_industrial_use"),
      show: data?.for_industrial_use?.toLowerCase() === "For Industrial Use",
    },
    {
      id: 70,
      text: t("euro_renovated"),
      show: data?.euro_renovated?.toLowerCase() === "euro renovated",
    },
    {
      id: 71,
      text: t("smart"),
      show: data?.smart?.toLowerCase() === "smart",
    },
    {
      id: 72,
      text: t("garden"),
      show: data?.garden?.toLowerCase() === "garden",
    },
    {
      id: 73,
      text: t("for_public_buildings"),
      show:
        data?.for_public_buildings?.toLowerCase() === "For Public Buildings",
    },
    {
      id: 74,
      text: t("cosmetic_renovated"),
      show: data?.cosmetic_renovated?.toLowerCase() === "Cosmetic renovated",
    },
    {
      id: 75,
      text: t("studio"),
      show: data?.studio?.toLowerCase() === "studio",
    },
    {
      id: 76,
      text: t("arbor"),
      show: data?.arbor?.toLowerCase() === "arbor",
    },
    {
      id: 77,
      text: t("for_general_purpose"),
      show: data?.for_general_purpose?.toLowerCase() === "For General Purpose",
    },
    {
      id: 78,
      text: t("not_inhabited"),
      show: data?.not_inhabited?.toLowerCase() === "not_inhabited",
    },
    {
      id: 79,
      text: t("duplex"),
      show: data?.duplex?.toLowerCase() === "duplex",
    },
    {
      id: 80,
      text: t("terrace"),
      show: data?.terrace?.toLowerCase() === "terrace",
    },
    {
      id: 81,
      text: t("playground"),
      show: data?.playground?.toLowerCase() === "playground",
    },
    {
      id: 82,
      text: t("fenced"),
      show: data?.fenced?.toLowerCase() === "fenced",
    },
    {
      id: 83,
      text: t("furnished"),
      show: data?.furnished?.toLowerCase() === "furnished",
    },
    {
      id: 84,
      text: t("penthouse"),
      show: data?.penthouse?.toLowerCase() === "penthouse",
    },

    {
      id: 86,
      text: t("near_the_bus_stop"),
      show: data?.near_the_bus_stop?.toLowerCase() === "Near the bus stop",
    },
    {
      id: 87,
      text: t("property_with_equipment"),
      show:
        data?.property_with_equipment?.toLowerCase() ===
        "Property with equipment",
    },
    {
      id: 88,
      text: t("iron_door"),
      show: data?.iron_door?.toLowerCase() === "Iron door",
    },
    {
      id: 89,
      text: t("pool"),
      show: data?.pool?.toLowerCase() === "pool",
    },
    {
      id: 90,
      text: t("elevator"),
      show: data?.elevator?.toLowerCase() === "elevator",
    },
    {
      id: 91,
      text: t("children"),
      show: data?.children?.toLowerCase() === "children",
    },
    {
      id: 92,
      text: t("Euro/modern_windows"),
      show:
        data?.["Euro/modern_windows"]?.toLowerCase() === "Euro/modern windows",
    },
    {
      id: 93,
      text: t("indoor_swimming_pool"),
      show:
        data?.indoor_swimming_pool?.toLowerCase() === "Indoor swimming pool",
    },
    {
      id: 94,
      text: t("cooling"),
      show: data?.cooling?.toLowerCase() === "cooling",
    },
    {
      id: 95,
      text: t("fountain"),
      show: data?.fountain?.toLowerCase() === "fountain",
    },
    {
      id: 96,
      text: t("warm"),
      show: data?.warm?.toLowerCase() === "warm",
    },
    {
      id: 97,
      text: t("kitchen_furniture"),
      show: data?.kitchen_furniture?.toLowerCase() === "kitchen furniture",
    },
    {
      id: 98,
      text: t("camera"),
      show: data?.camera?.toLowerCase() === "camera",
    },
    {
      id: 99,
      text: t("animal"),
      show: data?.animal?.toLowerCase() === "animal",
    },
    {
      id: 100,
      text: t("open_sofa"),
      show: data?.open_sofa?.toLowerCase() === "open sofa",
    },
    {
      id: 101,
      text: t("balcone_furniture"),
      show: data?.balcone_furniture?.toLowerCase() === "balcone furniture",
    },
    {
      id: 102,
      text: t("flat_furniture"),
      show: data?.flat_furniture?.toLowerCase() === "flat furniture",
    },
    {
      id: 103,
      text: t("clean"),
      show: data?.clean?.toLowerCase() === "clean",
    },
    {
      id: 104,
      text: t("parking"),
      show: data?.parking?.toLowerCase() === "parking",
    },
    {
      id: 105,
      text: t("smooke"),
      show: data?.smooke?.toLowerCase() === "smooke",
    },
    {
      id: 106,
      text: t("event"),
      show: data?.event?.toLowerCase() === "event",
    },
    {
      id: 107,
      text: t("work_table"),
      show: data?.work_table?.toLowerCase() === "work table",
    },
    {
      id: 108,
      text: t("gas_stove"),
      show: data?.gas_stove?.toLowerCase() === "gas stove",
    },
    {
      id: 109,
      text: t("refrigerator"),
      show: data?.refrigerator?.toLowerCase() === "refrigerator",
    },
    {
      id: 110,
      text: t("stove"),
      show: data?.stove?.toLowerCase() === "stove",
    },
    {
      id: 111,
      text: t("washing_machine"),
      show: data?.washing_machine?.toLowerCase() === "washing machine",
    },
    {
      id: 112,
      text: t("dryer"),
      show: data?.dryer?.toLowerCase() === "dryer",
    },
    {
      id: 113,
      text: t("dish"),
      show: data?.dish?.toLowerCase() === "dish",
    },
    {
      id: 114,
      text: t("bedding"),
      show: data?.bedding?.toLowerCase() === "bedding",
    },
    {
      id: 115,
      text: t("towel"),
      show: data?.towel?.toLowerCase() === "towel",
    },
    {
      id: 116,
      text: t("hygiene"),
      show: data?.hygiene?.toLowerCase() === "hygiene",
    },
    {
      id: 117,
      text: t("key_safe"),
      show: data?.key_safe?.toLowerCase() === "key safe",
    },
    {
      id: 118,
      text: t("swimming_pool"),
      show: data?.swimming_pool?.toLowerCase() === "swimming pool",
    },
    {
      id: 119,
      text: t("jacuzzi"),
      show: data?.jacuzzi?.toLowerCase() === "jacuzzi",
    },
    {
      id: 120,
      text: t("sauna"),
      show: data?.sauna?.toLowerCase() === "sauna",
    },
    {
      id: 121,
      text: t("chat_room"),
      show: data?.chat_room?.toLowerCase() === "chat room",
    },
    {
      id: 122,
      text: t("from_street"),
      show: data?.from_street?.toLowerCase() === "from street",
    },
    {
      id: 123,
      text: t("common_street"),
      show: data?.common_street?.toLowerCase() === "common street",
    },
    {
      id: 124,
      text: t("common_yard"),
      show: data?.common_yard?.toLowerCase() === "common yard",
    },
  ];
};
