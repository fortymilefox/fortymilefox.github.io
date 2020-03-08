//Node select for Pokélist


//IIFE

var pokeRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  //List item & button for each Pokémon
  function addListItem(pokemon) {
    var $pokeList = $('input');
    var $listItem = $('li');
    var $button = $('<button class="list-button">' + pokemon.name + '</button> ');
    $pokelist.append($listItem);
    $listItem.append($button);
    $('button').on('click', function(event) {
      showDetails(pokemon);
    });
  }
    function showDetails(item) {
      pokeRepository.loadDetails(item).then(function(){
        console.log(item);
        showModal(item);
      });
    }
      function loadList(){
        return $.ajax(apiUrl)
          .then(function (json){
            json.results.forEach(function(item){
              var pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
            });
          }).catch(function(e){
            console.error(e);
          })
        }

      function loadDetails(item){
        var url = item.detailsUrl;
        return $.ajax(url).then(function(details){
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = [];
          for(var i = 0; i < details.types.length; i++){
            item.types.push(details.types[i].types.name);
          }
          item.abilities = [];
          for (var i = 0; i < details.abilities.length; i++){
            item.abilities.push(details.abilities[i].ability.name);
          }
        })
        .catch(function (e){
          console.error(e);
        });
      }

      //modal function
      var $modal = $('<div class="modal"></div>');

      function showModal(item) {
        var $modalContainer = $('#modal-container').addClass('is-visible');

          var $closeButtonElement = $('<button class = "modal-close"> X </button>')
            .on('click', function(event){
              hideModal
            });
            //name in modal
          var $nameElement = $('<h2>' + item.name + '</h2>');

          // height in modal
          var $heightElement = $('<p>' + 'Height : ' + item.height + 'm' + '</p>');

          //weight in modal
          var $weightElement = $('<p>' + 'Weight : ' + item.weight + 'kg' + '</p>');

          //types in modal
          var $typesElement = $('<p>' + 'Types : ' + item.types + '</p>');

          //abilities in modal
          var $abilitiesElement = $('<p>' + 'Abilities : ' + item.ablities + '</p>');

          //image in modal
          var $picElement = $('img class="modal-img" style="width: 60%">');
          $picElement.attr('src',item.imageUrl);

          //append
          modal.append(closeButtonElement);
          modal.append(nameElement);
          modal.append(picElement);
          modal.append(heightElement);
          modal.append(weightElement);
          modal.append(typesElement);
          modal.append(abilitiesElement);
      }

      function hideModal() {
        var $modalContainer = $('#modal-container')
        .removeClass('is-visible');
      }

      //hide modal with ESC
      window.addEventListener('keydown', (e) =>{
        var $modalContainer = document.querySelector('#modal-container');
        if (
          e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
            hideModal();
    }
});

//click out of modal

var $modalContainer = $('#modal-container')
.on('click', (e) =>
{
  var target = e.target;
  if(target === $modalContainer) {
    hideModal();
  }
})
      return{
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,

      };

})();

//forEach loop
pokeRepository.loadList(). then(function(){
  pokeRepository.getAll(). forEach(function(pokemon){
    pokeRepository.addListItem(pokemon);
  });
});
