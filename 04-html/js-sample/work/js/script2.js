var data = [];

function deleteRecord(idx) {
    console.log(idx)
    data.splice(idx,1)
    renderDataTable()
}

function renderDataTable() {
  let subTotal = 0;
  $("#dataTable").html("");
  data.forEach(function (item, idx) {
    subTotal += item.amount;
    let dataRow = `<tr>
    <td class="data r">${item.quantity}</td>
    <td class="data">
    <button onclick="deleteRecord(${idx})">X</button>
    ${item.description}
    </td>
    <td class="data r">${item.unitPrice}</td>
    <td class="data r">${item.amount}</td>
    </tr>`;
    console.log({ dataRow });
    $("#dataTable").append(dataRow);
  });
  $("#subTotal").html(subTotal);
}

$(document).ready(function () {
  console.log("Ready");

  $.getJSON("data/data.json", function (jsonData) {
    data = jsonData;
    console.log("data", data);
    renderDataTable();
  })
    .done(function () {
      console.log("second success");
    })
    .fail(function (jqxhr, textStatus, error) {
      console.log("error", textStatus);
    })
    .always(function () {
      console.log("complete");
    });

  let count = 0;

  let d = new Date();
  let dateStr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  $("#currentDate").html(dateStr);

  $("#btnAdd").click(function () {
    console.log("Clicked!", count);
    count++;
    // let subTotal = prompt("Sub Total")
    // $('#subTotal').html(subTotal)
    let qty = prompt("Quantity");
    let d = prompt("Description");
    let p = prompt("Unit Price");
    let amt = parseFloat(qty) * parseFloat(p);
    // console.log({qty,d,p,amt})
    let item = {
      quantity: qty,
      description: d,
      unitPrice: p,
      amount: amt,
    };
    console.log({ item });
    data.push(item);
    renderDataTable();
  });
});
