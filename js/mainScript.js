// alert('work');
function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
include("/js/functions.js");


let elementDetail={
  size:'',
  color:'',
  count:''
}

const url='file_v2/xbox.json';

  fetch(url).then(response => {
    return response.json();
  }).then(data => {

    console.log(data);
    var divRightPart=document.getElementById("rightPart");
    let divPopUpHeader = createNode('div', { class:"row"});
    let buttonClosePopUp = createNode('button', { class:"btn btn-outline-secondary border-white",style:"height:50px;"});
    let divClosePopUp = createNode('div', { class:"col-sm-1",onclick:"hidePopUp()"});
    buttonClosePopUp.innerHTML="X";
    divClosePopUp.appendChild(buttonClosePopUp)

    var h2 = document.createElement("H2");
    h2.setAttribute('style', "margin:0;");
    var divElementName=document.createElement("div");
    divElementName.setAttribute('class', "col-sm-11");
    divElementName.appendChild(h2);
    let p = createNode('p', { id:"elemPrice",class:"font-weight-bold",style:"margin-bottom: 22px; height: 20px; color:rgba(0,0,0,0)"});
    p.innerHTML= "Cena";
    var p1 = document.createElement("p");
    p1.innerHTML='Rozmiar:';
    let p2 = createNode('p', { id:"availabilityProduct",style:"margin-bottom: 22px;height: 20px;color: rgba(0,0,0,0);"});
    p2.innerHTML=".";

    h2.innerHTML=data.product.name;
    divPopUpHeader.append(divElementName,divClosePopUp);
    divRightPart.append(divPopUpHeader,p,p1);

    //button ramSize
    let divRamSize = createNode('div', { class:"row"});
    let ramSize= Object.keys(data.sizes.items);
    for (let i = 0; i < ramSize.length; i++) {
    const key = ramSize[i];
    let divButtonRamSize = createNode('div', { class:"col-sm"});
    let buttonRamSize = createNode('button', { class:"btn btn-outline-info",style:"width:150px"});
        buttonRamSize.innerHTML=data.sizes.items[key].name;
        buttonRamSize.addEventListener('click',function(e) {
          if(data.sizes.items[key].name===e.target.innerHTML){
            let p = document.getElementById('elemPrice');
            pAvailabilityProd=document.getElementById('availabilityProduct');
            pAvailabilityProd.innerHTML =
            data.sizes.items[key].status==="Produkt dostępny" ?
            '<img src="https://img.icons8.com/material-rounded/24/26e07f/checked-radio-button.png"/>'+data.sizes.items[key].status :
            '<img src="https://img.icons8.com/ios/24/fa314a/cancel-2.png"/>'+data.sizes.items[key].status;
            pAvailabilityProd.setAttribute('style','margin-bottom: 22px; height: 20px; color:rgba(0,0,0,1)');
            p.innerHTML=data.sizes.items[key].price+',00 zl';
            p.setAttribute('style','margin-bottom: 22px; height: 20px;color: rgba(0, 144, 246, 1);')
            elemetnCount=data.sizes.items[key].amount;
            document.getElementById('countOfElements').value='0';
            elementDetail.size=data.sizes.items[key].name;
            document.getElementById('productCount').innerHTML='Ilośc Produktu:'+data.sizes.items[key].amount;
            // console.log(data.sizes.items[key]);
          }

        })
        divButtonRamSize.appendChild(buttonRamSize);
        divRamSize.appendChild(divButtonRamSize);
        divRightPart.appendChild(divRamSize);
  }
  //button colors

    let div = createNode('div', {
        class:"dropdown"
    });
    let pColor = createNode('p', {
        style:"padding-top:15px;"
    });
    pColor.innerHTML='Wariant:';
    div.appendChild(pColor);

    // let buttonDropDown =document.createElement("button");
    let buttonDropDown = createNode('button', {
        class:"btn dropdown-toggle form-control",
        id: 'btnItemColor',
        type: 'button',
        'data-toggle':"dropdown",
        placeholder: 'Test',
        style:"text-align:left;"
    });
    buttonDropDown.innerHTML="Srebrny";
    div.appendChild(buttonDropDown);

    let ul = createNode('ul', {
        class:"dropdown-menu"

    });

    let multiversions= Object.values(data.multiversions);
    for (var multiversionsValue of multiversions) {
            Object.keys(multiversionsValue.items).forEach(function (key) {
                 for(var value of Object.values(multiversionsValue.items[key].values)){
                   let li = createNode('li', {
                       class:"dropdown-item"
                   });
                   li.innerHTML=value.name;
                   li.addEventListener('click',function(e) {
                     var itemColor=document.getElementById('btnItemColor');
                     itemColor.innerHTML=e.target.innerHTML;
                     divFooter.setAttribute('style','paddingTop: 0px;');
                     elementDetail.color=e.target.innerHTML;
                     document.getElementById('xboxImage').src='pictures/'+key+'.jpg';

                   })
                   ul.appendChild(li);
                 }
            })

    }
    div.appendChild(ul);

        // field elements count and add to box

        //field elements count

        let divElementCount = createNode('div', {
            class:"input-group mb-3"

        });

        let divButtonReduceElemCount = createNode('div', {
            class:"input-group-prepend",
            style:"float:left;"
        });

        let buttonReduceElemCount = createNode('button', {
            class:"btn btn-outline-secondary",
            style:"height: 46px;"
        });
        buttonReduceElemCount.innerHTML='-';
        buttonReduceElemCount.addEventListener('click',function() {

            var value = parseInt(document.getElementById('countOfElements').value, 10);
            value = isNaN(value) ? 0 : value;
            value < 1 ? value = 1 : '';
            value--;
            document.getElementById('countOfElements').value = value;
        })

        let inputElemenCount = createNode('input', {
            id:"countOfElements",
            class:"form-control border-left-0 border-right-0",
            type:'text',
            value:'0',
            style:"text-align: center; width:100px; height: 46px;"
        });

        let divButtonIncreaseElemCount = createNode('div', {
            class:"input-group-append"
        });
        // var buttonIncreaseElemCount=document.createElement('button');

        let buttonIncreaseElemCount = createNode('button', {
            class:"btn btn-outline-secondary border-left-0",
            style:'height: 46px;'
        });
        buttonIncreaseElemCount.innerHTML='+';
        buttonIncreaseElemCount.addEventListener('click',function() {
          if(typeof elemetnCount !== 'undefined')
          {
            console.log(elemetnCount)
            var value = parseInt(document.getElementById('countOfElements').value, 10);
            value = isNaN(value) ? 0 : value;
            value++;
            if(value>elemetnCount){return value;}
            document.getElementById('countOfElements').value = value;
            elementDetail.count=value;
          }
          else{
            alert('Please choose the product')
          }

        })
        divButtonReduceElemCount.appendChild(buttonReduceElemCount);
        divElementCount.append(divButtonReduceElemCount,inputElemenCount,divButtonIncreaseElemCount);
        divButtonIncreaseElemCount.appendChild(buttonIncreaseElemCount);

        //add to box

        let divFooter = createNode('div', {
            id:"footer",
            class:"row",
            style:"padding-top:0px; display: flex;"
        });

        let divFooterLeftPart = createNode('div', {
            id:"leftPart",
            class:"col-sm",
            style:" padding-top: 22px;"
        });
        let productCount = createNode('p', {
            id:"productCount",
            class:"col-sm"
        });

        divFooterLeftPart.append(p2,divElementCount,productCount);

        let divFooterRightPart = createNode('div', {
            id:"rightPart",
            class:"col-sm",
            style:" margin-top: 14px;"
        });
        var a1=document.createElement('a');
        a1.innerHTML="Możemy wysłać już dzisiaj";
        var p1 = createNode('p', {
            style:"color:#0090F6;"
        });
        p1.innerHTML="Sprawdz czasy i koszty wysylki";
        let buttonAddToBox = createNode('button', {
            class:"btn btn-lg btn-primary",
            onclick:" addToBox(elementDetail)"
        });
        buttonAddToBox.innerHTML="Dodaj do koszyka";

        divFooterRightPart.append(a1,p1,buttonAddToBox);
        divFooter.append(divFooterLeftPart,divFooterRightPart);
        divRightPart.append(div,divFooter);

  }).catch(err => {
          console.log(err);

          // w pliku xbox.json pod linią nr 103 usunełem przecinek po nawiasie jak nie to wyrzuca błąd!!
  });

  function createNode(node, attributes){
      const el = document.createElement(node);
      for(let key in attributes){
          el.setAttribute(key, attributes[key]);
      }
      return el;
  }
