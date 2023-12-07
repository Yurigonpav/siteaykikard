var draggableElements = document.querySelectorAll('.draggable');
var targetSquare = document.getElementById('targetSquare');
var successMessage = document.querySelector('.success-message');
var correctElement;

var offsetX, offsetY, isDragging = false, currentDraggingElement;

// Escolhe aleatoriamente um elemento para exibir a mensagem correta
correctElement = draggableElements[Math.floor(Math.random() * draggableElements.length)];

draggableElements.forEach(function (element) {
  element.addEventListener('mousedown', function (e) {
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;

    element.style.cursor = 'grabbing';
    isDragging = true;
    currentDraggingElement = element;

    document.addEventListener('mousemove', function (event) {
      if (isDragging) {
        dragElement(event, currentDraggingElement);
      }
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        stopDragging(currentDraggingElement);
      }
    });
  });
});

function dragElement(e, element) {
  var x = e.clientX - offsetX;
  var y = e.clientY - offsetY;

  element.style.left = x + 'px';
  element.style.top = y + 'px';

  checkCollision(element);
}

function stopDragging(element) {
  element.style.cursor = 'grab';

  isDragging = false;
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mouseup', stopDragging);
}

// ...

function checkCollision(element) {
  var elementRect = element.getBoundingClientRect();
  var targetRect = targetSquare.getBoundingClientRect();

  if (
    elementRect.left < targetRect.right &&
    elementRect.right > targetRect.left &&
    elementRect.top < targetRect.bottom &&
    elementRect.bottom > targetRect.top
  ) {
    // targetSquare.style.backgroundColor = '#2ecc71';

    // Exibe a mensagem no console apenas se o elemento for o correto
    if (element === correctElement) {
      alert("carta correta")
    } else {
      // console.log('Escolhi a imagem errada!');
    }
  } else {
    // targetSquare.style.backgroundColor = '#f39c12';
    // console.log('Fora da área alvo');
  }
}

// ...

