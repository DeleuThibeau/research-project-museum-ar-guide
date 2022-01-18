document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM fully loaded and parsed');

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  });

  const successCallback = function(position){
    var deviceLat = position.coords.latitude
    var deviceLon =  position.coords.longitude

    var modelLat = 50.838920
    var modelLon = 3.265467

    console.log(deviceLat);
    console.log(deviceLon);

    getDistanceFromLatLonInM(deviceLat, deviceLon, modelLat, modelLon)

    var meters =  getDistanceFromLatLonInM(deviceLat, deviceLon, modelLat, modelLon)

    console.log(meters)

    modelPositioner(meters);
  }

  const errorCallback = function(error){
      console.log(error)

  }

  function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 1000; // Distance in m
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  const modelPositioner = function(meters){
      if (meters < 10) {
        AFRAME.registerComponent('render-model-correct', {
            init: function () {
              
              var sceneE1 = this.el;
              var abox = sceneE1.querySelector('a-box')
              console.log(abox)
              abox.setAttribute('scale', '1 1 1')
            //   console.log(abox)
            }
          });
      }

  }
  