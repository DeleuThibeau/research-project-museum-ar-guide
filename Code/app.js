document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM fully loaded and parsed');
  renderCorrectFunctions();
});


const renderCorrectFunctions = function(){
  var imagePage = document.querySelector('.js-scene-image')
  var imageCode = document.querySelector('.js-scene-code')
  console.log(imagePage)
  console.log(imageCode)

    if(imagePage){
      // renderCorrectModelOnImagePage();
       console.log("run function here")
    }else if(imageCode){
      dynamicText();
    }

}

const dynamicText = function(){
    console.log("CODEPAGEFUNCTION")
    let json = "";
    fetch("./assets/json/descriptions.json")
    .then(response => {
    return response.json();
    })
    .then((jsondata) => {
        json = jsondata
        if(json){
            console.log(json)
            AFRAME.registerComponent('render-dynamic-text', {
                init: function () {
                  var sceneE1 = this.el;
                  var atext = sceneE1.querySelector("a-text")
                  var aEntity = sceneE1.querySelector('a-entity')
                  console.log(sceneE1)
                  console.log(aEntity)
                  console.log(atext)
                  console.log(atext.setAttribute('value', json.painting02.description))
                  atext.setAttribute('value', json.painting02.description)
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


