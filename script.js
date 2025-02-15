/**
 * This example uses pulsating circles CSS by Kevin Urrutia
 * https://kevinurrutia.tumblr.com/post/16411271583/creating-a-css3-pulsating-circle
 */

var map = AmCharts.makeChart("chartdiv", {
    type: "map",
    "theme": "light",
    pathToImages: "https://www.amcharts.com/lib/3/images/",

    imagesSettings: {
        rollOverColor: "#089282",
        rollOverScale: 3,
        selectedScale: 3,
        selectedColor: "#089282",
        color: "#13564e"
    },

    zoomControl: {
        buttonFillColor: "#15A892"
    },

    areasSettings: {
        unlistedAreasColor: "#15A892"
    },

    dataProvider: {
        map: "worldLow",
        images: [{
            zoomLevel: 7,
            scale: 0.5,
            title: "Brussels",
            latitude: 50.8371,
            longitude: 4.3676
        }, {
            zoomLevel: 10,
            scale: 0.5,
            title: "Copenhagen",
            latitude: 55.6763,
            longitude: 12.5681
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Paris",
            latitude: 48.8567,
            longitude: 2.3510
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Reykjavik",
            latitude: 64.1353,
            longitude: -21.8952
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Moscow",
            latitude: 55.7558,
            longitude: 37.6176
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Madrid",
            latitude: 40.4167,
            longitude: -3.7033
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "London",
            latitude: 51.5002,
            longitude: -0.1262,
            url:"https://www.google.co.uk"
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Peking",
            latitude: 39.9056,
            longitude: 116.3958
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "New Delhi",
            latitude: 28.6353,
            longitude: 77.2250
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Tokyo",
            latitude: 35.6785,
            longitude: 139.6823,
            url:"https://www.google.co.jp"
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Ankara",
            latitude: 39.9439,
            longitude: 32.8560
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Buenos Aires",
            latitude: -34.6118,
            longitude: -58.4173
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Brasilia",
            latitude: -15.7801,
            longitude: -47.9292
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Ottawa",
            latitude: 45.4235,
            longitude: -75.6979
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Washington",
            latitude: 38.8921,
            longitude: -77.0241
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Kinshasa",
            latitude: -4.3369,
            longitude: 15.3271
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Cairo",
            latitude: 30.0571,
            longitude: 31.2272
        }, {
            zoomLevel: 5,
            scale: 0.5,
            title: "Pretoria",
            latitude: -25.7463,
            longitude: 28.1876
        }]
    }
});

// add events to recalculate map position when the map is moved or zoomed
map.addListener("positionChanged", updateCustomMarkers);

// this function will take current images on the map and create HTML elements for them
function updateCustomMarkers (event) {
    // get map object
    var map = event.chart;
    
    // go through all of the images
    for( var x in map.dataProvider.images) {
        // get MapImage object
        var image = map.dataProvider.images[x];
        
        // check if it has corresponding HTML element
        if ('undefined' == typeof image.externalElement)
            image.externalElement = createCustomMarker(image);

        // reposition the element accoridng to coordinates
        image.externalElement.style.top = map.latitudeToY(image.latitude) + 'px';
        image.externalElement.style.left = map.longitudeToX(image.longitude) + 'px';
    }
}

// this function creates and returns a new marker element
function createCustomMarker(image) {
    // create holder
    var holder = document.createElement('div');
    holder.className = 'map-marker';
    holder.title = image.title;
    holder.style.position = 'absolute';
    
    // maybe add a link to it?
    if (undefined != image.url) {
        holder.onclick = function() {
            window.location.href = image.url;
        };
        holder.className += ' map-clickable';
    }
    
    // create dot
    var dot = document.createElement('div');
    dot.className = 'dot';
    holder.appendChild(dot);
    
    // create pulse
    var pulse = document.createElement('div');
    pulse.className = 'pulse';
    holder.appendChild(pulse);
    
    // append the marker to the map container
    image.chart.chartDiv.appendChild(holder);
    
    return holder;
}