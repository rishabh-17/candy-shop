URL = `https://crudcrud.com/api/db65e7597ac14a4da5dc14ee9cd3ac9b/name`


let loading = async ()=>{
    data= await axios.get(`${URL}`)
    const tbody = document.querySelectorAll('tbody');
    tbody.innerHTML = ''
    console.log(data.data)
    data.data.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="text-center">${item.name}</td>
        <td class="text-center">${item.price}</td>
        <td class="text-center">${item.quantity}</td>
        <td class="text-center">
        <i
            class="fa-solid fa-1 buy1"
            id = "${item._id}"
        ></i>
        </td>
        <td class="text-center " >
        <i class="fa-solid fa-2 buy2"  id = "${item._id}"></i>
        
        </td>`
        tbody[0].appendChild(tr);

    })
};
loading();
   







const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    obj = {
        name,
        price,
        quantity
    }

    await axios.post(URL, obj)
    .then((response) => {
        console.log(response.data);
        loading();
      }).catch((error) => console.log(error));
    
});


// buy buttons






const tbody = document.querySelector('tbody');

tbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('buy1')) {
        console.log(e.target.getAttribute("id"))
        id = e.target.getAttribute("id");
        await axios.get(`${URL}/${id}`)
        .then(async (response) => {
            obj = {
                name: response.data.name,
                price: response.data.price,
                quantity: response.data.quantity-1
            }
            console.log(obj)
        await axios.put(`${URL}/${id}`, obj)
          })
          .then(()=>{
            location.reload()
          })
        }

        if (e.target.classList.contains('buy2')) {
            console.log(e.target.getAttribute("id"))
            id = e.target.getAttribute("id");
            await axios.get(`${URL}/${id}`)
            .then(async (response) => {
                
                obj = {
                    name: response.data.name,
                    price: response.data.price,
                    quantity: response.data.quantity-2
                }
                console.log(obj)
            await axios.put(`${URL}/${id}`, obj)
              })
              .then(()=>{
                location.reload()
              })
            }
    })
