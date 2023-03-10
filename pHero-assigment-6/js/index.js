//  Data Load from API Server
let dataSortByDate;
const loadHubs = async (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  dataSortByDate = data.data.tools
  displayHubs(data.data.tools, dataLimit);
}

// Sort By Date;
document.getElementById('sort-by-date').addEventListener('click', function () {
  let sortByDate = dataSortByDate.sort(function (a, b) {
    var c = new Date(a.published_in);
    var d = new Date(b.published_in);
    return c - d;
  });
  displayHubs(sortByDate);
});

// show all daa in the card/display
const displayHubs = (hub, dataLimit) => {
  const hubContainer = document.getElementById('hub-container');
  hubContainer.innerHTML = "";
  // display ALl Data 
  const showAll = document.getElementById('show-all');
  if (dataLimit && hub.length > 6) {
    hub = hub.slice(0, 6);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
  }

  // hub = hub.slice(0, 6);
//  sort by date Event Handlers
   
  
  // forEach loop for all data 
  hub.forEach(hub => {
    // console.log(hub);

    //API All Card
    const hubDiv = document.createElement('div');
    hubDiv.classList.add('col');
    hubDiv.innerHTML = `
      <div class="card h-100">
        <img src="${hub.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold">Features</h5>
          <ul>
            <li>${hub.features[0] ? hub.features[0] : 'Limited Features'}</li>
            <li>${hub.features[1] ? hub.features[1] : 'Limited Features'}</li>
            <li>${hub.features[2] ? hub.features[2] : 'Limited Features'}</li>
            <li>${hub.features[3] ? hub.features[3] : ''}</li>
          </ul>
        </div>
        <div class="card-footer">
        <h5 class="card-title">${hub.name}</h5>
        <div class="d-md-flex justify-content-between align-items-center">
          <div>
            <p>
                <i class="fa-solid fa-calendar-days pe-2"></i>
                ${hub.published_in}
            </p>
          </div>

          <!-- More details button random generate -->
          <button onclick="loadMoreDetails('${hub.id}')" type="button" class="btn bg-danger-subtle rounded-5" data-bs-toggle="modal" data-bs-target="#apimodal">
                <i class="fa-solid fa-arrow-right text-danger"></i>
          </button>
        </div>
        </div>
      </div>
      `;
    hubContainer.appendChild(hubDiv);
  })
  // Stop Loader
  toggleSpinner(false);
};

// Spinner Events
const toggleSpinner = isLoading => {
  const spinner = document.getElementById('loader');
  if (isLoading === true) {
    spinner.style.display = 'block';
  }
  else {
    spinner.style.display = 'none';
  }
};

// this function is use for particular data collocet using Id
const loadMoreDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayHubDetails(data.data);
}

// this is the all modal data functions 
const displayHubDetails = hub => {
  
  console.log(hub);
  const modalTitle = document.getElementById('api-Modal-Title');
  modalTitle.innerText = hub.tool_name;
  const modalDescription = document.getElementById('modal-description');
  modalDescription.innerText = hub.description;

  const modalDetail = document.getElementById('modal-details');
  modalDetail.innerHTML = `
  <h5 class="card-title">Features</h5>
  <ul type="1">
    <li>${hub.features[1].feature_name ? hub.features[1].feature_name : 'Limited Feature'}</li>
    <li>${hub.features[2].feature_name ? hub.features[2].feature_name : 'Limited Feature'}</li>
    <li>${hub.features[3].feature_name ? hub.features[3].feature_name : 'Limited Feature'}</li>
    
  </ul>
  `;
  const modalIntegrations = document.getElementById('modal-integrations');
  modalIntegrations.innerHTML = `
  <h5 class="card-title">Integrations</h5>
  <ul>
  <li>${hub.integrations[0] ? hub.integrations[0] : 'Limited Integrations'}</li>
  <li>${hub.integrations[1] ? hub.integrations[1] : 'Limited Integrations'}</li>
  <li>${hub.integrations[2] ? hub.integrations[2] : 'Limited Integrations'}</li>
  </ul>
  `;
  const basic = document.getElementById('basic');
  basic.innerHTML = `
    <h5 class="fw-bold mt-4">${hub.pricing[0].price}</h5>
    <h5>${hub.pricing[0].plan}</h5>
  `;
  const pro = document.getElementById('pro');
  pro.innerHTML = `
    <div class="mb-5">
    <h5 class="fw-bold mt-4">${hub.pricing[1].price}</h5>
    <h5>${hub.pricing[1].plan}</h5> 
    </div>
  `;
  const enterprise = document.getElementById('enterprise');
  enterprise.innerHTML = `
    <h5 class="fw-bold">${hub.pricing[2].price}</h5>
    <h5>${hub.pricing[2].plan ? hub.pricing[2].plan : 'Enterprise'}</h5>
  `;
  const modalsecondColum = document.getElementById('modal-second-colum');
  modalsecondColum.innerHTML = `
  <div id="accuracy" style="width:150px; "
    class="bg-danger rounded-4 position-absolute top-3 end-0 text-center me-2 mt-2 me-5">
    <p class="text-center text-white fw-semibold fs-6 my-auto py-2">${hub.accuracy.score ? hub.accuracy.score *100 : '0'}% Accuracy</p>
  </div>
  <img src="${hub.image_link[0]}" class="card-img-top rounded-1" alt="...">
  <h4 class="mt-3">${hub.input_output_examples[1].input}</h4>
  <p>${hub.input_output_examples[1].output}</p>
  `;
};

const fullDataLoad = (dataLimit) => {
  toggleSpinner(true);
  loadHubs(dataLimit);
}
fullDataLoad(6);


document.getElementById('btn-show-all').addEventListener('click', function () {
  document.getElementById('hub-container').innerHTML = "";
  // fullDataLoad();
  loadHubs();
})

// loadHubs();



  // const sortByDate = hub.tools.sort(function (a, b) {
  //   var c = new Date(a.published_in);
  //   var d = new Date(b.published_in);
  //   return c - d;
  // });
