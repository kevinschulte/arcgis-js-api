// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../geometry","./georeference","../../../views/3d/lib/glMatrix"],function(r,e,a,n,t){function o(){for(var r=h.faceDescriptions,e=h.faceVertexOffsets,a=h.uvScales,n=4*r.length,t=new Float64Array(3*n),o=new Float32Array(3*n),i=new Float32Array(2*n),s=new Uint32Array(2*r.length*3),l=0,v=0,f=0,c=0,u=0;u<r.length;u++){for(var p=r[u],w=l/3,g=0,d=e;g<d.length;g++){var y=d[g];s[c++]=w+y}for(var m=p.corners,A=0;A<4;A++){var x=m[A],M=0;i[f++]=.25*a[A][0]+p.uvOrigin[0],i[f++]=p.uvOrigin[1]-.25*a[A][1];for(var O=0;O<3;O++)0!==p.axis[O]?(t[l++]=.5*p.axis[O],o[v++]=p.axis[O]):(t[l++]=.5*x[M++],o[v++]=0)}}return{position:t,normal:o,uv:i,faces:s}}function i(r){void 0===r&&(r=0);for(var e=Math.round(8*Math.pow(2,r)),a=2*e,n=(e-1)*(a+1)+2*a,t=new Float64Array(3*n),o=new Float32Array(3*n),i=new Float32Array(2*n),s=(e-1)*a*2,l=new Uint32Array(3*s),v=0,f=0,c=0,u=0,h=0,w=0;w<=e;w++){var g=w/e*Math.PI+.5*Math.PI,d=Math.cos(g),y=Math.sin(g);p[2]=y;for(var m=0===w||w===e,A=m?a-1:a,x=0;x<=A;x++){var M=x/A*2*Math.PI;p[0]=-Math.sin(M)*d,p[1]=Math.cos(M)*d;for(var O=0;O<3;O++)t[v++]=.5*p[O],o[f++]=p[O];i[c++]=(x+(m?.5:0))/a,i[c++]=w/e,0!==w&&x!==a&&(w!==e&&(l[u++]=h,l[u++]=h+1,l[u++]=h-a),1!==w&&(l[u++]=h,l[u++]=h-a,l[u++]=h-a-1)),h++}}return{position:t,normal:o,uv:i,faces:l}}function s(r){void 0===r&&(r=0);for(var e=Math.round(16*Math.pow(2,r)),a=4*(e+1)+2*e,n=new Float64Array(3*a),t=new Float32Array(3*a),o=new Float32Array(2*a),i=4*e,s=new Uint32Array(3*i),l=0,v=0,f=0,c=0,u=0,h=0;h<=5;h++)for(var w=0===h||5===h,g=h<=1||h>=4,d=2===h||4===h,y=w?e-1:e,m=0;m<=y;m++){var A=m/y*2*Math.PI,x=w?0:.5;p[0]=x*Math.sin(A),p[1]=x*-Math.cos(A),p[2]=h<=2?.5:-.5;for(var M=0;M<3;M++)n[l++]=p[M],t[v++]=g?2===M?h<=1?1:-1:0:2===M?0:p[M]/x;o[f++]=(m+(w?.5:0))/e,o[f++]=h<=1?1*h/3:h<=3?1*(h-2)/3+1/3:1*(h-4)/3+2/3,d||0===h||m===e||(5!==h&&(s[c++]=u,s[c++]=u+1,s[c++]=u-e),1!==h&&(s[c++]=u,s[c++]=u-e,s[c++]=u-e-1)),u++}return{position:n,normal:t,uv:o,faces:s}}function l(r){for(var e=u.facingAxisOrderSwap[r],a=u.position,n=u.normal,t=new Float64Array(a.length),o=new Float32Array(n.length),i=0,s=0;s<4;s++)for(var l=i,v=0;v<3;v++){var f=e[v],c=Math.abs(f)-1,h=f>=0?1:-1;t[i]=a[l+c]*h,o[i]=n[l+c]*h,i++}return{position:t,normal:o,uv:new Float32Array(u.uv),faces:new Uint32Array(u.faces)}}function v(r,e,t){f(r),c(r,t&&t.size);var o=n.georeference(r,e,t);return new a.Mesh({vertexAttributes:{position:o.position,normal:o.normal,uv:r.uv},components:[{faces:r.faces,material:t&&t.material||null}],spatialReference:e.spatialReference})}function f(r){for(var e=0;e<r.position.length;e+=3)r.position[e+2]+=.5}function c(r,e){if(null!=e){var a="number"==typeof e?[e,e,e]:[null!=e.width?e.width:1,null!=e.depth?e.depth:1,null!=e.height?e.height:1];w[0]=a[0],w[4]=a[1],w[8]=a[2];for(var n=0;n<r.position.length;n+=3){for(var o=0;o<3;o++)p[o]=r.position[n+o];t.mat3d.multiplyVec3(w,p);for(var o=0;o<3;o++)r.position[n+o]=p[o]}if(a[0]!==a[1]||a[1]!==a[2]){w[0]=1/a[0],w[4]=1/a[1],w[8]=1/a[2];for(var n=0;n<r.normal.length;n+=3){for(var o=0;o<3;o++)p[o]=r.normal[n+o];t.mat3d.multiplyVec3(w,p),t.vec3d.normalize(p);for(var o=0;o<3;o++)r.normal[n+o]=p[o]}}}}Object.defineProperty(e,"__esModule",{value:!0}),e.createUnitSizeBox=o,e.createUnitSizeSphere=i,e.createUnitSizeCylinder=s,e.createUnitSizePlane=l;var u={position:[-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],normal:[0,0,1,0,0,1,0,0,1,0,0,1],uv:[0,1,1,1,1,0,0,0],faces:[0,1,2,0,2,3],facingAxisOrderSwap:{east:[3,1,2],west:[-3,-1,2],north:[-1,3,2],south:[1,-3,2],up:[1,2,3],down:[1,-2,-3]}};e.convertUnitGeometry=v;var h={faceDescriptions:[{axis:[0,-1,0],uvOrigin:[0,.625],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[1,0,0],uvOrigin:[.25,.625],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[0,1,0],uvOrigin:[.5,.625],corners:[[1,-1],[-1,-1],[-1,1],[1,1]]},{axis:[-1,0,0],uvOrigin:[.75,.625],corners:[[1,-1],[-1,-1],[-1,1],[1,1]]},{axis:[0,0,1],uvOrigin:[0,.375],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[0,0,-1],uvOrigin:[0,.875],corners:[[-1,1],[1,1],[1,-1],[-1,-1]]}],uvScales:[[0,0],[1,0],[1,1],[0,1]],faceVertexOffsets:[0,1,2,0,2,3]};e.boxFaceOrder={south:0,east:1,north:2,west:3,up:4,down:5};var p=t.vec3d.create(),w=t.mat3d.identity()});