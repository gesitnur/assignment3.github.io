function format_number(number) {
  data_value = number !== null ? number : 0;
  return data_value;
}

function getData() {
  document.getElementById("section-loading").classList.remove("d-none");
  document.getElementById("section-data").classList.add("d-none");
  let country = document.getElementById("country").value;
  if (country == "") {
    alert("harap isi data negara")
  }

  const fetchData = async () => {
    const url = 'https://covid-193.p.rapidapi.com/statistics?country=' + country;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '07b47a1cf5msh0226cb0ba48ee5ep182a96jsna8f0736512b9',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const new_case_element = document.getElementById("new-case");
      const active_case_element = document.getElementById("active-case");
      const recovered_case_element = document.getElementById("recovered-case");
      const total_case_element = document.getElementById("total-case");
      const death_case_element = document.getElementById("total-death-case");
      const total_test_element = document.getElementById("total-test");

      if (result.response.length !== 0) {
        new_case_element.innerHTML = format_number(result.response[0]["cases"]["new"]);
        active_case_element.innerHTML = format_number(result.response[0]["cases"]["active"]);
        recovered_case_element.innerHTML = format_number(result.response[0]["cases"]["recovered"]);
        total_case_element.innerHTML = format_number(result.response[0]["cases"]["total"]);
        death_case_element.innerHTML = format_number(result.response[0]["deaths"]["total"]);
        total_test_element.innerHTML = format_number(result.response[0]["tests"]["total"]);
        document.getElementById("warning-label").classList.add("d-none");
      }else{
        new_case_element.innerHTML = 0;
        active_case_element.innerHTML = 0;
        recovered_case_element.innerHTML = 0;
        total_case_element.innerHTML = 0;
        death_case_element.innerHTML = 0;
        total_test_element.innerHTML = 0;
        document.getElementById("warning-label").classList.remove("d-none");
      }
      document.getElementById("section-loading").classList.add("d-none");
      document.getElementById("section-data").classList.remove("d-none");
    } catch (error) {
      console.error(error);
    }
  };
 fetchData();
}