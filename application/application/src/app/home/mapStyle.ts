/*
feature Types: 
    all (default) selects all features.
    administrative selects all administrative areas. Styling affects only the labels of administrative areas, not the geographical borders or fill.
        administrative.country selects countries.
        administrative.land_parcel selects land parcels.
        administrative.locality selects localities.
        administrative.neighborhood selects neighborhoods.
        administrative.province selects provinces.
    landscape selects all landscapes.
        landscape.man_made selects man-made features, such as buildings and other structures.
        landscape.natural selects natural features, such as mountains, rivers, deserts, and glaciers.
        landscape.natural.landcover selects land cover features, the physical material that covers the earth's surface, such as forests, grasslands, wetlands, and bare ground.
        landscape.natural.terrain selects terrain features of a land surface, such as elevation, slope, and orientation.
    poi selects all points of interest.
        poi.attraction selects tourist attractions.
        poi.business selects businesses.
        poi.government selects government buildings.
        poi.medical selects emergency services, including hospitals, pharmacies, police, doctors, and others.
        poi.park selects parks.
        poi.place_of_worship selects places of worship, including churches, temples, mosques, and others.
        poi.school selects schools.
        poi.sports_complex selects sports complexes.
    road selects all roads.
        road.arterial selects arterial roads.
        road.highway selects highways.
        road.highway.controlled_access selects highways with controlled access.
        road.local selects local roads.
    transit selects all transit stations and lines.
        transit.line selects transit lines.
        transit.station selects all transit stations.
        transit.station.airport selects airports.
        transit.station.bus selects bus stops.
        transit.station.rail selects rail stations.
    water selects bodies of water.

element Types:
    all (default) selects all elements of the specified feature.
    geometry selects all geometric elements of the specified feature.
        geometry.fill selects only the fill of the feature's geometry.
        geometry.stroke selects only the stroke of the feature's geometry.
    labels selects the textual labels associated with the specified feature.
        labels.icon selects only the icon displayed within the feature's label.
        labels.text selects only the text of the label.
        labels.text.fill selects only the fill of the label. The fill of a label is typically rendered as a colored outline that surrounds the label text.
        labels.text.stroke selects only the stroke of the label's text.

stylers:
    lightness (a floating point value between -100 and 100) indicates the percentage change in brightness of the element. Negative values increase darkness (where -100 specifies black) while positive values increase brightness (where +100 specifies white).
    saturation (a floating point value between -100 and 100) indicates the percentage change in intensity of the basic color to apply to the element.
    gamma (a floating point value between 0.01 and 10.0, where 1.0 applies no correction) indicates the amount of gamma correction to apply to the element. Gamma corrections modify the lightness of colors in a non-linear fashion, while not affecting white or black values. Gamma correction is typically used to modify the contrast of multiple elements. For example, you can modify the gamma to increase or decrease the contrast between the edges and interiors of elements.
    invert_lightness (if true) inverts the existing lightness. This is useful, for example, for quickly switching to a darker map with white text.
    visibility (on, off, or simplified) indicates whether and how the element appears on the map. A simplified visibility removes some style features from the affected features; roads, for example, are simplified into thinner lines without outlines, while parks lose their label text but retain the label icon.
    color (an RGB hex string of format #RRGGBB) sets the color of the feature.
    weight (an integer value, greater than or equal to zero) sets the weight of the feature, in pixels. Setting the weight to a high value may result in clipping near tile borders.
*/

export const MapStyle = 
[
  {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "weight": "2.00"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#9c9c9c"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#f2f2f2"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 45
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#eeeeee"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7b7b7b"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#46bcec"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#c8d7d4"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#070707"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  }
]
  