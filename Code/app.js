window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    dynamicText();
});

const dynamicText = function(){
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
                  atext.setAttribute('value', json.painting02.description)
                }
              });
        }
    })


}

const cameraSelection = function(){
    var secondCameraEl = document.querySelector('#second-camera');
    secondCameraEl.setAttribute('camera', 'active', true);
}