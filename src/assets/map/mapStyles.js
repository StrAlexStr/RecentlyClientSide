const styleExport = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#444444",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#e6e6e6",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        hue: "#ff0000",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e2b4bd",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        hue: "#ff0000",
      },
      {
        saturation: "1",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        hue: "#ff0000",
      },
      {
        saturation: "-100",
      },
    ],
  },
  {
    featureType: "transit.station.airport",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station.bus",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "transit.station.rail",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        hue: "#ff7e00",
      },
      {
        saturation: "-100",
      },
      {
        lightness: "19",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#d7d7d7",
      },
      {
        visibility: "on",
      },
    ],
  },
];

export default styleExport;
