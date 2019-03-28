// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

define(["esri/declare","dojo/_base/lang","dojo/on","dojo/string","esri/dijit/geoenrichment/promise/all","esri/dijit/geoenrichment/when","esri/graphic","esri/geometry/jsonUtils","esri/tasks/locator","esri/tasks/FeatureSet","esri/tasks/geoenrichment/GeoenrichmentTask","esri/tasks/geoenrichment/EnrichParameters","esri/tasks/geoenrichment/RingBuffer","esri/tasks/geoenrichment/DriveBuffer","esri/tasks/geoenrichment/GeographyLevel","esri/tasks/geoenrichment/GeometryStudyArea","esri/tasks/geoenrichment/AddressStudyArea","esri/tasks/geoenrichment/studyAreaFromJson","./_Invoke","./config","./utils/lang","./infographicUtils/bufferTitle","./infographicUtils/DataProvider"],function(e,t,s,n,r,i,a,o,u,h,l,c,f,d,y,v,m,g,p,_,k,b,V){function D(e){var t=e.toJson();return delete t.returnGeometry,delete t.comparisonLevels,delete t.attributes,t=JSON.stringify(t)}var J=e(null,{_keys:null,_values:null,_capacity:5,constructor:function(e){this._keys=[],this._values={},e&&(this._capacity=e)},getValue:function(e){return this._values[e]},setValue:function(e,t){this._keys.push(e),this._values[e]=t,this._removeOverflow()},hasValue:function(e){return this._values.hasOwnProperty(e)},_removeOverflow:function(){if(this._keys.length>this._capacity)for(var e=this._keys.splice(0,this._keys.length-this._capacity),t=0;t<e.length;t++)delete this._values[e[t]]},setCapacity:function(e){this._capacity=e,this._removeOverflow()},toJson:function(){var e={};for(var t in this._values){var s=this._values[t];void 0===s||null===s||"number"==typeof s&&isNaN(s)||("string"==typeof s||"boolean"==typeof s||"number"==typeof s?e[t]=s:"object"==typeof s&&s.toJson&&(e[t]=s.toJson()))}return{keys:this._keys.slice(),values:e,capacity:this._capacity}},fromJson:function(e,t){if(e){this._keys=e.keys,this._capacity=e.capacity,this._values={};for(var s in e.values)this._values[s]=t?t(e.values[s]):e.values[s]}}}),A=e(null,{_values:null,constructor:function(e){this._values=new J(e)},getValue:function(e){var t=this.keyToString(e);if(this._values.hasValue(t))return this._values.getValue(t);var s=this;return this.keyToValue(e).then(function(e){return s._values.setValue(t,e),e})},keyToString:function(e){return JSON.stringify(e)},keyToValue:function(e){throw"Not implemented"},setCapacity:function(e){this._values.setCapacity(e)},toJson:function(){return this._values.toJson()},fromJson:function(e,t){e&&this._values.fromJson(e,t)}}),C=e([A],{keyToString:function(e){return JSON.stringify(e.toJson())},keyToValue:function(e){return new u(_.locatorUrl).locationToAddress(e).then(function(e){return n.substitute(_.addressFormat,e.address,function(e){return e||""})},function(e){return""})}}),w=e([A],{_countryValues:null,_geometries:null,constructor:function(){this._countryValues=new J,this._geometries=new J(3)},keyToValue:function(e){var t,s,n=this,r=g(e.studyArea),i=r.returnGeometry;i&&(s=D(r),t=this._geometries.hasValue(s));var a=i&&!t,o=new l(_.server);o.token=_.token;for(var u=null,h=r.comparisonGeographyLevels.length-1;h>=0;h--)"Admin1"==r.comparisonGeographyLevels[h].layerID&&(u=r.comparisonGeographyLevels.splice(h,1)[0]);var f,d;u&&(f=JSON.stringify({variables:e.variables,country:e.country}),(d=this._countryValues.hasValue(f))||r.comparisonGeographyLevels.push(u));var y=new c;return y.forStorage=!1,y.countryID=e.country,y.variables=e.variables,r.returnGeometry=a,a&&(y.outSR=r.geometry?r.geometry.spatialReference:e.outSR),y.studyAreas.push(r),o.enrich(y).then(function(e){var r=e.featureSets[0].features;return u&&(d?r.push(n._countryValues.getValue(f)):n._countryValues.setValue(f,r[r.length-1])),i&&(t?r[0].geometry=n._geometries.getValue(s):n._geometries.setValue(s,r[0].geometry)),e.featureSets[0]})},setCapacity:function(e){this.inherited(arguments),this._countryValues.setCapacity(e)},toJson:function(){var e=this.inherited(arguments);return e.countryValues=this._countryValues.toJson(),e.geometries=this._geometries.toJson(),e},fromJson:function(e){e&&(this._countryValues.fromJson(e.countryValues,function(e){return new a(e)}),this._geometries.fromJson(e.geometries,function(e){return o.fromJson(e)}),this.inherited(arguments,[e,function(e){return new h(e)}]))}}),G=e([A],{metadata:null,_enrichCache:null,_addressCache:null,constructor:function(e){this._enrichCache=new w(e),this._addressCache=new C(3)},keyToValue:function(e){var t=this,s=[],n=e.returnAddress;delete e.returnAddress,s.push(this._enrichCache.getValue(e));var i=g(e.studyArea);return n&&s.push(this._addressCache.getValue(i.geometry)),r(s).then(function(e){var s=e[0],r=s.features[0];return r.attributes[t.metadata.name]||(r.attributes[t.metadata.name]=b(i.getGeomType(),i.options),n?r.attributes[t.metadata.address]=e[1]:i instanceof m&&(r.attributes[t.metadata.address]=i.address.text)),s})},setCapacity:function(e){this.inherited(arguments),this._enrichCache.setCapacity(e)},toJson:function(){var e=this.inherited(arguments);return e.metadata=t.clone(this.metadata),e.enrichCache=this._enrichCache.toJson(),e.addressCache=this._addressCache.toJson(),e},fromJson:function(e){e&&(this.metadata=e.metadata,this._enrichCache.fromJson(e.enrichCache),this._addressCache.fromJson(e.addressCache),this.inherited(arguments,[e,function(e){return new h(e)}]))}});return e("esri.dijit.geoenrichment.Geoenrichment",[V,p],{country:null,returnGeometry:!1,returnAddress:!1,returnData:!0,studyArea:null,outSR:null,buffer:null,variables:null,levels:null,highestLevel:null,data:null,restartOnDone:!1,requests:null,started:!1,cache:null,constructor:function(){this.buffer=new f,this.cache=new G,this.cache.metadata=this.metadata},getData:function(){return this.data},getGeometry:function(){return this.data.features[0].geometry},isBusy:function(){return this.pendingInvoke("requestData")||this.requests||this.restartOnDone},setBuffer:function(e){this.buffer=e,this.invalidate()},getBuffer:function(){return this.buffer},setStudyArea:function(e){this.studyArea=e,this.invalidate()},setVariables:function(e){k.arraysEqual(this.variables,e)||(this.variables=e,this.invalidateData())},setGeoLevels:function(e,t){k.arraysEqual(this.levels,e)&&this.highestLevel==t||(this.levels=e,this.highestLevel=t,this.invalidateData())},setReturnAddress:function(e){this.returnAddress!=e&&(this.returnAddress=e,e&&this.invalidateData())},setCacheLimit:function(e){this.cache.setCapacity(e)},invalidateData:function(){this.data=null,this.invalidate()},invalidate:function(){this.pendingInvoke("requestData")||(this.requests?this.restartOnDone=!0:(this.geometry=null,this.invoke("requestData")))},requestData:function(){if(this.studyArea&&this.variables&&this.buffer){this.requests=[],this.started||(s.emit(this,"start"),this.started=!0);var e,n=this.buffer,r=!1;if(this.studyArea instanceof v)switch(this.studyArea.geometry.type){case"point":r=this.returnAddress;break;case"polyline":this.buffer instanceof d&&(n=new f);break;case"polygon":n=null}var a=t.clone(this.studyArea);if(!a.options&&n&&(a.options=n),this.levels)for(var o=0;o<this.levels.length;o++)a.comparisonGeographyLevels.push(new y({layerID:this.levels[o]}));this.highestLevel&&a.comparisonGeographyLevels.push(new y({layerID:this.highestLevel})),a.returnGeometry=this.returnGeometry,e=i(this.cache.getValue({country:this.country,variables:this.variables,returnData:this.returnData,studyArea:a.toJson(),outSR:this.outSR,returnAddress:r})),this.requests.push(e),e.then(t.hitch(this,this.handleResponse),t.hitch(this,this.handleError))}},stop:function(){if(this.restartOnDone=!1,this.cancelInvoke("requestData"),this.requests)for(var e=this.requests.slice(0),t=0;t<e.length;t++)e[t].cancel()},handleResponse:function(e){try{this.data=e,this.data.features[0].attributes.isThisArea=!0,this.onDone(null)}catch(e){this.onDone(e)}},handleError:function(e){this.onDone(e)},onDone:function(e){this.requests=null,e?"CancelError"!==e.name&&(console.log(e),s.emit(this,"error",e)):s.emit(this,"data"),this.restartOnDone?(this.invalidate(),this.restartOnDone=!1):(s.emit(this,"end"),this.started=!1)}})});