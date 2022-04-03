
var data = {
  items: [{"id":2}, {"id":3}]
} 


// if (document.readyState == 'loading') {
//   document.addEventListener('DOMContentLoaded', ready)
// } else {
//   ready()
// }

// function ready() {
//   var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//   for (var i = 0; i < removeCartItemButtons.length; i++) {
//       var button = removeCartItemButtons[i]
//       button.addEventListener('click', removeCartItem)
//   }

//   var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//   for (var i = 0; i < quantityInputs.length; i++) {
//       var input = quantityInputs[i]
//       input.addEventListener('change', quantityChanged)
//   }

//   var addToCartButtons = document.getElementsByClassName('shop-item-button')
//   for (var i = 0; i < addToCartButtons.length; i++) {
//       var button = addToCartButtons[i]
//       button.addEventListener('click', addToCartClicked)
//   }

//   document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }

// function purchaseClicked() {
//   alert('Thank you for your purchase')

//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   for (var i = 0; i < cartItems.children.length; i++) {
//       var item = {
//           "id": cartItems.children[i].children[0].getElementsByClassName("cart-item-id")[0].innerText,
//       }
//       data.items.push(item);
//   }
//   while (cartItems.hasChildNodes()) {
//       cartItems.removeChild(cartItems.firstChild)
//   }

//   localStorage.setItem('myData', JSON.stringify(data));
//   updateCartTotal()
// }

// function removeCartItem(event) {
//   var buttonClicked = event.target
//   buttonClicked.parentElement.parentElement.remove()
//   updateCartTotal()
// }

// function quantityChanged(event) {
//   var input = event.target
//   if (isNaN(input.value) || input.value <= 0) {
//       input.value = 1
//   }
//   updateCartTotal()
// }

// function addToCartClicked(event) {
//   var button = event.target
//   var shopItem = button.parentElement.parentElement.parentElement;
//   var title = shopItem.children[1].getElementsByClassName('shop-item-title')[0].innerText
//   var price = shopItem.children[1].getElementsByClassName('shop-item-price')[0].innerText
//   var id = shopItem.children[1].getElementsByClassName('shop-item-id')[0].innerText
//   var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//   addItemToCart(title, price, imageSrc, id)
//   updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc, id) {
//   var cartRow = document.createElement('div')
//   cartRow.classList.add('cart-row')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//   for (var i = 0; i < cartItemNames.length; i++) {
//       if (cartItemNames[i].innerText == title) {
//           alert('This item is already added to the cart')
//           return
//       }
//   }
//   var cartRowContents = `
//       <div class="cart-item cart-column">
//           <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//           <span class="cart-item-title">${title}</span>
//           <span class="cart-item-id">${id}</span>
//       </div>
//       <span class="cart-price cart-column">${price}</span>
//       <div class="cart-quantity cart-column">
//           <input class="cart-quantity-input" type="number" value="1">
//           <button class="btn-rmv btn-danger" type="button">REMOVE</button>
//       </div>`
//   cartRow.innerHTML = cartRowContents
//   cartItems.append(cartRow)
//   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  
// }

// function updateCartTotal() {
//   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//   var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//   var total = 0
//   for (var i = 0; i < cartRows.length; i++) {
//       var cartRow = cartRows[i]
//       var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//       var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//       var price = parseFloat(priceElement.innerText.replace('RON', ''))
//       var quantity = quantityElement.value
//       total = total + (price * quantity)
//   }
//   total = Math.round(total * 100) / 100
//   document.getElementsByClassName('cart-total-price')[0].innerText = total + 'RON'
// }


 var Allpoints = [ new Point(0,0),
  new Point(2,2),new Point(2,4), new Point(2,6), new Point(2,8), new Point(2,10),
  new Point(4,2),new Point(4,4), new Point(4,6), new Point(4,8), new Point(4,10),
  new Point(6,2),new Point(6,4), new Point(6,6), new Point(6,8), new Point(6,10),
  new Point(8,2),new Point(8,4), new Point(8,6), new Point(8,8), new Point(8,10)];


var convertPoints = [ new Point(100,810),
  new Point(50,816),new Point(50,636), new Point(50,456), new Point(50,276), new Point(50,96),
  new Point(335,810),new Point(335,650), new Point(335,480), new Point(335,330), new Point(335,130),
  new Point(580,810),new Point(580,650), new Point(580,480), new Point(580,330), new Point(580,130),
  new Point(750,816),new Point(750,636), new Point(750,456), new Point(750,276), new Point(750,96)];

var points = [];
/**
* @private
*/
function Path(points) {
this.points = points;
this.order = new Array(points.length);
for(var i=0; i<points.length; i++) this.order[i] = i;
this.distances = new Array(points.length * points.length);
for(var i=0; i<points.length; i++)
for(var j=0; j<points.length; j++)
this.distances[j + i*points.length] = distance(points[i], points[j]);
}
Path.prototype.change = function(temp) {
var i = this.randomPos(), j = this.randomPos();
var delta = this.delta_distance(i, j);
if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
this.swap(i,j);
}
};
Path.prototype.size = function() {
var s = 0;
for (var i=0; i<this.points.length; i++) {
s += this.distance(i, ((i+1)%this.points.length));
}
return s;
};
Path.prototype.swap = function(i,j) {
var tmp = this.order[i];
this.order[i] = this.order[j];
this.order[j] = tmp;
};
Path.prototype.delta_distance = function(i, j) {
var jm1 = this.index(j-1),
jp1 = this.index(j+1),
im1 = this.index(i-1),
ip1 = this.index(i+1);
var s = 
this.distance(jm1, i  )
+ this.distance(i  , jp1)
+ this.distance(im1, j  )
+ this.distance(j  , ip1)
- this.distance(im1, i  )
- this.distance(i  , ip1)
- this.distance(jm1, j  )
- this.distance(j  , jp1);
if (jm1 === i || jp1 === i)
s += 2*this.distance(i,j); 
return s;
};
Path.prototype.index = function(i) {
return (i + this.points.length) % this.points.length;
};
Path.prototype.access = function(i) {
return this.points[this.order[this.index(i)]];
};
Path.prototype.distance = function(i, j) {
return this.distances[this.order[i] * this.points.length + this.order[j]];
};
// Random index between 1 and the last position in the array of points
Path.prototype.randomPos = function() {
return 1 + Math.floor(Math.random() * (this.points.length - 1));
};

/**
* Solves the following problem:
*  Given a list of points and the distances between each pair of points,
*  what is the shortest possible route that visits each point exactly
*  once and returns to the origin point?
*
* @param {Point[]} points The points that the path will have to visit.
* @param {Number} [temp_coeff=0.999] changes the convergence speed of the algorithm: the closer to 1, the slower the algorithm and the better the solutions.
*
* @returns {Number[]} An array of indexes in the original array. Indicates in which order the different points are visited.
*
* @example
* var points = [
*       new salesman.Point(2,3)
*       //other points
*     ];
* var solution = salesman.solve(points);
* var ordered_points = solution.map(i => points[i]);
* // ordered_points now contains the points, in the order they ought to be visited.
**/
function solve() {
  var temp_coeff = 0.999;
  console.log(points);
  var path = new Path(points);
  if (points.length < 2) return path.order; // There is nothing to optimize
  if (!temp_coeff)
    temp_coeff = 1 - Math.exp(-10 - Math.min(points.length,1e6)/1e5);

  for (var temperature = 100 * distance(path.access(0), path.access(1));
           temperature > 1e-6;
           temperature *= temp_coeff) {
    path.change(temperature);
  }
  return path.order;
};

/**
* Represents a point in two dimensions.
* @class
* @param {Number} x abscissa
* @param {Number} y ordinate
*/
function Point(x, y) {
this.x = x;
this.y = y;
};

function distance(p, q) {
var dx = p.x - q.x, dy = p.y - q.y;
var result = Math.sqrt(dx*dx + dy*dy);
return result;  
}

if (typeof module === "object") {
module.exports = {
"solve": solve,
"Point": Point
};
}


function makePoints(data){  
var i = 0;
points[0] = convertPoints[0];
for(i = 0; i < data.items.length; i++) {
  console.log(data.items[i].id);
points[i + 1] = convertPoints[data.items[i].id];
}
console.log(points);
return;
}




function draw() {
  makePoints(data);
  console.log(points);
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let img = document.getElementById("imgSource");
  ctx.drawImage(img, 600, 600);
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    // ctx.moveTo(800
    //   , 130);
    for(var i = 0; i < points.length; i++) {
      if( i == 0) {
        ctx.moveTo(convertPoints[points[i]].x,convertPoints[points[i]].y);
        continue;
      }
      if(i != (points.length - 1)) {
        if(convertPoints[points[i]].x != convertPoints[points[i + 1]].x) {
          if(Math.abs(convertPoints[points[i]].y - convertPoints[points[i + 1]].y) <= 849/2) {
            if(convertPoints[points[i]].y >= 849/2 && convertPoints[points[i + 1]].y >= 849/2) {
              ctx.lineTo( convertPoints[points[i]].x, 900);
              ctx.lineTo(convertPoints[points[i + 1]].x, 900);
              ctx.lineTo( convertPoints[points[i + 1]].x, convertPoints[points[i]].y + 1);
            }
            else if (convertPoints[points[i]].y <= 849/2 && convertPoints[points[i + 1]].y <= 849/2){
              ctx.lineTo( convertPoints[points[i]].x, 20);
              ctx.lineTo(convertPoints[points[i + 1]].x, 20);
              ctx.lineTo( convertPoints[points[i + 1]].x, convertPoints[points[i]].y + 1);
            }
          }
          else {
            ctx.lineTo( convertPoints[points[i]].x, 20);
              ctx.lineTo(convertPoints[points[i + 1]].x, 20);
              ctx.lineTo( convertPoints[points[i + 1]].x, convertPoints[points[i]].y + 1);
          }
        }
        else {
          ctx.lineTo(convertPoints[points[i]].x,convertPoints[points[i]].y);
          ctx.stroke();
        }
      }
      else {
        ctx.lineTo(convertPoints[points[i]].x,convertPoints[points[i]].y);
        ctx.stroke();
      }
      
    }
    // ctx.moveTo(800
    //   , 130);
    // ctx.lineTo(285, 810);
    ctx.stroke();
  };
  img.src = 'harta_alimente.png';
}