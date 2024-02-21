var mapBounds = new OpenLayers.Bounds( 138.946917608, 34.8595085149, 140.880359108, 36.465420081);
var mapMinZoom = 0;
var mapMaxZoom = 17;

function init() {
    var options = {
        projection: new OpenLayers.Projection("EPSG:900913"),
        maxResolution:156543.0339,
        maxExtent: new OpenLayers.Bounds(-20037508.3427892,-20037508.3427892,20037508.3427892,20037508.3427892),
	    units: "m",
        controls: [
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.Permalink(),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.Navigation()
        ],
        numZoomLevels: 18,
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    }

    // マップ生成
    var map = new OpenLayers.Map('map',options);
    map.div.style.backgroundColor = 'rgb(255,255,255)';

    // 迅速測図
//    var rapid = new OpenLayers.Layer.TMS(
//        "https://habs.dc.affrc.go.jp/rapid16/",

var rapid = new OpenLayers.Layer.XYZ(
        "迅速測図（1880年代）",
        "https://boiledorange73.sakura.ne.jp/ws/tile/Kanto_Rapid-900913/{z}/{x}/{y}.png",

        {
//           "getURL": getUrlByXYZ,
            type: "png",
            numZoomLevels: 17,
            isBaseLayer: true
        }
    );

    // 電子国土基本図xyz対応　2014.01.09 hirakawa
    var cjmap = new OpenLayers.Layer.XYZ(
        "電子国土基本図(地図情報)",
        "https://cyberjapandata.gsi.go.jp/xyz/std/${z}/${x}/${y}.png",
        {
          //getURL: getCyberJapanUrl(bounds) ,
          attribution: "電子国土",
          maxZoomLevel: 17
        }
    );

    // 電子国土オルソxyz対応　2014.01.09 hirakawa
    var cjort = new OpenLayers.Layer.XYZ(
        "電子国土基本図(オルソ画像)",
        "https://cyberjapandata.gsi.go.jp/xyz/ort/${z}/${x}/${y}.jpg",
        {
          //getURL: getCyberJapanUrl(bounds) ,
          attribution: "電子国土",
          maxZoomLevel: 17
        }
    );

    // 電子国土1970年画像xyz対応　2014.01.09 hirakawa
    var cjgazo = new OpenLayers.Layer.XYZ(
        "国土画像情報第1期(1970年代)",
        "https://cyberjapandata.gsi.go.jp/xyz/gazo1/${z}/${x}/${y}.jpg",
        {
          //getURL: getCyberJapanUrl(bounds) ,
          attribution: "電子国土",
          maxZoomLevel: 17
        }
    );

    //var cjmap = new OpenLayers.Layer.TMS(
    // "電子国土基本図(地図情報)",
    //"",
    // {
    //   "getURL": function(bounds) {
    //     return getCyberJapanUrl(this, bounds, "map");
    //   },
    //   type: "png",
    //   attribution: '<a target=\"_blank\" href="http://portal.cyberjapan.jp/site/mapuse4/index.html">電子国土Web.NEXT</a>',
    //   isBaseLayer: true
    // }
    //);

    //var cjairphoto = new OpenLayers.Layer.TMS(
    //"電子国土基本図(オルソ画像)",
    //"",
    //{
    //  "getURL": function(bounds) {
    //    return getCyberJapanUrl(this, bounds, "airphoto");
    //  },
    //  type: "png",
    //  attribution: '<a target=\"_blank\" href="http://portal.cyberjapan.jp/site/mapuse4/index.html">電子国土Web.NEXT</a>',
    //  isBaseLayer: true
    //}
    //);

    //var cjairphoto70 = new OpenLayers.Layer.TMS(
    //  "国土画像情報第1期(1970年代)",
    //  "",
    //  {
    //    "getURL": function(bounds) {
    //      return getCyberJapanUrl(this, bounds, "airphoto70");
    //    },
    //    type: "jpg",
    //    attribution: '<a target=\"_blank\" href="http://portal.cyberjapan.jp/site/mapuse4/index.html">電子国土Web.NEXT</a>',
    //    isBaseLayer: true
    //  }
    //);

    // 基盤地図情報
    var kibantms = new OpenLayers.Layer.TMS(
        "基盤地図情報25000",
        "https://www.finds.jp/ws/tmc/",
        {
            layername: "KBN25000ANF-900913",
            type: "png",
            attribution: '<a target="_blank" href="http://www.finds.jp/tmc/index.html.ja">タイル地図キャッシュサービス</a>',
            isBaseLayer: true
        }
    );

    // 土地利用タイル化　2014.01.15 hirakawa
    var landuse = new OpenLayers.Layer.TMS(
        "土地利用図（1997年）",
        "https://habs.rad.naro.go.jp/lu97/",
        {
            "getURL": getUrlByXYZ,
            type: "png",
            alpha: true,
       },
       {isBaseLayer:true,visibility:false} ,
       {buffer: 0} 
    );
    
    //var landuse = new OpenLayers.Layer.WMS(
    //    "土地利用図（1997年）", "http://habs.dc.affrc.go.jp/geoserver201/gwc/service/wms",
    //    {
    //        srs: 'EPSG:900913',
    //        layers: 'habs:land100_ll',
    //        styles: '',
    //        format: 'image/png',
    //        tiled: 'true'
    //    },
    //    {buffer: 0} 
    //);
    
    // 東京5千分の1タイル化　2014.01.15 hirakawa
    var tokyo5k = new OpenLayers.Layer.TMS(
        "東京五千分の一（1880年代）",
        "https://habs.rad.naro.go.jp/tokyo5k/",
        {
            "getURL": getUrlByXYZ,
            type: "png",
            numZoomLevels: 18,
            alpha: true,
       },
       {isBaseLayer:true,visibility:false} ,
       {buffer: 0} 
    );

    //var tokyo5k = new OpenLayers.Layer.WMS(
	//    "東京五千分の一（1880年代）", "http://habs.dc.affrc.go.jp/geoserver201/gwc/service/wms",
    //    {
    //         srs: 'EPSG:900913',
    //         layers: 'habs:tokyo5000_latlon',
    //         format: 'image/png'
    //    },
    //    {isBaseLayer:true,visibility:false} ,
    //    {buffer: 0} 
    //);

//    //seamless
//    var svg_basic = new OpenLayers.Layer.XYZ(
//      "シームレス地質図",
//      "",
//      {
//        "getURL": getUrlByXYZ_sem,
//        isBaseLayer: true
//      }        
//    );


    // オーバーレイ迅速測図
    var rapid_overlay = new OpenLayers.Layer.TMS(
        "迅速測図(透過)",
        "https://habs.rad.naro.go.jp/rapid16/",
        {
            "getURL": getUrlByXYZ,
            type: "png",
            alpha: true,
            isBaseLayer:false,
            visibility:false
       },
       {buffer: 0} 
    );
    
    // オーバーレイラインタイル化　2014.01.09 hirakawa
    var line_overlay = new OpenLayers.Layer.TMS(
        "基盤情報",
        "https://habs.rad.naro.go.jp/lines/",
        {
            "getURL": getUrlByXYZ,
            type: "png",
            alpha: true,
            isBaseLayer:false,
            visibility:true
       },
       {buffer: 0} 
    );
    
    

    if (OpenLayers.Util.alphaHack() == false) { rapid_overlay.setOpacity(0.5); }
            
        // マップにレイヤを追加
        map.addLayers([rapid,cjmap,cjort,cjgazo,kibantms,landuse,tokyo5k,rapid_overlay,line_overlay]);

        if( !map.getCenter() ) {
            var lonlat = new OpenLayers.LonLat(139.75339, 35.68428);
            lonlat.transform(map.displayProjection,map.getProjectionObject());
            map.setCenter(lonlat, 15);
        }
        
    }



function getUrlByXYZ(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    if (/*mapBounds.intersectsBounds( bounds ) && */ z >= mapMinZoom && z <= mapMaxZoom ) {
        console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    } else {
        return "";
    }
}

// コメントアウトＯＫ？？？　tokitoki
//var cjdatasets = {
//  "map": [
//    null,null,null,null,null,"JAIS","JAIS","JAIS","JAIS","BAFD1000K","BAFD1000K","BAFD1000K","BAFD200K","BAFD200K","BAFD200K","DJBMM","DJBMM","DJBMM"
//  ],
//  "airphoto": [
//    null,null,null,null,null,"JAIS","JAIS","JAIS","JAIS","BAFD1000K","BAFD1000K","BAFD1000K","BAFD200K","BAFD200K","BAFD200K","DJBMO","DJBMO","DJBMO"
//  ],
//  "airphoto70": [
//    null,null,null,null,null,"JAIS","JAIS","JAIS","JAIS","BAFD1000K","BAFD1000K","BAFD1000K","BAFD200K","BAFD200K","BAFD200K","NLII1","NLII1","NLII1"
//  ],
//};


//function getCyberJapanUrl_map(bounds) {
//  getCyberJapanUrl(this, bounds, "map");
//}

//function getCyberJapanUrl_airphoto(bounds) {
  
//}

//function getCyberJapanUrl(_this, bounds, type) {
//  var res = _this.map.getResolution();
//  var x = Math.round((bounds.left - _this.maxExtent.left) / (res * _this.tileSize.w));
//  var y = Math.round((bounds.bottom - _this.tileOrigin.lat) / (res * _this.tileSize.h));
//  var z = _this.map.getZoom();

//  var dataset = cjdatasets[type];
//  if( dataset && dataset[z] ) {
//    var data = dataset[z];
//    var suffix = (data=="DJBMM" ? "png" : "jpg");
//    // upside down
//    y = (1 << z) - y - 1;
//    var tx = x + "";
//    var ty = y + "";
//    var txp = 7 - tx.length;
//    var typ = 7 - ty.length;
//    if( txp > 0 ) {
//      tx = "0000000".substr(0,txp) + tx;
//    }
//    if( typ > 0 ) {
//      ty = "0000000".substr(0,typ) + ty;
//    }

//    var src = "http://cyberjapandata.gsi.go.jp/sqras/all/" +
//      data + "/latest/" + z + "/";
//    // インデクス
//    for( var n = 0; n < 6; n++ ) {
//      src = src + tx.charAt(n) + ty.charAt(n) + "/";
//    }
//    src = src + tx + ty + "." + suffix;
//    return src;
//  }
//  return "";
//};

//function getUrlByXYZ_sem(bounds) {
//    var res = this.map.getResolution();
//    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
//    var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
//    var z = this.map.getZoom();
    
//    y = (1 << z) - y - 1;
//    var tx = x + "";
//    var ty = y + "";
//    var txp = 7 - tx.length;
//    var typ = 7 - ty.length;

//    if ( z >= mapMinZoom && z <= mapMaxZoom ) {
//        //alert( "http://gsj-seamless.jp/wmts/tile512.php?type=basic&layer=geol&z=" + z + "/" + txp + "/" + typ);
//        return "http://riodb02.ibase.aist.go.jp/db084/detailed/geol/" + z + "/" + y + "/" + x + ".png"  ;
//    } else {
//        return "";
//    }

//};

// window.onload = init;
