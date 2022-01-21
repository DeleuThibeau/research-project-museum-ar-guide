document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM fully loaded and parsed');
  renderCorrectFunctions();

  document.getElementById("onboardingButton").onclick = function(){
    document.getElementById("onboarding").style.display="none"; 
  }

});


const renderCorrectFunctions = function(){
  var imagePage = document.querySelector('.js-scene-image')
  var codePage = document.querySelector('.js-scene-code')

    if(imagePage){
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      dynamicTextImagePage();
      
    }else if(codePage){
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      dynamicTextCodePage();
      
    }

}

const dynamicTextCodePage = function(){
    console.log("CODEPAGEFUNCTION")
    let json = "";
    fetch("./assets/json/descriptions.json")
    .then(response => {
    return response.json();
    })
    .then((jsondata) => {
        json = jsondata
        // console.log(json)
        if(json){
            // console.log(json)
            AFRAME.registerComponent('render-dynamic-text', {
                init: function () {
                  var sceneE1 = this.el;
                  var atext = sceneE1.querySelectorAll("a-text")
                  var aEntity = sceneE1.querySelector('a-entity')
                  console.log(sceneE1)
                  console.log(aEntity)
                  console.log(atext)
                  // console.log(atext.setAttribute('value', json.painting02.description))
                  // atext.setAttribute('value', json.painting02.description)
                  atext[0].setAttribute('value', json.painting02.name)
                  console.log(atext[0])
                  atext[1].setAttribute('value', json.painting02.description)
                  console.log(atext[1])
                  atext[2].setAttribute('value', json.painting02.other)
                  console.log(atext[2])
                }
              });
        }
    })


}

const dynamicTextImagePage = function(){
  console.log("IMAGEPAGEFUNCTION")
  let json = "";
  fetch("./assets/json/descriptions.json")
  .then(response => {
  return response.json();
  })
  .then((jsondata) => {
      json = jsondata
      // console.log(json)
      if(json){
          // console.log(json)
          AFRAME.registerComponent('render-dynamic-text', {
              init: function () {
                var sceneE1 = this.el;
                var atext = sceneE1.querySelectorAll("a-text")
                var aEntity = sceneE1.querySelector('a-entity')
                // console.log(sceneE1)
                // console.log(aEntity)
                console.log(atext)
                // console.log(atext.setAttribute('value', json.painting02.description))
                // atext.setAttribute('value', json.painting02.description)
                atext[0].setAttribute('value', json.painting01.name)
                console.log(atext[0])
                atext[1].setAttribute('value', json.painting01.description)
                console.log(atext[1])
                atext[2].setAttribute('value', json.painting01.other)
                console.log(atext[2])
              }
            });
      }
  })


}

// TensorFlow JS might be interesting for if conditioning and setting the correct path.
// const renderCorrectModelOnImagePage = function(){
//     console.log("IMAGEPAGEFUNCTION")
//     AFRAME.registerComponent('render-correct-model', {
//         init: function () {
//           var sceneE1 = this.el;
//           var aEntity = sceneE1.querySelector('a-entity')
//           var anft = sceneE1.querySelector('a-nft')
//           var aAssets = sceneE1.querySelector('a-assets')
//           var aAssetsItem = aAssets.querySelector('a-asset-item')
//           // console.log(sceneE1)
//           // console.log(aEntity)
//           console.log(anft)
//           // console.log(aAssets)
//           // console.log(aAssetsItem)
//           var nftVariableArray = anft.getAttribute('url').split('/')
//           var nftVariable = nftVariableArray[2]
//           console.log(nftVariable)

//           if(nftVariable == "image01"){
//             console.log(nftVariable);
//             console.log(aAssetsItem.getAttribute('src'));
//             aAssetsItem.setAttribute('src', 'assets/models/painting02/scene.gltf');
//             console.log(aAssetsItem.getAttribute('src'));

//           } else if (nftVariable == "image02"){
//             console.log(nftVariable);
//             console.log(aAssetsItem.getAttribute('src'));
//             aAssetsItem.setAttribute('src', 'assets/models/painting02/scene.gltf');
//             console.log(aAssetsItem.getAttribute('src'));
//           }
//         }
//       });
// }



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

const modelDistanceCalculator = function(nameModel, deviceLat, deviceLon){

  var distance = 0
  if(nameModel == "painting01"){
    var modelLat = 50.838920
    var modelLon = 3.265467
    distance = getDistanceFromLatLonInM(deviceLat, deviceLon, modelLat, modelLon)
     
  }

  if(nameModel == "painting02"){
    var modelLat = 50.838920
    var modelLon = 3.265467
    distance = getDistanceFromLatLonInM(deviceLat, deviceLon, modelLat, modelLon)
  }

  return distance
}

const successCallback = function(position){
  var deviceLat = position.coords.latitude
  var deviceLon =  position.coords.longitude
  var distance = 0

  AFRAME.registerComponent('distance-calc-model', {
    init: function () {
      
      var sceneE1 = this.el;
      var aEntity = sceneE1.querySelector('a-entity')
      var aAssets = sceneE1.querySelector('a-assets')
      var item = aAssets.querySelector("a-asset-item")
      var itemName = item.getAttribute('id')
      distance = modelDistanceCalculator(itemName, deviceLat, deviceLon)

      if(itemName == "painting01"){
        if(distance > 0){
          aEntity.setAttribute("scale", "0.5 0.5 0.5")
          console.log(aEntity)
        }
  
        if(distance > 10){
          aEntity.setAttribute("scale", "1 1 1")
          console.log(aEntity)
        }
  
        if(distance > 15){
          aEntity.setAttribute("scale", "2 2 2")
          console.log(aEntity)
        }
      }

      if(itemName == "painting02"){
        if(distance > 0){
          aEntity.setAttribute("scale", "10 10 10")
          console.log(aEntity)
        }
  
        if(distance > 10){
          aEntity.setAttribute("scale", "60 60 60")
          console.log(aEntity)
        }
  
        if(distance > 15){
          aEntity.setAttribute("scale", "80 80 80")
          console.log(aEntity)
        }
      }


    }
  });
}

const errorCallback = function(error){
    console.log(error)

}




  



