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
      dynamicTextImagePage();
    }else if(codePage){
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
                  // console.log(sceneE1)
                  // console.log(aEntity)
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


  



