const HtmlNode = document.getElementById('datos');
var list_ciudades = [];
var list_tipos = [];
var precioInicial = 0;
var precioFinal = 0;

$("#rangoPrecio").ionRangeSlider({
  onFinish: function (data) {
    precioInicial = data.from;
    precioFinal = data.to;
  },
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

// mostrar todos
$('#buscar').on('click', ()=>{
  $('#ciudad').get(0).selectedIndex = 0;
  $('#tipo').get(0).selectedIndex = 0;
  $('#datos').empty();
  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      $.each(data, (i, val)=>{
        HtmlNode.innerHTML = HtmlNode.innerHTML +
        `
  <div class="col s12 m12">    
    <div class="card horizontal">
      <div class="card-image">
        <img class="responsive-img z-depth-3" src="img/home.jpg">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <p><b class="blue-text text-darken-4">Ciudad:</b> ${data[i].Ciudad}</p>
          <p><b class="blue-text text-darken-4">Tipo:</b> ${data[i].Tipo}</p>
          <p><b class="blue-text text-darken-4">Telefono:</b> ${data[i].Telefono}</p>
          <p><b class="blue-text text-darken-4">Codigo Postal:</b> ${data[i].Codigo_Postal}</p>
          <p><b class="blue-text text-darken-4">Precio:</b> ${data[i].Precio}</p>
          <p><b class="blue-text text-darken-4">Direccion:</b> ${data[i].Direccion}</p>
        </div>
      </div>
    </div>
  </div>
        `
      });
    }
  })

});

function Duplicados(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

$('#ciudad, #tipo').change(function() {
    $('#datos').empty();
    $('#ciudad option:selected').each(()=>{
      $('#tipo option:selected').each(()=>{

      $.ajax({
        url:'/api/data',
        type: 'GET',
        data:{},
        success: function(data){
          $.each(data, (i, val)=>{
            if(data[i].Ciudad === $("#ciudad :selected").text()){
              if(data[i].Tipo === $("#tipo :selected").text()){
              HtmlNode.innerHTML = HtmlNode.innerHTML +
               `
    <div class="col s12 m12">    
    <div class="card horizontal">
      <div class="card-image">
        <img class="responsive-img z-depth-3" src="img/home.jpg">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <p><b class="blue-text text-darken-3">Ciudad:</b> ${data[i].Ciudad}</p>
          <p><b>Tipo:</b> ${data[i].Tipo}</p>
          <p><b>Telefono:</b> ${data[i].Telefono}</p>
          <p><b>Codigo Postal:</b> ${data[i].Codigo_Postal}</p>
          <p><b>Precio:</b> ${data[i].Precio}</p>
          <p><b>Direccion:</b> ${data[i].Direccion}</p>
        </div>
      </div>
    </div>
  </div>
        `
            }
          }}
        )}
      })
    })
  })
})

function printJson(){
  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      console.log(data)
    }
  })
}

$("#rangoPrecio").change(function(){
    $('#datos').empty();
    printJson();
    $.ajax({
      url:'/api/data',
      type: 'GET',
      data:{},
      success: function(data){
        $.each(data, (i, val)=>{
          let str = data[i].Precio;
          let new_str = str.replace('$','');
          let new_str01 = new_str.replace(',','')
          console.log('string', new_str01)
          let num = parseInt(new_str01)
          console.log('number', num)
          if(num >= precioInicial && num <= precioFinal){
            HtmlNode.innerHTML = HtmlNode.innerHTML +
             `
    <div class="col s12 m12">    
    <div class="card horizontal">
      <div class="card-image">
        <img class="responsive-img z-depth-3" src="img/home.jpg">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <p><b class="blue-text text-darken-3">Ciudad:</b> ${data[i].Ciudad}</p>
          <p><b>Tipo:</b> ${data[i].Tipo}</p>
          <p><b>Telefono:</b> ${data[i].Telefono}</p>
          <p><b>Codigo Postal:</b> ${data[i].Codigo_Postal}</p>
          <p><b>Precio:</b> ${data[i].Precio}</p>
          <p><b>Direccion:</b> ${data[i].Direccion}</p>
        </div>
      </div>
    </div>
  </div>
        `
          }
          })
      },
      error: function(err) {
        console.log(err);
      }
    });
});


$(document).ready(function(){
  let ciudad = $('#ciudad');
  let tipo = $('#tipo');
  

  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      $.each(data, (i, val)=>{
        list_ciudades.push(data[i].Ciudad);
      });
      list_ciudades = Duplicados(list_ciudades);
      $.each(list_ciudades, (i, val)=>{
          ciudad.append("<option value = ''>" + list_ciudades[i] + "</option>");
      });
    },
    error: function(err) {
      console.log(err);
    }
  })

  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      $.each(data, (i, val)=>{
        list_tipos.push(data[i].Tipo);
      });
      list_tipos = Duplicados(list_tipos);
      $.each(list_tipos, (i, val)=>{
          tipo.append("<option value = ''>" + list_tipos[i] + "</option>");
      });
    },
    error: function(err) {
      console.log(err);
    }
  })
});


setSearch();