var pokemonRepository = (function() {
  //IIFE
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(newPokemon) {
    repository.push(newPokemon);
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    var $pokeList = $('.pokemon-list'); // the ul from HTML
    var $button = $(
      '<button type="button" class = "btn btn-info btn-lg btn-sm button-class list-group-item" data-target="#exampleModal" data-toggle="modal">' +
        pokemon.name +
        '</button>'
    );
    var $listItem = $('<li></li>');
    $listItem.append($button);
    $pokeList.append($listItem);
    $button.on('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    });
  }

  function loadDetails(item) {
    // Loading the details from the API
    var url = item.detailsUrl;
    return $.ajax(url, { dataType: 'json' }).then(function(details) {
      //Now we add the details to the items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      // item.types = Object.keys(details.types); //this returns an array of details
      item.types = []; // Loop to go through the types and add them, if there's more than 1
      for (var i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
      for (var k = 0; k < details.abilities.length; k++) {
        item.abilities.push(details.abilities[k].ability.name);
      }
    });
  }

  function showModal(item) {
    var modalBody = $('.modal-body');
    var modalTitle = $('.modal-title');
    modalBody.empty();
    ('.modal-body');
    modalTitle.empty();
    ('.modal-title');

    //   // Pokemon's name
    var nameElement = $('<h2>' + item.name + '</h2>');
    //   //Pokemon's height
    var heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
    //  //Pokémon's weight
    var weightElement = $('<p>' + 'Weight: ' + item.weight + '</p>');
    //   // Image
    var imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);
    //   // Pokemon's types
    var typesElement = $('<p>' + 'Types: ' + item.types + '</p>');
    //  // Pokémon's abilities
    var abilitiesElement = $('<p>' + 'Abilities: ' + item.abilities + '</p>');
    //

    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imageElement);
  }
  return {
    //the keys: IIFE functions; the values: what the outside world knows them as
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search bar functionality
$(document).ready(function() {
  $('#myInput').on('keyup', function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $('#myDIV *').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
