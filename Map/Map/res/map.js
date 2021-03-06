var map;					//! マップ オブジェクト。
var geo;					//! Geo コード取得用オブジェクト。
var isInitialized = false;	//!

/**
 * マップの初期化を行います。
 */
function initialize()
{
	var mapdiv    = document.getElementById( "map_canvas" );
	var myOptions = { zoom: 16, center: new google.maps.LatLng( 35.6894876, 139.6917064 ), mapTypeId: google.maps.MapTypeId.ROADMAP, scaleControl: true };
	map           = new google.maps.Map( mapdiv, myOptions );
	geo           = new google.maps.Geocoder();

	// マップの中央位置が更新された時のイベント
	google.maps.event.addListener( map, 'center_changed', function()
	{
		setTimeout( getLocation, 200 );
	});

	// マップのタイル読み込みが完了した時のイベント
	google.maps.event.addListener( map, 'tilesloaded', function()
	{
		// 起動時に一度だけ座標を更新する
		if( !isInitialized )
		{
			isInitialized = true;
			getLocation();
		}
	});
}

//スクリプトエラーポップアップを抑止
function noError() {
    return true;
}
window.onerror = noError;

/**
 * 現在位置の緯度・経度を取得してマネージ コードへ設定します。
 */
function getLocation()
{
	window.external.Location = "緯度 : " + map.getCenter().lat() + "、経度 : " + map.getCenter().lng();
}

/**
 * 指定された住所の座標へ、マップを移動します。
 *
 * @param[in]	address	住所。
 */
function moveMap( address )
{
	if( geo )
	{
		geo.geocode( { 'address': address }, function( results, status )
		{
			if( results && results[ 0 ] )
			{
				map.setCenter( results[ 0 ].geometry.location );
				getLocation();
			}
		});
	}
}

rendererOptions = {
    draggable: true,
    preserveViewport: false
};
var directionsDisplay =
  new google.maps.DirectionsRenderer(rendererOptions);
var directionsService =
  new google.maps.DirectionsService();
var map;

function initialize2() {
    var zoom = 7;
    var mapTypeId = google.maps.MapTypeId.ROADMAP

    var opts = {
        zoom: zoom,
        mapTypeId: mapTypeId
    };
    map = new google.maps.Map
    (document.getElementById("map_canvas"), opts);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(directionsDisplay,
      'directions_changed', function () {
      });
    calcRoute();
}

function calcRoute() {
    var request = {
        origin: "東京",
        destination: "大阪",
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.DirectionsUnitSystem.METRIC,
        optimizeWaypoints: true,
        avoidHighways: false,
        avoidTolls: false
    };
    directionsService.route(request,
     function (response, status) {
         if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
         }
     });
}
