function wyspy_STL_off(feature) {
	return {
		color: "black",
		fillColor: "green",
		fillOpacity: 0.5,
		weight: 2
	};
}

function polygon_STL_on(feature) {
	return {
		color: "red",
		fillColor: "orange",
		fillOpacity: 0.8,
		weight: 2
	};
}

function wyspy_oEF (feature,layer) {
	var props = feature.properties;
	var center = layer.getBounds().getCenter();
	var tt = L.tooltip(center, {content: props.nazwa, direction: 'center'})
	layer.on('mouseover', function () {
		layer.setStyle(polygon_STL_on(feature));
		tt.openOn(full_map);
	});
	layer.on('mouseout', function () {
		layer.setStyle(wyspy_STL_off(feature));
		full_map.closePopup(tt);
	});
}

var region_colors = {
	"Lizdest": "#0a184d",
	"Kustau": "#88693f",
	"Pictania": "#2d6b66",
	"Hergad": "#ab4e4e",
	"Holle": "#e7c743",
	"Enemau": "#777924",
	"Amer": "#722722",
	"Druidzi": "#425a39",
	"Kuebenburg": "#923d1d",
	"Atmony": "#87ab6e",
	"Fõsslandy": "#6c3472",
	"Puste": "#ffffff",
	"Krabalor": "#de5050",
	"Deben": "#3c8d4d",
	"Hithamilia": "#cccccc",
	"Fynathiza": "#674b8c",
	"Asparyzja": "#9a3434",
	"Piectuva": "#304329",
	"Kožara": "#4d3c31",
	"Amshteyn": "#2c2c2c",
	"Draakland": "#375faf",
	"Wilgid": "#771b36",
	"Ortemark": "#275f8f",
	"Innau": "#4b5d8d"
};

var species_colors = {
	"L": "red",
	"D": "green",
	"P": "silver",
	"DL": "blue"
};

function regiony_STL_off(feature) {
    var selectedStyle = document.getElementById("styleSelect").value;
    var props = feature.properties;
    
    
    
    return {
        color: "black",
        fillColor: selectedStyle === "traditional" ? (region_colors[props.kraina] || "#ffffff") : (species_colors[props.gatunek] || "#ffffff"),
        fillOpacity: 0.7,
        weight: 2
    };
}


function regiony_oEF(feature, layer) {
	var props = feature.properties;
	var center = layer.getBounds().getCenter();
	var tt = L.tooltip(center, {content: props.nazwa, direction: 'center'});
	layer.on('mouseover', function () {
		layer.setStyle(polygon_STL_on(feature));
		layer.bringToFront();
		tt.openOn(full_map);
	});
	layer.on('mouseout', function () {
		layer.setStyle(regiony_STL_off(feature));
		layer.bringToBack();
		full_map.closePopup(tt);
	});
}

function miasta_PToL(feature,latlng) {
	var props = feature.properties;
	var mki = L.icon.mapkey({icon:props.ikona,color:'white',background:'red',size:30});
	return L.marker(latlng,{icon:mki});
}

function miasta_oEF (feature,layer) {
	var props = feature.properties;
	layer.bindTooltip(props.nazwa+'<br>'+props.opis);
}