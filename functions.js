function polygon_STL_on(feature) {
	return {
		color: "red",
		fillColor: "orange",
		fillOpacity: 0.8,
		weight: 2
	};
}

var region_colors = {
	"Lizdest": "#0a184d",
	"Kustau": "#88693f",
	"Pictania": "#2d6b66",
	"Hergad": "#ab4e4e",
	"Holle": "#e7c743",
	"Enemau": "#777924",
	"Amer": "#722722",
	"Ziemie Druidzkie": "#425a39",
	"Kuebenburg": "#923d1d",
	"Atmony": "#87ab6e",
	"Fõsslandy": "#6c3472",
	"Puste": "#ffffff",
	"Wyspy Krabalora": "#de5050",
	"Deben": "#3c8d4d",
	"Hithamilia": "#cccccc",
	"Fynathiza": "#674b8c",
	"Asparyzja": "#9a3434",
	"Piectuva": "#304329",
	"Kožara i Nutžara": "#4d3c31",
	"Góry Amshteyn": "#2c2c2c",
	"Draakland": "#375faf",
	"Wilgid": "#771b36",
	"Ortemark": "#275f8f",
	"Innau": "#4b5d8d"
};

var species_colors = {
	"Ludzie": "#ff0000",
	"Druidzi": "#009933",
	"Peblemy": "#2c2c2c",
	"Druidzi i Ludzie": "#804c1a",
	"Krabolorianie": "#FF6699",
	"Grzybcy": "#cc00ff",
	"Lotozaury": "#00CCFF"
};

function polygon_STL_off(feature) {
    var mode = document.getElementById("select_mode").value;
    var props = feature.properties;
    return {
        color: "black",
        fillColor: mode === "traditional" ? (region_colors[props.kraina] || "#ffffff") : (species_colors[props.gatunek] || "#ffffff"),
        fillOpacity: 0.7,
        weight: 2
    };
}

function polygon_TT_content(feature) {
    var mode = document.getElementById("select_mode").value;
    var props = feature.properties;
    return {
        content: "<strong>" + props.nazwa + "</strong><br>" + 
                 (mode === "traditional" ? props.kraina : props.gatunek),
        direction: 'center'
    };
}

function polygon_oEF(feature, layer) {
    var center = layer.getBounds().getCenter();
    var tt = L.tooltip({
        permanent: false,
        direction: 'center'
    }).setLatLng(center);
    layer.on('mouseover', function () {
        if (typeof polygon_STL_on === "function") {
            layer.setStyle(polygon_STL_on(feature));
        }
        layer.bringToFront();
        tt.setContent(polygon_TT_content(feature).content);
        full_map.openTooltip(tt);
    });
    layer.on('mouseout', function () {
        layer.setStyle(polygon_STL_off(feature));
        layer.bringToBack();
        full_map.closeTooltip(tt);
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