function showPopUp(){
  var popUp= document.getElementById('popUp');
  popUp.setAttribute('style','visibility: visible;')
  document.getElementById('buttonShowPopUp').setAttribute('style','visibility: hidden;');
}
var index = 0;
// var imageList = ["file_v2\quickcart\renditions\image-512-403.png", "file_v2\quickcart\renditions\image-1440-1131.png"];
let greyXbox='pictures/1-1.jpg';
let whiteXbox='pictures/1-2.jpg';
let blackXbox='pictures/1-3.jpg';
var imageList = [greyXbox,whiteXbox,blackXbox];
function changeImage(side) {
  if(side=='left'){
    index = index - 1;
    if (index < 0) {index = imageList.length-1;}
  }
  else{
    index = index + 1;
    if (index == imageList.length) {index = 0;}
  }
  var image1 = document.getElementById("xboxImage");
  image1.src = imageList[index];
}
function hidePopUp(){
  var popUp= document.getElementById('popUp');
  popUp.setAttribute('style','visibility: hidden;')
  document.getElementById('buttonShowPopUp').setAttribute('style','visibility: visible;');
}
function addToBox(param){

    if(param.size==""|| param.count==0){
      alert('Plese choose the product')
      return;
    }else if(param.color==''){
      param.color='Srebny';
    }
  alert('size:'+param.size+'; color:'+param.color+'; count:'+param.count);
  hidePopUp();
}
